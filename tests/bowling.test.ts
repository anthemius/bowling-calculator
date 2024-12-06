/**
 * Tests for Bowling Score Calculator
 */

import { BowlingCalculator } from '../src/bowling-calculator';


test('Test frame converter', () => {
    const input      = [1, 2, 3, 4, 'X', 1, 2, 3];
    const calculator = new BowlingCalculator(input);

    expect(calculator.rolls).toStrictEqual([1, 2, 3, 4, 10, 1, 2, 3]);

    expect(calculator.frames).toStrictEqual([
        [1, 2],
        [3, 4],
        [10],
        [1, 2],
        [3, null]
    ]);
    
});

test('Calculate provided example 1', () => {
    const input      = [4, 5, "X", 8];
    const calculator = new BowlingCalculator(input);

    // expect(calculator.rolls).toStrictEqual([4, 5, 10, 8]);
    expect(calculator.scores).toStrictEqual([9, null, null]);
});

test('Calculate provided example 2', () => {
    const input      = [4, 5, "X", 8, 1];
    const calculator = new BowlingCalculator(input);

    expect(calculator.scores).toStrictEqual([9, 19, 9]);
});

test('Calculate incomplete game ending in strike', () => {
    const input      = [1, 3, 4, 3, 'X'];
    const calculator = new BowlingCalculator(input);

    expect(calculator.scores).toStrictEqual([4, 7, null]);
});

test('Calculate incomplete game ending in spare', () => {
    const input      = [3, 6, 2, 5, 4, '/'];
    const calculator = new BowlingCalculator(input);

    expect(calculator.scores).toStrictEqual([9, 7, null]);
});

test('Calculate complete game, example 1', () => {
    const input      = [7, 1, 5, '/', 7, '/', 1, 0, 3, '/', 'X', 5, 4, 8, 0, 4, 4, 7, '/', 6];
    const calculator = new BowlingCalculator(input);

    expect(calculator.scores).toStrictEqual([8, 17, 11, 1, 20, 19, 9, 8, 8, 16]);
});

test('Calculate complete game, example 2', () => {
    const input      = [9, '/', 'X', 7, 2, 7, '/', 9, 0, 'X', 6, 0, 8, 0, 7, 1, 8, 1];
    const calculator = new BowlingCalculator(input);

    expect(calculator.scores).toStrictEqual([20, 19, 9, 19, 9, 16, 6, 8, 8, 9]);
});

test('Calculate perfect game', () => {
    const input      = ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"];
    const calculator = new BowlingCalculator(input);

    expect(calculator.frames).toStrictEqual([[10],[10],[10],[10],[10],[10],[10],[10],[10],[10, 10, 10]]);
    expect(calculator.scores).toStrictEqual([30, 30, 30, 30, 30, 30, 30, 30, 30, 30]);
    expect(calculator.scores.reduce( (acc, curr) => Number(acc) + Number(curr) )).toBe(300);
});




