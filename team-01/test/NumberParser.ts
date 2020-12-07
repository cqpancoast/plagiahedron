import IParser from "../src/model/IParser";
import PHFile from "../src/model/PHFile";
import PHFileSubstring from "../src/model/PHFileSubstring";

/**
 * A parser purely for parsing PHFile contents into non-strings for
 * testing the type-dependence of unparse() and findParsedMatches()
 * on string-based (or other, if we make 'em) IParser implementations.
 */
export default class NumberParser implements IParser<number> {
    parse(file: PHFile): number {
        return 0
    }
    unparse(parseFeature: number, file: PHFile): PHFileSubstring[] {
        return []
    }
    findParsedMatches(f1: PHFile, f2: PHFile): number[] {
        return []
    }
    
}