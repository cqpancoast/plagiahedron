/**
 * Represents a special token. Basically a regular expression hack.
 * 
 * Reads in characters one at a time, returning true if they are
 * part of the special token. For example, if the special token is "{",
 * it will return true once, and then false with every succeeding character.
 * However, if the character is "/", if it sees a "*" after that,
 * (and we're talking about the special characters in Javascript,)
 * it will return true until it sees the character combination "*\/".
 * If "//" is seen, this will return true until it hits a newline.
 */
export default interface ISpecialToken {

    /**
     * Are we inside this special token?
     */
    takingPlace(nextChar: string): boolean

    /**
     * Did we JUST complete going through the entire token?
     */
    completed(): boolean

}
