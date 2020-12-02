import CharSpecialToken from "./CharSpecialToken";
import SpecialToken from "./ISpecialToken";

/**
 * A speical token that is a comment, which is bounded by two tokens.
 * For example, "/*" and "*\/", or "//" and "\n", in Javascript.
 */
export default class CommentSpecialToken implements SpecialToken {

    startToken: CharSpecialToken
    endToken: CharSpecialToken
    insideComment: boolean
    completedComment: boolean
    
    constructor(private startChars: string, private endChars: string) {
        this.startToken = new CharSpecialToken(startChars)
        this.endToken = new CharSpecialToken(endChars)
        this.insideComment = false
        this.completedComment = false
    }

    takingPlace(nextChar: string): boolean {
        this.startToken.takingPlace(nextChar)
        this.endToken.takingPlace(nextChar)
        if (!this.insideComment) {
            this.insideComment = this.startToken.completed()
        } else {
            this.insideComment = !this.endToken.completed()
            this.completedComment = this.insideComment
        }
        return this.insideComment
    }

    completed(): boolean {
        return this.completedComment
    }
    
}