import PHFile from "../../src/model/PHFile"
import IdentityParser from "../../src/model/IdentityParser"

describe("test non-parsed PHFile", () => {

    let file: PHFile = new PHFile("f", "ts", "firstline\nsecondline\nthirdline")

    /** Test getters, program name set/get rules, error when parsed content accessed (implementation TODO) */

    it("", () => {

    })
})

describe("test parsed PHFile", () => {

    let file: PHFile = new PHFile("f", "ts", "firstline\nsecondline\nthirdline")
    let idParser: IdentityParser = new IdentityParser(4)
    file.acceptParser(idParser)

    /** Test getters, parsed content (identical to file contents in this case) */

    it("", () => {

    })

})