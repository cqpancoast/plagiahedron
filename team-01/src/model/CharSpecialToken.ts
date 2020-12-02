import SpecialToken from "./ISpecialToken";

/**
 * A special token that is one or more characters.
 */
export default class CharSpecialToken implements SpecialToken {

    private stringIndex = 0

    constructor(private specialChars: string) {}

    takingPlace(nextChar: string): boolean {
        if (nextChar === this.specialChars[this.stringIndex]) {
            this.stringIndex += 1
            return true
        } else {
            this.stringIndex = 0
            return false
        }
    }

    completed(): boolean {
        return this.stringIndex == this.specialChars.length
    }
    
}