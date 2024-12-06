# Bowling Calculator
This is a simple calculator that accepts flat array of bowling scores (individual rolls) and returns an array of scores by frame.

## Installation
    npm install

## Usage
Create a new BowlingCalculator object with an array of scores. Scores may be integer values between 0 and 9, `X` (strike), or `/` (spare).

    const calculator = new BowlingCalculator([1, 5, 6, 0, 'X', 3, '/', 9, 0]);

    console.log(calculator.scores);
    // [6, 6, 20, 19, 9]

If the data set is incomplete (i.e., the game is in progress), the calculator will leave null values for frames that cannot be calculated.

    const calculator = new BowlingCalculator([6, 2, 'X', 3]);

    console.log(calculator.scores);
    // [8, null, null]

## Testing
Run tests using [Jest](https://jestjs.io):

    npm run test


