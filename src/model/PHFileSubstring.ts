import PHFile from "./PHFile";

/**
 * A (contiguous) substring of a PHFile in a CodeSet.
 */
export default class PHFileSubstring {

    private programName: string
    private fileNameAndExtension: string
    private startLine: number
    private rawString: string

    /**
     * Returns the name of the file implicated in this similarity.
     */
    getFileNameAndExtension(): string {
        return this.fileNameAndExtension
    }

    /**
     * Returns the name of the program that the file is in.
     */
    getProgramName(): string {
        return this.programName
    }

    /**
     * Returns the line number in the file that the similarity begins at.
     */
    getStartLine(): number {
        return this.startLine
    }

    /**
     * Returns the substring of the file found to be similar to others.
     */
    getRawString(): string {
        return this.rawString
    }

}
