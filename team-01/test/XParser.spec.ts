import PHFile from "../src/model/PHFile"
import ISpecialToken from "../src/model/ISpecialToken"
import CharSpecialToken from "../src/model/CharSpecialToken"
import CommentSpecialToken from "../src/model/CommentSpecialToken"
import XParser from "../src/model/XParser"
import "mocha"
import { expect } from "chai"
import PHFileSubstring from "../src/model/PHFileSubstring"
import Program from "../src/model/Program"


// ""    is called the "empty language", where no tokens are special.
// "b"   is a language called "basic" whose only special tokens are newlines, spaces, commas, and the word "nice".
// "b++" is an upgrade to basic that decided to include parentheses and comments of the form // ... \n (like this one).
let specialCharRules: { [fileExtension: string]: ISpecialToken[] }
    = {"": [],
       "b": [new CharSpecialToken("\n"),
            new CharSpecialToken(" "),
            new CharSpecialToken(","),
            new CharSpecialToken("nice")],
       "b++": [new CharSpecialToken("\n"),
            new CharSpecialToken(" "),
            new CharSpecialToken(","),
            new CharSpecialToken(" "),
            new CharSpecialToken("("),
            new CharSpecialToken(")"),
            new CommentSpecialToken("//", "\n")]}

let emptyFile: PHFile = new PHFile("empty", "b", "")
let simpleFileEmp: PHFile = new PHFile("simp", "", "This is simple \n yay!")
let simpleFileB: PHFile = new PHFile("f", "b", "My name is \n (insert), nice to meet you!")
let simpleFileBPlus: PHFile = new PHFile("f", "b++", "My name is \n (insert), nice to meet you!")
let substringFileSimple: PHFile = new PHFile("sub", "b", "(insert), nice to meet")
let complexFileB: PHFile = new PHFile("cool", "b", "keep going \n don't stop //never quit (please) \n")
let complexFileBPlus: PHFile = new PHFile("cool", "b++", "keep going \n don't stop //never quit (please) \n")
let substringFileComplex: PHFile = new PHFile("sub", "b++", "keep going \n don't stop")
let complexComments: PHFile = new PHFile("comm", "b++", "work //for \nme")

// When PHFiles are used in a Program constructor, their programName property is automatically assigned.
// This call is made to prevent errors being thrown due to PHFiles not having a programName property.
let dummy: Program = new Program("dummy",
    [emptyFile, simpleFileB, simpleFileEmp, simpleFileBPlus,
        substringFileSimple, substringFileComplex,
        complexComments, complexFileB, complexFileBPlus])

let xp: XParser = new XParser(5, specialCharRules)
let f: string = xp.getFillerChar()


describe("parse some PHFile with Basic rules", () => {

    it("empty file parses to the empty string", () => {
        expect(xp.parse(emptyFile)).to.equal("")
    })

    it("simple file parsing", () => {
        expect(xp.parse(simpleFileB)).to.equal(`${f} ${f} ${f} \n ${f}, nice ${f} ${f} ${f}`)
    })

    it("complex file parsing", () => {
        expect(xp.parse(complexFileB)).to.equal(`${f} ${f} \n ${f} ${f} ${f} ${f} ${f} \n`)
    })
})

describe("use different file extensions (including Basic++) to test parse rules", () => {

    it("empty file parses to the empty string no matter which parse rules", () => {
        expect(xp.parse(emptyFile)).to.equal("")
    })

    it("simple file parsing", () => {
        expect(xp.parse(simpleFileBPlus)).to.equal((`${f} ${f} ${f} \n (${f}), ${f} ${f} ${f} ${f}`))
    })

    it("complex file parsing", () => {
        expect(xp.parse(complexFileBPlus)).to.equal(`${f} ${f} \n ${f} ${f} //never quit (please) \n`)
    })

    it("parsed substringFile is still substring of parsed complexFile", () => {
        xp.parse(substringFileComplex)
        xp.parse(complexFileBPlus)
        expect(complexFileBPlus.getContent()).contains(substringFileComplex.getContent())
    })

    it("comment parsing", () => {
        expect(xp.parse(complexComments)).to.equal(f + " //for \n" + f)
    })

})

describe("unparse (find parsed strings in) our PHFiles", () => {

    it("unparse files parsed using the empty language", () => {
        expect(xp.unparse("", emptyFile)).to.deep.equal([])
        expect(xp.unparse("", simpleFileEmp)).to.deep.equal([])
    })

    it("one-match parse/unparse using Basic language", () => {
        expect(xp.unparse(xp.parse(simpleFileB), simpleFileB)).to.deep.equal(
            [new PHFileSubstring(simpleFileB.getProgramName(),  simpleFileB.getNameAndExtension(), 0, simpleFileB.getContent())])
    })

    it("one-match parse/unparse using Basic++ language", () => {
        expect(xp.unparse(xp.parse(complexFileBPlus), complexFileBPlus)).to.deep.equal(
            [new PHFileSubstring(complexFileBPlus.getProgramName(), complexFileBPlus.getNameAndExtension(), 0, complexFileBPlus.getContent())])
    })

    it("two-match parse/unparse using Basic language", () => {
        expect(xp.unparse(`${f} ${f} \n`, complexFileB)).to.deep.equal(
            [new PHFileSubstring(complexFileB.getProgramName(), complexFileB.getNameAndExtension(), 0, "keep going \n"),
             new PHFileSubstring(complexFileB.getProgramName(), complexFileB.getNameAndExtension(), 32, "quit (please) \n")])
    })
})

describe("find parsed matches between some PHFiles", () => {

    it("finds no matches between empty and empty file", () => {
        expect(xp.findParsedMatches(emptyFile, emptyFile)).to.deep.equal([])
    })
    
    it("finds no matches between classic and empty file", () => {
        expect(xp.findParsedMatches(simpleFileB, emptyFile)).to.deep.equal([])
    })
    
    it("finds one match between simple file and itself", () => {
        expect(xp.findParsedMatches(simpleFileB, simpleFileB)).to.deep.equal([xp.parse(simpleFileB)])
    })

    it("finds one match between a file and a substring file of itself", () => {
        expect(xp.findParsedMatches(simpleFileB, substringFileSimple)).to.deep.equal([xp.parse(substringFileSimple)])
    })

    it("finds all matches between simple and complex files", () => {
        expect(xp.findParsedMatches(simpleFileBPlus, complexFileBPlus)).to.deep.equal(
            [` ${f} ${f} `, `${f} ${f} \n `])
    })
})
