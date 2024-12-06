/**
 * Tests for Bowling Score Calculator
 */

import { BowlingCalculator } from '../src/bowling-calculator';


test('Test frame converter', () => {
    const input      = [1, 2, 3, 4, 'X'];
    const calculator = new BowlingCalculator(input);

    expect(calculator.frames).toStrictEqual([
        [1, 2],
        [3, 4],
        [10, null]
    ]);
    
});




