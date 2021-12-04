const reader = require("../dataParser.js");
const bingoCards = reader.parseTxt("./bingoCards.txt");
const bingoNumbers = reader.parseTxt("./bingoNumbers.txt");
const bingoNumbersSplit = bingoNumbers[0].split(",");

const bingoNumbersAsNumberTypes = reader.convertArrayToNumberType(
  bingoNumbers[0].split(",")
);

// to record the winning number when the last card has been chosen
let winningNumber = null;

const findWinningBingo = {
  formatBingoCards: (bingoCards) => {
    // need to put the values in an array
    let index = 0;
    let bingoCardsFormatted = [];
    bingoCards.forEach((line) => {
      if (line === "") {
        // if the line is equal to an empty string there's a break which indiciates that a bingo
        // card is finished, and the next bingo card (recorded by the next index) is starting.
        index += 1;
        return;
      }

      // if the index of the current bingo card doesn't exist, create it
      if (!bingoCardsFormatted[index]) {
        bingoCardsFormatted[index] = [];
      }

      // single digits have extra spaces, so we need to get rid of the extra spaces with regex and trim
      const regex = /  /gi;
      const newStr = line.trim().replace(regex, " ");
      const lineSplit = newStr.split(" ");

      // to record if a number is chosen, we're turning them into objects with the key being the
      // number and the value being a boolean to indicate if it's been chosen
      const mappedToObject = lineSplit.map((numAsString) => {
        const numAsNumType = Number(numAsString);
        return {
          [numAsNumType]: false,
        };
      });

      // push the new object onto the card
      bingoCardsFormatted[index].push(mappedToObject);
    });
    return bingoCardsFormatted;
  },
  markBingoCards: (bingoCards, numberChosen, index) => {
    // loop through each card and us the numberChosen variable to see if that number should be marked.
    // if it matches, set it's value to true
    bingoCards.forEach((bingoCard, i) => {
      bingoCard.forEach((row) => {
        row.forEach((number) => {
          // since value starts out as false, need to check if type is undefined
          if (typeof number[numberChosen] !== "undefined") {
            number[numberChosen] = true;
          }
        });
      });
    });
    return bingoCards;
  },
  checkForWinner: (
    bingoCards,
    winningCards,
    bingoCardsFormattedLength,
    num
  ) => {
    bingoCards.forEach((bingoCard, i) => {
      // winners can be defined as having 5 matching values diagnolly or vertically. We just need to count the number of wins in the row.
      // vertical winners will record the number of wins in a column based on that columns index
      const verticalWinners = [];
      bingoCard.forEach((row) => {
        // Row winners has the same principal but since we're looping through horizontally we don't need to make it
        // an array, just check if it wins at each row
        let rowWinners = 0;

        row.forEach((number, rowIndex) => {
          const key = Object.keys(number)[0];
          // check to see if the value has been marked. if it has, set the column and row win values += 1
          if (number[key] === true) {
            if (!verticalWinners[rowIndex]) verticalWinners[rowIndex] = 0;
            rowWinners += 1;
            verticalWinners[rowIndex] += 1;
          }

          //loop through vertical win conditions and see if any of them have won
          let verticalWinCondition = false;
          verticalWinners.forEach((item) => {
            if (item >= 5) verticalWinCondition = true;
          });
          const horizontalWinCondition = rowWinners >= 5;

          if (verticalWinCondition || horizontalWinCondition) {
            // need to push the winning card onto the array, but don't push it if it's already there.
            // so first loop through to see if it's been populated
            let cardHasBeenLogged = false;
            winningCards.forEach((cardIndex) => {
              if (cardIndex === i) cardHasBeenLogged = true;
            });

            //if winning card hasn't been logged, do so
            if (cardHasBeenLogged === false) {
              winningCards.push(i);
            }

            //if the bingocard length is the same as the winning card length, that means the last
            // card has been logged, and we need to record the number called out which lead
            // to this last card's win condition
            if (
              bingoCardsFormattedLength === winningCards.length &&
              winningNumber === null
            ) {
              winningNumber = num;
            }
          }
        });
      });
    });
    return winningCards;
  },
  calculateWinningCardValue: (winningCard) => {
    // need to add together only values that havne't been selected (marked as false)

    let cardUnselectedTotal = 0;
    winningCard.forEach((row) => {
      row.forEach((number) => {
        const key = Object.keys(number)[0];
        if (number[key] === false) {
          cardUnselectedTotal += Number(key);
        }
      });
    });
    return cardUnselectedTotal;
  },
};

const main = () => {
  const {
    doAThing,
    formatBingoCards,
    markBingoCards,
    checkForWinner,
    calculateWinningCardValue,
  } = findWinningBingo;
  let bingoCardsFormatted = formatBingoCards(bingoCards);

  //use winning cards to push cards as they win onto this array. We can then look at the very last card pushed onto
  //the array to determine which card won last
  let winningCards = [];
  let lastNumber = null;

  bingoNumbersSplit.forEach((num, i) => {
    // if winning card length is the same as bingoCardsFormatted length, this means
    // the final card has recieved a win condition so we shouldn't mark anymore cards
    if (winningCards.length !== bingoCardsFormatted.length) {
      bingoCardsFormatted = markBingoCards(bingoCardsFormatted, num, i);
      const cardWon = checkForWinner(
        bingoCardsFormatted,
        winningCards,
        bingoCardsFormatted.length,
        num
      );
      lastNumber = num;
    }
  });

  const lastToWin = bingoCardsFormatted[winningCards[winningCards.length - 1]];

  const winningCardValue = calculateWinningCardValue(lastToWin);
  // calculate the value of the last card's unselected by the last number called

  return Number(lastNumber) * winningCardValue;
};

const result = main();
console.log(result);
