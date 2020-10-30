import CodeSet from "./CodeSet";
import IParser from "./IParser";
import IPlagiahedronBuilder from "./IPlagiahedronBuilder";
import PHFile from "./PHFile";
import PHFileSubstring from "./PHFileSubstring";
import PHSimilarity from "./PHSimilarity";
import Plagiahedron from "./Plagiahedron";
import Program from "./Program";

/**
 * Builds a Plagiahedron given a CodeSet by building up a list of
 * PHSimilarities between the contents of PHFiles in distinct Programs.
 * 
 * This is done by first finding the similiarites between every possible
 * pair of Programs, and then seeing, for each PHSimilarity, whether
 * it is present in the files of additional Programs not included in the
 * pair. This pattern progresses iteratively until Program groups of all
 * possible sizes have been considered.
 * 
 * The type parameter T is the output type of the parser being used.
 */
export default abstract class APlagiahedronBuilder implements IPlagiahedronBuilder {

    protected parser: IParser<any>
    protected maxGroupSize: number

    constructPlagiahedron(codeset: CodeSet): Plagiahedron {
        let sims: PHSimilarity[] = []
        return null
    }

    /**
     * Finds all similarities between files in a program by iterating through pairs.
     * 
     * @param p1 
     * @param p2 
     */
    private compareTwoPrograms(p1: Program, p2: Program): PHSimilarity[] {
        return null
    }

    /**
     * Parses the two files, identifies similarities between their parse structures,
     * and returns a list of PHSimilarities whose constituent PHFileSubstrings are
     * found by unparsing each similar portion of the PHFiles and retrieving the
     * substring of the file content.
     * 
     * @param f1 a first file to compare
     * @param f2 a second file to compare
     */
    private compareTwoFiles(f1: PHFile, f2: PHFile): PHSimilarity[] {
        let parsedMatches: any[] = this.parser.findParsedMatches(f1, f2)
        let sims: PHSimilarity[] = []
        parsedMatches.forEach(parsedMatch => {
            let file1Substrings: PHFileSubstring[] = this.parser.unparse(parsedMatch, f1)
            let file2Substrings: PHFileSubstring[] = this.parser.unparse(parsedMatch, f2)
            file1Substrings.forEach(file1Substring => {
                file2Substrings.forEach(file2Substring => {
                    sims.push(new PHSimilarity(parsedMatch, [file1Substring, file2Substring]))
                })
            })
        })
        return sims
    }

    /**
     * Parses all the files in a program and returns additional similarities in which
     * this Program is implicated, considering the given ones.
     * 
     * @param p 
     * @param sims 
     */
    private findMoreSimilarities(p: Program, sims: PHSimilarity[]) {
        return null
    }
}
