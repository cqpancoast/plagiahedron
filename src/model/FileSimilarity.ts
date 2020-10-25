import PHFile from "./PHFile";

/**
 * Represents a section of text in a PHFile.
 */
export default class FileSimilarity {

    private file: PHFile
    private startLine: number
    private rawString: string

    /**
     * Returns the name of the file implicated in this similarity.
     */
    getFileNameAndExtension(): string {
        return this.file.getNameAndExtension()
    }

    /**
     * Returns the raw string contents of this FileSimilarity's file.
     */
    getRawFileContents(): string {
        return this.file.getContents()
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
