import PHFile from "../src/model/PHFile"
import IdentityParser from "../src/model/IdentityParser"
import NumberParser from "./NumberParser"
import { expect } from "chai"
import "mocha"


describe("test non-parsed PHFile", () => {

    let file: PHFile = new PHFile("f", ".ts", "firstline\nsecondline\nthirdline")
    let err: PHFile = new PHFile("", "", "this should be an error")

    /** Test getters, program name set/get rules, error when parsed content accessed (implementation TODO) */

    it("get file name", () => {
        expect(file.getName()).to.equal("f")
    })

    it("get extension", () => {
        expect(file.getExtension()).to.equal(".ts")
    })

    it("get name and extension", () => {
        expect(file.getNameAndExtension()).to.equal("f.ts")
    })

    it("set and get program name", () => {
        file.setProgramName("new")
        expect(file.getProgramName()).to.equal("new")
    })

    it("get content", () => {
        file.getContent()
        expect(file.getContent()).to.equal("firstline\nsecondline\nthirdline")
    })

})

describe("test parsed PHFile", () => {

    let file: PHFile = new PHFile("f", "ts", "firstline\nsecondline\nthirdline")
    let idParser: IdentityParser = new IdentityParser(4)
    file.acceptParser(idParser)

    /** Test getters, parsed content (identical to file contents in this case) */

    it("accept parser", () => {
        expect(file.getParsedContent()).to.equal(idParser.parse(file))
    })
    
})
