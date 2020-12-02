import PHFile from "../src/model/PHFile"
import IdentityParser from "../src/model/IdentityParser"
import NumberParser from "./NumberParser"
import { expect } from "chai"
import "mocha"


describe("test non-parsed PHFile", () => {

    let file: PHFile = new PHFile("f", ".ts", "firstline\nsecondline\nthirdline")
    let err: PHFile = new PHFile("", "", "this should be an error")
    console.log("ph1")
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

    it("set program name error", () => {
        file.setProgramName("hi")
        expect(file.setProgramName("")).to.throw("This file has already been given to the program new.")
    })

    it("get program name error", () => {
        expect(err.getProgramName()).to.throw("This file has not yet been given to a Program.")
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

    it("parser error", () => {
        expect(file.acceptParser(idParser)).to.throw(new Error("Attempted to re-parse a file."))
    })

})

/**
 * @Sam: These are additional tests in addition to the ones you've already done, not replacements.
 */

describe("test errors on getting/setting program name", () => {

    let file: PHFile = new PHFile("f", "ts", "firstline\nsecondline\nthirdline")

    /** Make two programs, check that the getter works correctly
     * when you first add this to a program's constructor, 
     * check that it errors the second time.*/

    it("", () => {

    })
})

describe("test errors when accepting first and second parser", () => {

    let file: PHFile = new PHFile("f", "ts", "firstline\nsecondline\nthirdline")
    let idParser: IdentityParser = new IdentityParser(4)
    let numParser: NumberParser = new NumberParser()
    file.acceptParser(idParser)

    /** Make two parsers, check that the accepter works correctly
     * when the PHFile first accepts a parser, 
     * check that it errors the second time.
     * Also test that it errors for the SAME parser. */

    it("", () => {

    })

})