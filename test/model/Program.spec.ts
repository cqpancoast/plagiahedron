import PHFile from "../../src/model/PHFile"
import Program from "../../src/model/Program"

describe("test basic program", () => {

    let file1: PHFile = new PHFile("f1", "ts", "firstline\nsecondline\nthirdline")
    let file2: PHFile = new PHFile("f2", "ts", "firstline\nsecondline\nthirdline")
    let program: Program = new Program("program", [/* Files go here */])

    /** Boring stuff. Test getters. */

    it("", () => {

    })
})