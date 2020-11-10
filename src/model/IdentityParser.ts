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
export default class IdentityParser implements IParser<string> {

    constructor(private minMatchLength: number) {}

    parse(file: PHFile): string {
        return file.getContent()
    }

    unparse(parseFeature: string, file: PHFile): PHFileSubstring[] {
        let substrings: PHFileSubstring[] = []
        let numMatch: number = (file.getParsedContent().match(parseFeature) || []).length
        let substringIndex = 0  //when is the earliest index we are looking for this match?
        for (let match = 0; match < numMatch; match++) {
            substringIndex = file.getContent().indexOf(parseFeature, substringIndex)
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
     * Finds all similar strings of length at least this.minMatchLength between file contents.
     */
    findParsedMatches(f1: PHFile, f2: PHFile): string[] {
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