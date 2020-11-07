import IPHSimilarity from "./IPHSimilarity";
import { isFunctionTypeParam } from "@babel/types";


/**
 * Performs filter operations on Similarity lists. Will be coded as needed.
 */
class FilterUtils {

    /**
     *  Filters list such that similarities containing only given filenames 
     *  (and no others) are shown. Returns a list ordered by similarity score.
     */
    showOnly(simList: IPHSimilarity<string>[], nameList: string[]): IPHSimilarity<string>[] {

        var filteredArray: IPHSimilarity<string>[]

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

        return filteredArray
    }

    /**
     *  Filters list such that similarities containing given filenames are shown, 
     *  including those that contain other filenames as well. Returns a list ordered by similarity score.
     */
    showIncluding(simList: IPHSimilarity<string>[], nameList: string[]): IPHSimilarity<string>[] {

        var filteredArray: IPHSimilarity<string>[]

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

            return filteredArray
        }
    }

}