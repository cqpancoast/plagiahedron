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

    unparse(parseFeature: string, file: PHFile): PHFileSubstring[] {
        let substrings: PHFileSubstring[] = []
        let numMatch: number = (file.getParsedContent().match(parseFeature) || []).length
        let substringIndex = 0  //when is the earliest index we are looking for this match?
        for (let match = 0; match < numMatch; match++) {
            substringIndex = this.getSubstringIndex(file, parseFeature, substringIndex)
            substrings.push(new PHFileSubstring(
                file.getProgramName(),
                file.getNameAndExtension(),
                substringIndex,
                parseFeature))
            substringIndex += 1  // start next search after start index of current match
        }
        return substrings
    }

    /**
     * Finds the first index of a substring in this file that parses down to the parse feature.
     * 
     * @param file a PHFile that has a string as its parsed content.
     * @param parseFeature a string contained within the parsed content of the file.
     * @param afterThisIndex the index of the file where we start looking for the substring.
     * @throws Error if no part of the given file's parsed content contains parse feature.
     * @throws TypeError if either of the PHFile's parsed contents are not of type T
     *  or if they are undefined.
     */
    protected abstract getSubstringIndex(file: PHFile, parseFeature: string, afterThisIndex: number)
    
    /**
     * Finds all similar strings of length at least this.minMatchLength between file contents.
     */
    findParsedMatches(f1: PHFile, f2: PHFile): string[] {
        if (f1.getExtension() !== f2.getExtension()) {
            throw new Error(`Input are of different types:
                ${f1.getExtension()}, ${f2.getExtension()}.`)
        }

        let f1c: string = f1.getParsedContent()
        let f2c: string = f2.getParsedContent()
        let f1clength: number = f1c.length
        let parsedMatches: string[] = []
        let windowWidth: number
        let startChar: number = 0

        // iterate through windows of size this.minMatchLength
        while (startChar < f1clength - this.minMatchLength) {
            windowWidth = this.minMatchLength - 1
            if (f2c.includes(f1c.substring(startChar, startChar + windowWidth))) {

                // if a match is found for a window, keep increasing the width
                while (f2c.includes(f1c.substring(startChar, startChar + windowWidth))
                        && startChar + windowWidth < f1clength) {
                    windowWidth += 1
                }
                parsedMatches.push(f1c.substring(startChar, startChar + windowWidth))
                startChar += windowWidth  // we don't want to find duplicate similarities
            } else {
                startChar += 1  //move onto the next window
            }
        }
        return parsedMatches
    }

}