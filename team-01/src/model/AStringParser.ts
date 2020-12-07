import IParser from "./IParser";
import PHFile from "./PHFile";
import PHFileSubstring from "./PHFileSubstring";


/**
 * Parent class for parsers that parse file contents to a string.
 * Has a property minMatchLength, which is the smallest size considered
 * for PARSED MATCHES between the two files. It will always be the case
 * for this class that the length of a parsed match is less than or equal 
 * to the length of the segment of the file that it was parsed from, so
 * minMatchLength is also the minimum window size considered when iterating
 * through the unparsed files to find the matches.
 */
export default abstract class AStringParser implements IParser<string> {

    constructor(protected minMatchLength: number) {}

    abstract parse(file: PHFile): string

    abstract unparse(parseFeature: string, file: PHFile): PHFileSubstring[]

    /**
     * Finds all similar strings of length at least this.minMatchLength
     * between file contents. Ignores duplicates.
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

        return Array.from(new Set(parsedMatches.filter(  // we want unique elements
            parsedMatch => parsedMatch.length >= this.minMatchLength)))
    }

}