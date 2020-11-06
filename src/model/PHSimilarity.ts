import IPHSimilarity from "./IPHSimilarity"
import PHFileSubstring from "./PHFileSubstring"

/**
 * An exact match between the parsed versions of PHFileSubstrings from different Programs.
 */
export default class PHSimilarity implements IPHSimilarity<string> {
    
    constructor(private parsedString: string,
                private similarSubstrings: PHFileSubstring[]) {}
    
    getParsedMatch(): string {
        throw new Error("Method not implemented.")
    }
    getScore(): number {
        throw new Error("Method not implemented.")
    }
    getProgramNames(): string[] {
        throw new Error("Method not implemented.")
    }
    getFileSubstring(programName: string): PHFileSubstring {
        throw new Error("Method not implemented.")
    }
    getFileSubstrings(): PHFileSubstring[] {
        return this.similarSubstrings
    }
}
