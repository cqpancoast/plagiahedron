import { expect } from "chai"
import "mocha"
import IdentityParser from "../src/model/IdentityParser"
import IParser from "../src/model/IParser"
import PHFile from "../src/model/PHFile"
import NumberParser from "./NumberParser"

describe("parse a basic PHFile", () => {
    console.log("parsing1")
    let ip1: IParser<string> = new IdentityParser(20);
    let ip2: IdentityParser = new IdentityParser(30);
    let file: PHFile = new PHFile("f", "ts", "firstline\nsecondline\nthirdline")

    it("get parsed content from IParser", () => {
        expect(ip1.parse(file)).to.equal("firstline\nsecondline\nthirdline")
    })

    it("get parsed content from IdentityParser", () => {
        expect(ip2.parse(file)).to.equal("firstline\nsecondline\nthirdline") 
    })
})

describe("unparse a basic PHFile", () => {
    let ip1: IParser<string> = new IdentityParser(20);
    

    let stringFirst: string = "firstline"
    let stringLine: string = "line"
    let stringDline: string = "dline"
    let file: PHFile = new PHFile("f", "ts", "firstline\nsecondline\nthirdline")

    it("finds one instance of firstline", () => {
        let unparsed = ip1.unparse(stringFirst, file)
        expect(unparsed).to.equal([])
    })

    it("finds three instances of line", () => {
        let unparsed = ip1.unparse(stringLine, file)
        expect(unparsed).to.equal([])
    })

    it("finds two instances of dline", () => {
        let unparsed = ip1.unparse(stringDline, file)
        expect(unparsed).to.equal([])
    })
})

describe("find parsed matches between a basic PHFile", () => {

    console.log("parsing3")
    let ip: IdentityParser = new IdentityParser(30);

    let file123: PHFile = new PHFile("f", "ts", "firstline\nsecondline\nthirdline")
    let file2: PHFile = new PHFile("f", "ts", "secondline")
    let file13: PHFile = new PHFile("f", "ts", "firstline\nthirdline")
    
    it("finds one match between a file and itself", () => {
        expect(ip.findParsedMatches(file123, file123)).to.equal(["firstline", "secondline", "thirdline"])
    })

    it("finds one match between a file and a substring file of itself", () => {
        expect(ip.findParsedMatches(file123, file2)).to.equal(["secondline"])
    })

    it("finds two matches between a file and a file made of two substrings of itself", () => {
        expect(ip.findParsedMatches(file123, file13)).to.equal(["firstline", "thirdline"])
    })
})
/**
 * @Sam: These are additional tests in addition to the ones you've already done, not replacements.
 * Please also add an additional test to your suite that errors if the files being compared in
 * IDParser.findParsedMatches have different extensions.
 */

 describe("unparsing and finding file similarities with incorrect parse types (undefined or non-string)", () => {

    let file: PHFile = new PHFile("f", "ts", "firstline\nsecondline\nthirdline")
    let num: PHFile = new PHFile("num", "ts", "numbers\none\ntwo")
    let file123: PHFile = new PHFile("f", "ts", "firstline\nsecondline\nthirdline")
    let file2: PHFile = new PHFile("f", "ts", "secondline")
    let file13: PHFile = new PHFile("f", "ts", "firstline\nthirdline")
    let np: NumberParser = new NumberParser()
    let ip: IdentityParser = new IdentityParser(4)

    console.log("parsing4")

    it("errors when attemtping to unparse numeric parse type", () => {
        expect(np.unparse(4, num)).to.deep.equal([])
    })

    it("errors when attemtping to unparse unset parse type", () => {
        expect(np.unparse(3, file)).to.deep.equal([])
    })

    it("errors on find similarities between files of numeric parse type", () => {
        expect(np.findParsedMatches(file123, file2)).to.deep.equal([])
    })

    it("errors on find similarities between files of unset parse type", () => {
        expect(np.findParsedMatches(num, file13)).to.deep.equal([])
    })
})

describe("getsubstringindex tests",() => {

    //why is this a protected method??

    let file: PHFile = new PHFile("f", "ts", "firstline\nsecondline\nthirdline")
    let num: PHFile = new PHFile("num", "ts", "numbers\none\ntwo")
    let file123: PHFile = new PHFile("f", "ts", "firstline\nsecondline\nthirdline")
    let file2: PHFile = new PHFile("f", "ts", "secondline")
    let file13: PHFile = new PHFile("f", "ts", "firstline\nthirdline")
    let np: NumberParser = new NumberParser()
    let ip: IdentityParser = new IdentityParser(4)

})
