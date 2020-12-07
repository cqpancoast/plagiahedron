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
    public static showOnly(simList: IPHSimilarity<any>[], nameList: string[]): IPHSimilarity<any>[] {
        return FilterUtils.showIncluding(simList, nameList).filter(sim => sim.getProgramNames().length === nameList.length)
    }

    /**
     *  Filters list such that similarities containing given filenames are shown, 
     *  including those that contain other filenames as well. Returns a list ordered by similarity score.
     *  e.g.: filtering by ABC shows ABC, CAB, ABCD, ABDCE, but *not* AB, A, BA
     */
    public static showIncluding(simList: IPHSimilarity<any>[], nameList: string[]): IPHSimilarity<any>[] {
        return simList.filter(sim => nameList.every(name => sim.getProgramNames().includes(name)))
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
     *  Filters list by number of programs in a similarity. Returns a list ordered by similarity score.
     */
    public static filterByProgramCount(simList: IPHSimilarity<any>[], count: number): IPHSimilarity<any>[] {
        return simList.filter(sim => sim.getProgramNames().length === count)
    }

    /**
     * Takes an array of similarities and sorts by score
     */
    public static sortByScore(simList: IPHSimilarity<any>[]): IPHSimilarity<any>[] {
        return simList.sort((a, b) => b.getScore() - a.getScore())
    }
}