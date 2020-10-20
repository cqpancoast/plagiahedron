import PHFile from "./PHFile";

/**
 * Represents a section of text in a PHFile.
 * Not really sure about the details at the moment.
 */
export default class FileSimilarity {

    file: PHFile;

    getFileName(): string {
        return this.file.getName()
    }

    /**
     * Other content stuff. Depends on algorithm.
     */

}