import IParser from "./IParser";
import PHFile from "./PHFile";
import PHFileSubstring from "./PHFileSubstring";

/**
 * Parses a file by converting every token into some filler string.
 * This can be altered, but it is the string "x" by default.
 * Tokens are defined as anything that isn't a "special character",
 * which itself is defined by a function that takes in a character
 * and a file extension and determines whether the character isn't
 * allowed in a token for that file type.
 */
export default class XParser implements IParser<string> {

    constructor(
        private fillerChar: string = "x",
        private isSpecialChar: (char: string, extension: string) => boolean
        ){}

    /**
     * Identifies tokens in a file string by determining whether
     * they are separated by special characters. Returns a string
     * where every token has been turned into an x.
     * @param file a PHFile.
     * @returns the contents of the file, x-ified.
     */
    parse(file: PHFile): string {
        let fileContent: string = file.getContent()
        let fileExtension: string = file.getExtension()

        let parseUnits: string[] = [] // tokens and special characters
        let lastCharSpecial: boolean = false
        for (let i = 0; i < fileContent.length; i++) {
            let currentChar: string = fileContent[i]
            if (this.isSpecialChar(currentChar, fileExtension)) {
                if (!lastCharSpecial) {
                    parseUnits.push(this.fillerChar)
                    lastCharSpecial = true
                }
                parseUnits.push(currentChar)
            } else {
                lastCharSpecial = false
            }
        }

        return parseUnits.join("")
    }

    unparse(parseFeature: string, file: PHFile): PHFileSubstring[] {
        throw new Error("Method not implemented.");
    }

    findParsedMatches(f1: PHFile, f2: PHFile): string[] {
        throw new Error("Method not implemented.");
    }

}