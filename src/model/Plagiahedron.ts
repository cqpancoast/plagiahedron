import Similarity from "./Similarity"


export default class Plagiahedron {
    private similarities: Similarity[]

    getAllSimilarities(): Similarity[] {
        return this.similarities
    }
    addSimilarity(s: Similarity) {
        this.similarities.push(s)
    }

    /**
     * NOTE BY CASEY: There is probably a better way to implement filter
     * than creating explicit methods for ANY and ALL, but I don't feel like
     * thinking about it at the moment.
     */

    getSimilaritiesOfPrograms(programNames: []): Similarity[] {
        // filter through similarity list to find ones with ANY of these program names
        throw new Error("Method not implemented.")
    }
    getTotalScoreOfPrograms(programNames: []): number {
        // add up score of each similarity that has ANY of these program names
        throw new Error("Method not implemented.")
    }

    getSimilaritiesOfGroup(programNames: []): Similarity[] {
        // filter through similarity list to find ones with ALL of these program names
        throw new Error("Method not implemented.")
    }
    getTotalScoreOfGroup(programNames: []): number {
        // add up score of each similarity that has ALL of these program names
        throw new Error("Method not implemented.")
    }
}
