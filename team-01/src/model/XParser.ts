import AStringParser from "./AStringParser";
import PHFile from "./PHFile";
import SpecialToken from "./SpecialToken";

/**
 * Parses a file by converting every token into some filler string.
 * This can be altered, but it is the string "x" by default.
 * Tokens are defined as anything that isn't a "special token",
 * which itself is defined by [...]
 */
export default class XParser extends AStringParser {

    private fillerChar: string = "x"  // must be one character

    constructor(
        protected minMatchLength: number,
        private specialCharDict: { [fileExtension: string]: SpecialToken[] }
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
        let parseUnits: string[] = []

        /* if the below has more than just one element,
         * the token is "ambiguous" and will keep going until
         * ALL return false. */
        let currentSpecialTokens: SpecialToken[] = []
        let insideSpecialChar: boolean = false
        for (let i = 0; i < fileContent.length; i++) {
            currentSpecialTokens = this.specialCharDict[fileExtension].filter(
                        specialToken => specialToken.takingPlace(fileContent[i]))
            if (currentSpecialTokens.length === 0) {
                insideSpecialChar = false
            } else {
                if (!insideSpecialChar) {
                    parseUnits.push(this.fillerChar)
                    insideSpecialChar = true
                }
                parseUnits.push(fileContent[i])
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

}