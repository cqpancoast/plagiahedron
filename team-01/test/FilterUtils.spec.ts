import FilterUtils from "../src/model/FilterUtils"
import PHSimilarity from "../src/model/PHSimilarity"
import PHFileSubstring from "../src/model/PHFileSubstring"
import 'mocha'
import { expect } from "chai"
import IPHSimilarity from "../src/model/IPHSimilarity"

describe("test filter", () => {

    let fileSubString1 = new PHFileSubstring("programName1", "filename", 3, "string content")
    let fileSubString2 = new PHFileSubstring("programName2", "filename2", 9, "the code")
    let fileSubString3 = new PHFileSubstring("programName3", "filename3", 18, "random function")
    let fileSubString4 = new PHFileSubstring("programName4", "filename4", 130, "more code")
    let fileSubString5 = new PHFileSubstring("programName5", "filename5", 1, "even more code")
    let fileSubString6 = new PHFileSubstring("programName6", "filename6", 90, "wow so much code")

    let substringArrayAll = [fileSubString1, fileSubString2, fileSubString3, fileSubString4,
        fileSubString5, fileSubString6]
    let substringArray1 = [fileSubString1]
    let substringArray2 = [fileSubString1, fileSubString2, fileSubString3]
    let substringArray3 = [fileSubString1, fileSubString3, fileSubString5]
    let substringArray4 = [fileSubString1, fileSubString3, fileSubString4, fileSubString5, fileSubString6]
    let substringArray5 = [fileSubString1, fileSubString2, fileSubString3]

    // longer string = higher score
    let simAll = new PHSimilarity("Similar String All", substringArrayAll)
    let sim1 = new PHSimilarity("code", substringArray1)
    let sim2 = new PHSimilarity("code short", substringArray2)
    let sim3 = new PHSimilarity("code sorta short", substringArray3)
    let sim4 = new PHSimilarity("code very much long innit", substringArray4)
    let sim5 = new PHSimilarity("code so very long oh my goodness", substringArray5)

    let simArrayAll = [simAll, sim1, sim2, sim3, sim4, sim5]

    // array of names for programs 1, 3, 5
    let nameArray135 = ["programName1", "programName3", "programName5"]
    // array of similarities which *include* programNames 1, 3, 5
    let simArrayInc135 = [simAll, sim3, sim4]

    // array of names for programs 1, 2, 3
    let nameArray123 = ["programName1", "programName2", "programName3"]
    // array of similarities which *have only* programNames 1, 2, 3
    let simArrayOnly123 = [sim2, sim5]

    // array of similarities with only 3 programs
    let simArray3Programs = [sim2, sim3, sim5]

    // array out of order
    let simArrayOutOfOrder = [sim2, sim3, sim1, sim5]
    // same array but in order
    let simArrayScoreOrder = [sim5, sim3, sim2, sim1]

    let testSimArrayInc135 = FilterUtils.showIncluding(simArrayAll, nameArray135)
    let testSimArrayOnly123 = FilterUtils.showOnly(simArrayAll, nameArray123)
    let testSimArray3Programs = FilterUtils.filterByProgramCount(simArrayAll, 3);
    let testSimArrayScoreOrder = FilterUtils.sortByScore(simArrayOutOfOrder)

    it("show including", () => {
        expectSimsArraysEqual(simArrayInc135, testSimArrayInc135)
    });

    it("show only", () => {
        expectSimsArraysEqual(simArrayOnly123, testSimArrayOnly123)
    });

    it("filter by program count", () => {
        expectSimsArraysEqual(simArray3Programs, testSimArray3Programs)
    });

    it("sort by score", () => {
        expectSimsArraysEqual(simArrayScoreOrder, testSimArrayScoreOrder)
    });

    it("show without", () => {
        expectSimsArraysEqual(FilterUtils.showWithout(simArrayAll, ["programName2"]), [sim1, sim3, sim4])
    });

    function expectSimsArraysEqual(array1: IPHSimilarity<any>[], array2: IPHSimilarity<any>[]) {
        expect(array1.length).to.equal(array2.length)
        for (let i = 0; i < array1.length; i++) {
            expect(array1[i]).to.equal(array2[i])
        }
    }
})
