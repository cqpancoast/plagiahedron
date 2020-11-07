import FilterUtils from "../../src/model/FilterUtils"
import PHSimilarity from "../../src/model/PHSimilarity"
import PHFileSubstring from "../../src/model/PHFileSubstring"
import PHFile from "../../src/model/PHFile"

describe("test filter", () => {

    let file = new PHFile("name", "extension", "content")
    let fileSubString1 = new PHFileSubstring("programName1", "filename", 3, "string content")
    let fileSubString2 = new PHFileSubstring("programName2", "filename2", 9, "the code")
    let fileSubString3 = new PHFileSubstring("programName3", "filename3", 18, "random function")
    let fileSubString4 = new PHFileSubstring("programName4", "filename4", 130, "more code")
    let fileSubString5 = new PHFileSubstring("programName5", "filename5", 1, "even more code")
    let fileSubString6 = new PHFileSubstring("programName6", "filename6", 90, "wow so much code")

    fileSubString1

    let substringArrayAll = [fileSubString1, fileSubString2, fileSubString3, fileSubString4,
        fileSubString5, fileSubString6]
    let substringArray1 = [fileSubString1]
    let substringArray2 = [fileSubString1, fileSubString2, fileSubString3]
    let substringArray3 = [fileSubString1, fileSubString3, fileSubString5]
    let substringArray4 = [fileSubString1, fileSubString3, fileSubString4, fileSubString5, fileSubString6]
    let substringArray5 = [fileSubString1, fileSubString2, fileSubString3]

    let simAll = new PHSimilarity("Similar String All", substringArrayAll)
    let sim1 = new PHSimilarity("Similar String 1", substringArray1)
    let sim2 = new PHSimilarity("Similar String 2", substringArray2)
    let sim3 = new PHSimilarity("Similar String 3", substringArray3)
    let sim4 = new PHSimilarity("Similar String 4", substringArray4)
    let sim5 = new PHSimilarity("Similar String 4", substringArray5)

    let simArrayAll = [simAll, sim1, sim2, sim3, sim4, sim5]

    // array of names for programs 1, 3, 5
    let nameArray135 = ["programName1", "programName3", "programName5"]
    // array of similarities which *include* programNames 1, 3, 5
    let simArrayInc135 = [simAll, sim3, sim4]

    // array of names for programs 1, 2, 3
    let nameArray123 = ["programName1", "programName2", "programName3"]
    // array of similarities which *have only* programNames 1, 2, 3
    let simArrayOnly123 = [sim2, sim5]

    let testSimArrayInc135 = FilterUtils.showIncluding(simArrayAll, nameArray135)
    let testSimArrayOnly123 = FilterUtils.showIncluding(simArrayAll, nameArray123)

    expect(simArrayInc135 === testSimArrayInc135)
    expect(simArrayOnly123 === testSimArrayOnly123)
})
