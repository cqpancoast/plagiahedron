import AStringParser from "./AStringParser";
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

    unparse(parseFeature: string, file: PHFile): PHFileSubstring[] {
        let matchedContent = file.getContent().match(parseFeature)
        return matchedContent === null ? [] :
            matchedContent.map(match =>
                new PHFileSubstring(file.getProgramName(),
                file.getNameAndExtension(),
                file.getContent().indexOf(match),
                match))
    }

}