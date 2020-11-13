import PHFile from "../../src/model/PHFile"

/**
 * @Sam: These are additional tests in addition to the ones you've already done, not replacements.
 * Please also add an additional test to your suite that errors if the files being compared in
 * IDParser.findParsedMatches have different extensions.
 */

 describe("unparsing and finding file similarities with incorrect parse types (undefined or non-string)", () => {

    let file: PHFile = new PHFile("f", "ts", "firstline\nsecondline\nthirdline")

    it("errors when attemtping to unparse numeric parse type", () => {

    })

    it("errors when attemtping to unparse unset parse type", () => {

    })

    it("errors on find similarities between files of numeric parse type", () => {

    })

    it("errors on find similarities between files of unset parse type", () => {

    })
})
