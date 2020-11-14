import IPHSimilarity from "./IPHSimilarity"
import PHFileSubstring from "./PHFileSubstring"

/**
 * An exact match between the parsed versions of PHFileSubstrings from different Programs.
 */
export default class PHSimilarity implements IPHSimilarity<string> {
    
    constructor(private parsedString: string,
                private similarSubstrings: PHFileSubstring[]) {}
    
    /**
     * Gets the parsed string shared between all files implicated in this similarity.
     */            
    getParsedMatch(): string {
        return this.parsedString
    }

    /**
     * The score of this string-based similarity is the length of the parsed string.
     */
    getScore(): number {
        return this.parsedString.length
    }

    /**
     * Gets names of programs associated with this similarity.
     */
    getProgramNames(): string[] {
        let programNames: string[] = []
        this.similarSubstrings.forEach(simSub => {
            programNames.push(simSub.getProgramName())
        })
        return programNames
    }

    /**
     * Returns the substring implicated in this similarity associated with
     * the given program name.
     * 
     * @param programName the name of a program implicated in this similarity.
     * @throws [some error] if the program name is not implicated in this similarity.
     */
    getFileSubstring(programName: string): PHFileSubstring {
        this.similarSubstrings.forEach(simSub => {
            if (simSub.getProgramName() == programName) {
                return simSub
            }
        })
        throw new Error("Program name " + programName + " not associated with this similarity.")
    }

    /**
     * Get all substrings that parse down to the parsed match for this similarity.
     */
    getFileSubstrings(): PHFileSubstring[] {
        return this.similarSubstrings
    }
}
