

/**
 * Class BowlingScoreCalculator
 */
export class BowlingCalculator {
    rolls : (number|null)[];
    frames: (number|null)[][];
    scores: (number|null)[];

    constructor(rolls: Array<number|string>) {
        this.rolls  = [];
        this.frames = [];
        this.scores = [];

        this.validateInput(rolls);
        this.convertFrames();
        // this.calculateScores();
    }

    

    /**
     * Convert input array into frames
     */
    private convertFrames() : void {

        let frameCounter = 0;

        while (this.rolls.length) {
            frameCounter++;

            // If we've reached the tenth frame, stop.
            // We'll handle the final frame at the end.
            if (frameCounter >= 10) {
                break;
            }

            const firstRoll = this.rolls.shift() ?? null;
        
            if (firstRoll == 10) {
                // strike
                this.frames.push([10, null]);
                continue;
            } else {
                // spare or open
                const secondRoll = this.rolls.shift() ?? null;

                this.frames.push([firstRoll, secondRoll]);
            }
        }

        // Include extra roll(s) for strike or spare in the last frame
        if (this.rolls.length) {
            this.frames.push([...this.rolls]);
        }
    }

    /**
     * Validate input
     * - Should be an array between 1 and 21 entries
     * - Each entry should be integer between 0 and 10, 'X' (strike), or '/' (spare)
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
            } else {
                this.rolls.push(Number(rolls[i]));
            }
        }

        // Every value in this.rolls should be a number between 0 and 10
        this.rolls.forEach(element => {
            if (!Number.isInteger(element) || Number(element) > 10 || Number(element) < 0) {
                throw new Error(`Invalid entry: ${element}`);
            }
        });
    }




}







