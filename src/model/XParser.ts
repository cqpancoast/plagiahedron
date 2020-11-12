import AStringParser from "./AStringParser";
import PHFile from "./PHFile";

/**
 * Parses a file by converting every token into some filler string.
 * This can be altered, but it is the string "x" by default.
 * Tokens are defined as anything that isn't a "special character",
 * which itself is defined by a function that takes in a character
 * and a file extension and determines whether the character isn't
 * allowed in a token for that file type.
 */
export default class XParser extends AStringParser {

    private fillerChar: string = "x"  // must be one character

    constructor(
        protected minMatchLength: number,
        private specialCharDict: { [fileExtension: string]: string[] }
        ) {
            super(minMatchLength)
        }

    /**
     * Identifies tokens in a file string by determining whether
     * they are separated by special characters. Returns a string
     * where every token has been turned into an x.
     * 
     * @param file a PHFile.
     * @throws Error if this parser does not have a specialCharacterDict
     *  entry correspondning to the file extension.
     * @returns the contents of the file, "x-ified" as per the procedure
     *  in the class docstring.
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

    protected getSubstringIndex(file: PHFile, parseFeature: string, afterThisIndex: number) {
        let fileContent: string = file.getContent()
        let relevantContent: string = fileContent.substring(afterThisIndex, fileContent.length)
        let sameSpecial: (: string, a: string)

        for (let i = 0; i < relevantContent.length; i++) {
            if ()
        }
    }

    /**
     * Returns whether the given chracter is a special character, given the dictionary
     * this class was initialized with.
     * 
     * @param char a character. 
     * @param fileExtension the extension of the file in which the character is
     *  being considered.
     * @throws Error if this parser does not have a specialCharacterDict
     *  entry correspondning to the file extension.
     * @returns whether the given character is a special character.
     */
    private isSpecialChar(char: string, fileExtension: string) {
        let specialChars: string[] = this.specialCharDict[fileExtension]
        if (specialChars !== undefined) {
            return char in specialChars
        } else {
            throw new Error("The file extension "
                + fileExtension
                + "is not contained in the list of file extensions "
                + Object.keys(this.specialCharDict))
        }
    }

}

