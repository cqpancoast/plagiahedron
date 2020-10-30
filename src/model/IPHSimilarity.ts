import PHFileSubstring from "./PHFileSubstring";


/**
 * An exact match between the parsed versions of PHFileSubstrings from different Programs.
 */
export default interface IPHSimilarity<T> {

    /**
     * Returns the string that was identified as similar after the files were parsed.
     */
    getParsedMatch(): T
    
    /**
     * Returns a score that signifies how significant this similarity is.
     * The score should depend on the parsed match and the number of files involved.
     * Note that it does not depend on the preparsed forms of the strings found to be similar.
     * (Might change this.)
     */
    getScore(): number

    /**
     * Gets the names of every program implicated in this Similarity.
     */
    getProgramNames(): string[]

    /**
     * Returns the matched PHFileSubstring associated with the given program name.
     */
    getFileSubstring(programName: string): PHFileSubstring

}
