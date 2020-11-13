import PHFile from "./PHFile";

/**
 * A (contiguous) substring of a PHFile in a CodeSet.
 */
export default class PHFileSubstring {

    constructor(private programName: string,
        private fileNameAndExtension: string,
        private startIndex: number,
        private rawString: string) {}

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
     * Returns the index of the character in the file that the similarity begins at.
     */
    getStartIndex(): number {
        return this.startIndex
    }

    /**
     * Returns the substring of the file found to be similar to others.
     */
    getRawString(): string {
        return this.rawString
    }

}
