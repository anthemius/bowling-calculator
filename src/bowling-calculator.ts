/**
 * Class BowlingScoreCalculator
 * 
 * Accepts array of 
 */
export class BowlingCalculator {
    rolls : (number|null)[];
    frames: (number|null)[][];

    constructor(rolls: Array<number|string>) {
        this.rolls  = [];
        this.frames = [];

        this.validateInput(rolls);
        this.convertFrames();
    }


    /**
     * Calculate scores for each frame
     */
    get scores() : (number|null)[] {
        const frameScores: (number|null)[] = [];

        let frameCounter = 0;

        for (let i = 0; i < this.frames.length; i++) {
            frameCounter++;

            // Hold before tenth frame and handle after the for() loop ends
            if (frameCounter >= 10) {
                break;
            }
      
            const roll1 = this.frames[i][0] ?? 0; // make typescript happy
            const roll2 = this.frames[i][1] ?? null;

            // Strike! Add the next two rolls.
            if (roll1 == 10) {
                const nextRoll1 = this.frames[i + 1]?.[0] ?? false;
                let nextRoll2: number|false;
                
                // If the next roll is also a strike, look ahead
                if (nextRoll1 == 10) {
                    // If [i+1] is the tenth frame, it will have more than one roll, even if [i+1][0] is a strike.
                    // Otherwise, [i+2][0] should have a value.
                    nextRoll2 = this.frames[i + 1]?.[1] ?? this.frames[i + 2]?.[0] ?? false;
                } else {
                    nextRoll2 = this.frames[i + 1]?.[1] ?? false;
                }

                if (nextRoll1 !== false && nextRoll2 !== false) {
                    frameScores.push(10 + nextRoll1 + nextRoll2);
                } else {
                    frameScores.push(null);
                }

            }
            
            // Spare! Add the next roll.
            else if (Number(roll1) + Number(roll2) == 10) {
                const nextRoll = this.frames[i + 1]?.[0] ?? false;

                if (nextRoll !== false) {
                    frameScores.push(10 + nextRoll);
                } else {
                    frameScores.push(null);
                }
            }
        
            // Open frame. Better luck next time.
            else {
                if (this.frames[i][0] != null && this.frames[i][1] != null) {
                    frameScores.push(Number(this.frames[i][0]) + Number(this.frames[i][1]));
                } else {
                    frameScores.push(null);
                }
            }
        }

        // Handle the last frame with possible extra roll(s)
        if (this.frames.length >= 10) {
            frameScores.push(Number(this.frames[9][0]) + Number(this.frames[9][1] ?? null) + Number(this.frames[9][2] ?? null));
        }
        
        return frameScores;
    }

    /**
     * Convert input array into frames
     */
    private convertFrames() : void {
        // make a copy of this.rolls, because this function is going to eat it
        const rolls        = Array.from(this.rolls);
        let   frameCounter = 0;

        while (rolls.length) {
            frameCounter++;

            // Hold before the tenth frame; we'll handle it at the end
            if (frameCounter >= 10) {
                break;
            }

            const firstRoll = rolls.shift() ?? null;
        
            if (firstRoll == 10) {
                // strike
                this.frames.push([10]); // [10, null] ??
                continue;
            } else {
                // spare or open
                const secondRoll = rolls.shift() ?? null;

                this.frames.push([firstRoll, secondRoll]);
            }
        }

        // Include extra roll(s) for strike or spare in the last frame
        if (rolls.length) {
            this.frames.push([...rolls]);
        }
    }

    /**
     * Validate input
     * - Should be an array between 1 and 21 entries
     * - Each entry should be integer between 0 and 9, 'X' (strike), or '/' (spare)
     */
    private validateInput(rolls: (number|string|null)[]) : void {
        // Game hasn't started yet
        if (! rolls.length) {
            throw new Error('No data to calculate');
        }

        // Maximum of 21 possible rolls in a game
        if (rolls.length > 21) {
            throw new Error(`Too many rolls: ${this.rolls.length}`);
        }

        // Convert special characters to numeric values
        for (let i = 0; i < rolls.length; i++) {
            if (rolls[i] == 'X' || rolls[i] == 'x') {
                this.rolls.push(10);
            } else if (rolls[i] == '/') {
                this.rolls.push(10 - Number(rolls[i - 1]));
            } else if (Number.isInteger(rolls[i]) && Number(rolls[i]) >= 0 && Number(rolls[i]) < 10) {
                this.rolls.push(Number(rolls[i]));
            } else {
                throw new Error(`Invalid entry: ${rolls[i]}`);
            }
        }
    }

    


}







