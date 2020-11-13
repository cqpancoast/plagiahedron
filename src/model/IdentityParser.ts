import AStringParser from "./AStringParser";
import PHFile from "./PHFile";

/**
 * Parses the file by simply returning its content.
 * 
 * Could be used in implementation if we're really low on time,
 * but likely just for testing purposes.
 * I am most likely going to pull some info out from here into an abstract class.
 */
export default class IdentityParser extends AStringParser {

    constructor(protected minMatchLength: number) {
        super(minMatchLength)
    }

    parse(file: PHFile): string {
        return file.getContent()
    }

    protected getSubstringIndex(file: PHFile, parseFeature: string, afterThisIndex: number) {
        let firstIndex: number
        try {
            firstIndex = file.getParsedContent().indexOf(parseFeature, afterThisIndex)
        } catch (error) {
            throw new Error("Parsed content of file is not of type string.")
        }
        if (firstIndex === -1) {
            throw new Error("Parse feature not contained in file contents.")
        }
        return firstIndex
    }

}