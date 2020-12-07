import CharSpecialToken from "./CharSpecialToken";
import SpecialToken from "./ISpecialToken";

/**
 * A speical token that is a comment, which is bounded by two tokens.
 * For example, "/*" and "*\/", or "//" and "\n", in Javascript.
 */
export default class CommentSpecialToken implements SpecialToken {

    private startToken: CharSpecialToken
    private endToken: CharSpecialToken
    private state: string = "NOT"
    private length: number = 0
    
    constructor(private startChars: string, private endChars: string) {
        this.startToken = new CharSpecialToken(startChars)
        this.endToken = new CharSpecialToken(endChars)
    }

    public updateState(nextChar: string): void {
        this.startToken.updateState(nextChar)
        this.endToken.updateState(nextChar)
        switch (this.state) {
            case "NOT":
                if (this.startToken.getState() === "POSSIBLY") {
                    this.state = "POSSIBLY"
                    this.length += 1
                } else if (this.startToken.getState() === "DONE") {
                    this.state = "DEFINITELY"
                    this.length += 1
                }
                break
            case "POSSIBLY":
                this.length += 1
                if (this.startToken.getState() === "DONE") {
                    this.state = "DEFINITELY"
                } else if (this.startToken.getState() === "NOT") {
                    this.state = "NOT"
                }
                break
            case "DEFINITELY":
                this.length += 1
                if (this.endToken.getState() === "DONE") {
                    this.state = "DONE"
                }
                break
            case "DONE":
                this.reset()
                break
        }
    }

    public getState(): string {
        return this.state
    }

    public getLength(): number {
        return this.length
    }

    public reset(): void {
        this.startToken.reset()
        this.endToken.reset()
        this.state = "NOT"
        this.length = 0
    }

    public getRegex(): string {
        return `${this.startToken.getRegex()}(.|\s)+${this.endToken.getRegex()}`
    }
    
}