import AStringParser from "./AStringParser";
import PHFile from "./PHFile";
import PHFileSubstring from "./PHFileSubstring";
import SpecialToken from "./ISpecialToken";

/**
 * XParser, the pillar on which the rest of the code base sits.
 * 
 * Parses a file by converting every token into some filler character
 * using a greedy algorithm that waits until it's seen a full token,
 * and then prints it (unless that token is a comment). More information
 * on tokens can be found in their classes.
 * 
 * The filler char is the unicode character "\ubeef" by default, for no
 * other reason than it's not likely to come up in code and it's funny
 * to think that a student's academic career could be ruined by an
 * algorithm that had the word "beef" hard-coded into its most central
 * functionality.
 */
export default class XParser extends AStringParser {

    protected getSubstringIndex(file: PHFile, parseFeature: string, afterThisIndex: number) {
        throw new Error("Method not implemented.");
    }

    private fillerChar: string = "\ubeef"  //must be only one character

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
        let definitelyTokens: SpecialToken[] = []
        let doneTokens: SpecialToken[] = []
        let specialTokenStartIndex: number
        for (let i = 0; i < fileContent.length; i++) {

            if (specialTokens) {
                definitelyTokens =  specialTokens.filter(specialToken => specialToken.getState() === "DEFINITELY")
                if (definitelyTokens.length > 0) {
                    specialTokens = definitelyTokens
                }
    
                specialTokens.forEach(specialToken => specialToken.updateState(fileContent[i]))
                doneTokens = specialTokens!.filter(specialToken => specialToken.getState() === "DONE")
                if (doneTokens.length > 0) {
                    specialTokenStartIndex = i - (doneTokens[0].getLength() - 1)
                    if (specialTokenStartIndex > lastPrintIndex + 1) {
                        parseUnits.push(this.fillerChar)
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
        }
        return parseUnits.join("")
    }

    unparse(parseFeature: string, file: PHFile): PHFileSubstring[] {
        let matchedContents = file.getContent().match(
            new RegExp(`${parseFeature
                .replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')
                .replace(new RegExp(`${this.fillerChar}`, "g"),
                                    `[^${this.specialTokenDict[file.getExtension()]
                                        .map(specialToken => specialToken.getRegex())
                                        .filter(specialTokenRegex => specialTokenRegex.length <= 2)
                                        .join("")}]+`)}`, "g"))
        return matchedContents === null ? [] : 
            matchedContents.filter(match =>
                match.length >= this.minMatchLength
                && this.parse(new PHFile(file.getName(), file.getExtension(), match)) === parseFeature)
            .map(match =>
                new PHFileSubstring(file.getProgramName(),
                file.getNameAndExtension(),
                file.getContent().indexOf(match),
                match))
    }

    getFillerChar(): string {
        return this.fillerChar
    }

}