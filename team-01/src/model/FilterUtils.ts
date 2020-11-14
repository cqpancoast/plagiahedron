import IPHSimilarity from "./IPHSimilarity";


/**
 * Performs filter operations on Similarity lists. Will be coded as needed.
 */
export default class FilterUtils {

    /**
     *  Filters list such that similarities containing only given filenames 
     *  (and no others) are shown. Returns a list ordered by similarity score.
     *  e.g.: filtering by ABC only shows similarities with ABC & CAB & BAC, not AB, BA, ABCD, etc.
     */
    static showOnly(simList: IPHSimilarity<any>[], nameList: string[]): IPHSimilarity<any>[] {

        var filteredArray!: IPHSimilarity<any>[]

        for (var simIndex = 0; simIndex < simList.length; simIndex++) {
            var similarity = simList[simIndex]

            for (var nameIndex = 0; nameIndex < nameList.length; nameIndex++) {
                var name = nameList[nameIndex]

                // if similarity doesn't include name, move on to next similarity
                if (!similarity.getProgramNames().includes(name)) {
                    break
                }
                // else, if similarity includes all names, push to filteredArray
                else if (nameIndex == nameList.length) {
                    filteredArray.push(similarity)
                }
            }
        }

        // return this.sortByScore(filteredArray)
        return filteredArray
    }

    /**
     * Filters certain program names out of this list of similarities.
     * @param sims the similarties under consideration.
     * @param progNames program names to exclude from the similarities being considered. 
     */
    static showWithout(sims: IPHSimilarity<any>[], progNames: string[]): IPHSimilarity<string>[] {
        return sims.filter(sim => sim.getProgramNames().every(progName => !progNames.includes(progName)))
    }

    /**
     *  Filters list such that similarities containing given filenames are shown, 
     *  including those that contain other filenames as well. Returns a list ordered by similarity score.
     *  e.g.: filtering by ABC shows ABC, CAB, ABCD, ABDCE, but *not* AB, A, BA
     */
    static showIncluding(simList: IPHSimilarity<any>[], nameList: string[]): IPHSimilarity<any>[] {

        var filteredArray!: IPHSimilarity<any>[]

        for (var simIndex = 0; simIndex < simList.length; simIndex++) {
            var similarity = simList[simIndex]
            var nameCount = 0

            for (var nameIndex = 0; nameIndex < nameList.length; nameIndex++) {
                var name = nameList[nameIndex]

                // if similarity doesn't include name, move on to next similarity
                if (similarity.getProgramNames().includes(name)) {
                    nameCount++
                }
            }

            // if matched names is the same number as nameList size, push to simList
            if (nameCount == nameList.length) {
                simList.push(similarity)
            }
        }

        // return this.sortByScore(filteredArray)
        return filteredArray
    }

    /**
     *  Filters list by number of programs in a similarity. Returns a list ordered by similarity score.
     */
    static filterByProgramCount(simList: IPHSimilarity<any>[], count: number): IPHSimilarity<any>[] {

        var filteredArray!: IPHSimilarity<any>[]

        for (var simIndex = 0; simIndex < simList.length; simIndex++) {
            var similarity = simList[simIndex]

            if (similarity.getProgramNames().length == count) {
                filteredArray.push(similarity)
            }
        }

        // return this.sortByScore(filteredArray)
        return filteredArray
    }

    /**
     * Takes an array of similarities and sorts by score
     */
    static sortByScore(simList: IPHSimilarity<any>[]): IPHSimilarity<any>[] {
        return simList.sort((a, b) => b.getScore() - a.getScore())
    }
}