import PHSimilarity from "./PHSimilarity"


/**
 * A plagarism report for a single assignment, storing all similarities found between all
 * permutations of different programs within a CodeSet relative to an IParser’s parsing
 * operation preformed on the file contents. A Plagiahedron is a static entity that cannot
 * be altered after its creation.
 */
export default class Plagiahedron {

    constructor(private similarities: PHSimilarity[]) {}

    getAllSimilarities(): PHSimilarity[] {
        return this.similarities
    }
    addPHSimilarity(s: PHSimilarity) {
        this.similarities.push(s)
    }

    /**
     * NOTE BY CASEY: There is probably a better way to implement filter
     * than creating explicit methods for ANY and ALL, but I don't feel like
     * thinking about it at the moment.
     */

    getSimilaritiesOfPrograms(programNames: []): PHSimilarity[] {
        throw new Error("Method not implemented.")
    }
    getTotalScoreOfPrograms(programNames: []): number {
        // add up score of each similarity that has ANY of these program names
        throw new Error("Method not implemented.")
    }
}
