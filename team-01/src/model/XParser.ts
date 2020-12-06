import AStringParser from "./AStringParser";
import PHFile from "./PHFile";
import PHFileSubstring from "./PHFileSubstring";
import SpecialToken from "./ISpecialToken";

/**
 * Parses a file by converting every token into some filler string.
 * This can be altered, but it is the string "x" by default.
 * Tokens are defined as anything that isn't a "special token",
 * which itself is defined by [...]
 */
export default class XParser extends AStringParser {

    private fillerChar: string = "\ubeef"

    constructor(
        protected minMatchLength: number,
        private specialTokenDict: { [fileExtension: string]: SpecialToken[] }
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

        let lastPrintIndex = 0
        let specialTokens: SpecialToken[] = this.specialTokenDict[fileExtension]
        let definitelyTokens: SpecialToken[]
        let doneTokens: SpecialToken[]
        let specialTokenStartIndex: number
        for (let i = 0; i < fileContent.length; i++) {

            definitelyTokens = specialTokens.filter(specialToken => specialToken.getState() === "DEFINITELY")
            if (definitelyTokens.length > 0) {
                specialTokens = definitelyTokens
            }

            specialTokens.forEach(specialToken => specialToken.updateState(fileContent[i]))
            doneTokens = specialTokens.filter(specialToken => specialToken.getState() === "DONE")
            if (doneTokens.length > 0) {
                specialTokenStartIndex = i - (doneTokens[0].getLength() - 1)
                if (specialTokenStartIndex > lastPrintIndex + 1) {
                    parseUnits.push(this.fillerChar)
                } else if (specialTokenStartIndex < lastPrintIndex) {
                    throw new Error("hey do'nt do that")
                }
                parseUnits.push(fileContent.substring(specialTokenStartIndex, i + 1))
                lastPrintIndex = i
                specialTokens = this.specialTokenDict[fileExtension]
                specialTokens.forEach(specialToken => specialToken.reset())
            }
            if (i === fileContent.length - 1) {
                if (doneTokens.length === 0) {
                    parseUnits.push(this.fillerChar)
                }
            }
        }
        return parseUnits.join("")
    }

    unparse(parseFeature: string, file: PHFile): PHFileSubstring[] {
        let matchedContents = file.getContent().match(parseFeature.replace(this.fillerChar, ".+"))
        return matchedContents === null ? [] : 
            matchedContents.filter(match =>
                this.parse(new PHFile(file.getName(), file.getExtension(), match)) === parseFeature
                && match !== "")
            .map(match =>
                new PHFileSubstring(file.getProgramName(),
                file.getNameAndExtension(),
                file.getContent().indexOf(match),
                match))
    }

    /**
     * Method to return filler characters
     */
    getFillerChar(): string {
        return this.fillerChar
    }

}