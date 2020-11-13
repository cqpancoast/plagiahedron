import PHFile from "../../src/model/PHFile"
import IdentityParser from "../../src/model/IdentityParser"
import NumberParser from "./NumberParser"

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