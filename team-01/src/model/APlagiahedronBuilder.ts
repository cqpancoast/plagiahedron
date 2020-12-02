import CodeSet from "./CodeSet";
import FilterUtils from "./FilterUtils";
import IParser from "./IParser";
import IPlagiahedronBuilder from "./IPlagiahedronBuilder";
import PHFile from "./PHFile";
import PHFileSubstring from "./PHFileSubstring";
import IPHSimilarity from "./IPHSimilarity";
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
 * Currently, this Plagiahedron builder only works with parsers of string type.
 */
export default abstract class APlagiahedronBuilder implements IPlagiahedronBuilder {

    protected parser!: IParser<string>;
    protected maxGroupSize!: number;

    constructPlagiahedron(codeSet: CodeSet): Plagiahedron {
        let sims: IPHSimilarity<string>[] = []
        let progNames: string[] = codeSet.getProgramNames()

        // find similarities for all combinations of two programs
        for (let i = 0; i < progNames.length; i++) {
            for (let j = i + 1; j < progNames.length; j++) {
                sims.concat(this.compareTwoPrograms(
                    codeSet.getProgram(progNames[i]),
                    codeSet.getProgram(progNames[j])))
            }
        }

        // find similarities of sizes up to this.maxGroupSize
        for (let newSimSize = 3; newSimSize < this.maxGroupSize; newSimSize++) {
            for (let i = 0; i < progNames.length; i++) {
                sims.concat(this.findMoreSimilarities(
                    codeSet.getProgram(progNames[i]),
                    FilterUtils.showWithout(
                        FilterUtils.filterByProgramCount(sims, newSimSize),
                        [progNames[i]])))
            }
        }

        return new Plagiahedron(sims)
    }

    /**
     * Finds all similarities between files in a program by iterating through pairs.
     * 
     * @param p1 a program
     * @param p2 another program distinct from the first
     */
    private compareTwoPrograms(p1: Program, p2: Program): IPHSimilarity<string>[] {
        let newSims: IPHSimilarity<string>[] = []
        p1.getFiles().forEach(f1 => {
            p2.getFiles().forEach(f2 => {
                newSims.concat(this.compareTwoFiles(f1, f2))
            })
        })
        return newSims
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
    private compareTwoFiles(f1: PHFile, f2: PHFile): IPHSimilarity<string>[] {
        let parsedMatches: string[] = this.parser.findParsedMatches(f1, f2)
        let newSims: IPHSimilarity<string>[] = []
        parsedMatches.forEach(parsedMatch => {
            let file1Substrings: PHFileSubstring[] = this.parser.unparse(parsedMatch, f1)
            let file2Substrings: PHFileSubstring[] = this.parser.unparse(parsedMatch, f2)
            file1Substrings.forEach(file1Substring => {
                file2Substrings.forEach(file2Substring => {
                    newSims.push(new PHSimilarity(parsedMatch, [file1Substring, file2Substring]))
                })
            })
        })
        return newSims
    }

    /**
     * Parses all the files in a program and returns additional similarities in which
     * this Program is implicated, considering similarities with a certian number of
     * programs already implicated.
     * 
     * @param p a new program in which to test for similarities already detected in others.
     * @param simSet all similarities to be cross-checked against files in the program.
     */
    private findMoreSimilarities(p: Program, simSet: IPHSimilarity<string>[]) {
        let newSims: IPHSimilarity<string>[] = []
        let simsToRemove: IPHSimilarity<string>[] = []
        simSet.forEach(sim => {
            let simsToAdd: IPHSimilarity<string>[] = []
            p.getFiles().forEach(file => {
                simsToAdd.concat(this.findMoreSimilaritiesInFile(sim, file))
            })
            if (simsToAdd.length > 0) {
                newSims.concat(simsToAdd)
                simsToRemove.push(sim)
            }
        });
        return newSims
    }

    /**
     * Return similarities found by considering the given similarity in context of a new file.
     * 
     * @param sim a PHSimilarity.
     * @param file a PHFile.
     */
    findMoreSimilaritiesInFile(sim: IPHSimilarity<string>, file: PHFile): IPHSimilarity<string>[] {
        let newSims: IPHSimilarity<string>[] = []

        let fileSubstrings: PHFileSubstring[] = this.parser.unparse(sim.getParsedMatch(), file)
        fileSubstrings.forEach(fileSubstring => {
            let simSubstrings: PHFileSubstring[] = sim.getFileSubstrings()
            simSubstrings.push(fileSubstring)
            newSims.push(new PHSimilarity(sim.getParsedMatch(), simSubstrings))
        })

        return newSims
    }
}
