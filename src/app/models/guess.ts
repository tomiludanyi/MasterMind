import { PegColor } from "./peg-color";

export class Guess {
    constructor(
        public colors: PegColor[],
        public keys: PegColor[]
    ) {}
}