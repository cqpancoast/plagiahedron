import AStringParser from "./AStringParser";
import PHFile from "./PHFile";

/**
 * Parses a file by converting the whole file into a regexp of
 * tokens and special characters.
 * 
 * Tokens are defined as anything that isn't a "special character",
 * which itself is defined by a dictionary mapping from a file
 * extension to a list of special characters associated with that
 * file extension.
 */
export default class RegExpParser extends AStringParser {

    fillerChar: string = "x"  // should be only one character

    constructor(
        protected minMatchLength: number,
        private specialCharDict: { [fileExtension: string]: string[] }
        ) {
            super(minMatchLength)
        }

    /**
     * Identifies tokens in a file string by determining whether
     * they are separated by special characters. Returns a string
     * representation of a regular expression in which tokens are
     * strings of non-special characters.
     * 
     * @param file a PHFile.
     * @throws Error if this parser does not have a specialCharacterDict
     *  entry correspondning to the file extension.
     * @returns the contents of the file in regexp form
     *  as per the procedure in the class docstring.
     */
    parse(file: PHFile): string {
        let nonSpecialCharRegExpString: string = this.getNonSpecialCharRegExpString(file.getExtension())

        return file.getContent().replace(
            new RegExp(nonSpecialCharRegExpString),
            this.fillerChar)
    }

    protected getSubstringIndex(file: PHFile, parseFeature: string, afterThisIndex: number) {
        let fileContent: string = file.getContent()
        let relevantContent: string = fileContent.substring(afterThisIndex, fileContent.length)
        let firstIndex: number
        try {
            firstIndex = relevantContent.search(
                new RegExp(parseFeature.replace("x",
                    this.getNonSpecialCharRegExpString(file.getExtension()))))
        } catch (error) {
            throw new Error("Parsed content of file is not of type string.")
        }
        if (firstIndex === -1) {
            throw new Error("Parse feature not contained in file contents.")
        }
        return afterThisIndex + firstIndex
    }

    /**
     * Returns a regular expression that matches any string of non-special characters.
     * @param fileExtension a file extension accounted for by this RegExpParser.
     * @throws Error if the given file extension is not accounted for by this RegExpParser.
     */
    private getNonSpecialCharRegExpString(fileExtension: string): string {
        let specialChars: string[] = this.specialCharDict[fileExtension]
        if (specialChars !== undefined) {
            return `^[${specialChars.join("")}+`
        } else {
            throw new Error(`The file type ${fileExtension} is not in
                the list of supported file types for this parser:
                ${Object.keys(this.specialCharDict)}.`)
        }
    }

}

