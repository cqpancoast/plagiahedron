import FileSimilarity from "./FileSimilarity"

export default class Similarity {
    private score: number
    private locationdict: { [programName: string] : FileSimilarity; }

    getScore(): number {
        return this.score
    }
    getProgramNames(): string[] {
        return Object.keys(this.locationdict)
    }
    getFileNames(): string[] {
        // get all file names stored within the file similarities.
        throw new Error("Method not implemented.")
    }
    getLineRegions(): string[] {
        // CASEY: Not sure exactly what this is going to look like.
        // Will depend on the algorithm.
        throw new Error("Method not implemented.")
    }
}
