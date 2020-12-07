import SpecialToken from "./ISpecialToken";

/**
 * A special token that is one or more characters.
 */
export default class CharSpecialToken implements SpecialToken {

    private state = "NOT"
    private stringIndex = 0

    constructor(private specialChars: string) {}

    public updateState(nextChar: string): void {
        switch (this.state) {
            case "NOT":
                if (nextChar === this.specialChars[this.stringIndex]) {
                    this.stringIndex += 1
                    this.state = "POSSIBLY"
                    if (this.stringIndex === this.specialChars.length) {
                        this.state = "DONE"
                    }
                }
                break
            case "POSSIBLY":
                if (nextChar === this.specialChars[this.stringIndex]) {
                    this.stringIndex += 1
                    // stay in the same state
                    if (this.stringIndex === this.specialChars.length) {
                        this.state = "DONE"
                    }
                } else {
                    this.reset()
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
        return this.specialChars.length
    }

    public reset(): void {
        this.stringIndex = 0
        this.state = "NOT"
    }

    public getRegex(): string {
        return this.specialChars.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')
    }
    
}