import CodeSet from "./CodeSet"
import IPlagiahedronGenerator from "./IPlagiahedronGenerator"
import Plagiahedron from "./Plagiahedron"
import Similarity from "./Similarity"

class WinnowingPHGen implements IPlagiahedronGenerator {
    private preprocessor: (preprocessedFileContent: string) => string
    private winnower: (fileContents: string[]) => Similarity[]
    private maxGroupSize: number

    // Boring getters + setters...
    getPreProcessor(): (preprocessedFileContent: string) => string {
        return this.preprocessor
    }
    getWinnower(): (fileContents: string[]) => Similarity[] {
        return this.winnower
    }
    getMaxGroupSize(): number {
        return this.maxGroupSize
    }
    setPreProcessor(preprocessor: (preprocessedFileContent: string) => string) {
        this.preprocessor = preprocessor
    }
    setWinnower(winnower: (fileContents: string[]) => Similarity[]) {
        this.winnower = winnower
    }
    setMaxGroupSize(maxGroupSize: number) {
        this.maxGroupSize = maxGroupSize
    }

    // Private methods that constructPlagiahedron calls as subroutines
    private compareFiles(programNames: string[], files: File[]): Similarity[] {
        throw new Error("Method not implemented.")
    }
    private findGroupSimilarities(codeSet: CodeSet, programNames: string[]): Similarity[] {
        throw new Error("Method not implemented.")
    }

    // The star of the show!
    constructPlagiahedron(codeset: CodeSet): Plagiahedron {
        throw new Error("Method not implemented.")
    }
}
