import SpecialToken from "./SpecialToken";

/**
 * A speical token that is a comment, which is bounded by two tokens.
 * For example, "/*" and "*\/", or "//" and "\n", in Javascript.
 */
export default class CommentSpecialToken implements SpecialToken {

    constructor(private startChars: string, private endChars: string) {}

    takingPlace(nextChar: string): boolean {
        throw new Error("uh oh")
    }
    
}