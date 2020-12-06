/**
 * Represents a special token. Basically a regular expression hack.
 * 
 * Reads in characters one at a time, beginning to store characters
 * when the characters possibly constitute this token, beginning in the "NOT"
 * state and then, in this case, moving to "POSSIBLY". If a disqualifying
 * character is read in, this token goes back to the "NOT" state,
 * dropping all information. If a character is read in that cements the
 * status of the preceding characters as a special token, this token
 * enters the "DEFINITELY" state. From there, the token continually checks
 * the rest of the tokens for some end sequence, upon which it will enter
 * the "DONE" state.
 * 
 * A token can be "reset to factory settings" by calling the reset() method.
 * 
 * The total length of the special token is also accessible, potentially
 * implemented via a counter that begins when it first enters the "POSSIBLY"
 * state or simply the length of some literal token.
 */
export default interface ISpecialToken {

    updateState(nextChar: string): void

    getState(): string

    getLength(): number

    reset(): void

}
