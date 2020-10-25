import FileSimilarity from "./FileSimilarity"

export default class Similarity {
    private score: number
    private parsedString: string
    private similarityDict: { [programName: string] : FileSimilarity; }

    /**
     * Returns a score that signifies how significant this similarity is.
     */
    getScore(): number {
        return this.score
    }

    /**
     * Gets the names of every program implicated in this Similarity.
     */
    getProgramNames(): string[] {
        return Object.keys(this.locationdict)
    }

    /**
     * Returns the string that was identified as similar after the
     * files were parsed.
     */
    getParsedString(): string[] {
        return this.parsedString
    }

    /**
     * Returns the FileSimilarity associated with the given program name.
     */
    getFileSimilarity(programName: string): string[] {
        return this.similarityDict[programName]
    }
}
