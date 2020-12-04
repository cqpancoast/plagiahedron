import IParser from "./IParser";
import PHFile from "./PHFile";
import PHFileSubstring from "./PHFileSubstring";

/**
 * Parses the file by simply returning its content.
 * 
 * Could be used in implementation if we're really low on time,
 * but likely just for testing purposes.
 * I am most likely going to pull some info out from here into an abstract class.
 */
export default abstract class AStringParser implements IParser<string> {

    constructor(protected minMatchLength: number) {}

    abstract parse(file: PHFile): string

    abstract unparse(parseFeature: string, file: PHFile): PHFileSubstring[]

    /**
     * Finds all similar strings of length at least this.minMatchLength between file contents.
     */
    findParsedMatches(f1: PHFile, f2: PHFile): string[] {
        if (f1.getExtension() !== f2.getExtension()) {
            return []
        }

        if (f1.getParsedContent() === undefined) {
            f1.acceptParser(this)
        }
        if (f2.getParsedContent() === undefined) {
            f2.acceptParser(this)
        }

        let f1c: string = f1.getParsedContent()
        let f2c: string = f2.getParsedContent()
        let startChar: number = 0
        let endChar: number = Math.min(this.minMatchLength, f1c.length, f2c.length)

        let parsedMatches: string[] = []
        while (endChar <= f1c.length) {
            if (f2c.includes(f1c.substring(startChar, endChar))) {

                // if a match is found for a window, keep increasing the width
                while (f2c.includes(f1c.substring(startChar, endChar + 1))
                       && endChar <= f1c.length) {
                    endChar += 1
                }
                parsedMatches.push(f1c.substring(startChar, endChar))
                endChar += 1
                startChar = endChar - this.minMatchLength
            } else {
                startChar += 1  //move onto the next window
                endChar += 1
            }
        }

        return parsedMatches
    }

}