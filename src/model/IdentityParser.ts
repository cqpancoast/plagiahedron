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
    findParsedMatches(f1: PHFile, f2: PHFile): string[] {
        /**
         * Asked for help on Piazza with this.
         */
        throw new Error("Method not implemented.");
    }
    
}