import IPHSimilarity from "./IPHSimilarity"


/**
 * A plagarism report for a single assignment, storing all similarities found between all
 * permutations of different programs within a CodeSet relative to an IParser’s parsing
 * operation preformed on the file contents. A Plagiahedron is a static entity that cannot
 * be altered after its creation.
 */
export default class Plagiahedron {

    constructor(private similarities: IPHSimilarity<any>[]) {}

    /**
     * Returns list of similarities
     */
    getAllSimilarities(): IPHSimilarity<any>[] {
        return this.similarities
    }
    /**
     * Adds new similarity to array storing all similarities
     * @param s Similarity to be added
     */
    addPHSimilarity(s: IPHSimilarity<any>) {
        this.similarities.push(s)
    }
}
