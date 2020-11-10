import AStringParser from "./AStringParser";
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
export default class IdentityParser extends AStringParser {

    constructor(protected minMatchLength: number) {
        super(minMatchLength)
    }

    parse(file: PHFile): string {
        return file.getContent()
    }

    protected getSubstringIndex(file: PHFile, parseFeature: string, afterThisIndex: number) {
        return file.getParsedContent().indexOf(parseFeature, afterThisIndex)
    }

}