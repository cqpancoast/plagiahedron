import PHFile from "../src/model/PHFile"
import ISpecialToken from "../src/model/ISpecialToken"
import CharSpecialToken from "../src/model/CharSpecialToken"
import CommentSpecialToken from "../src/model/CommentSpecialToken"
import XParser from "../src/model/XParser"
import "mocha"
import { expect } from "chai"
import NumberParser from "./NumberParser"
import PHFileSubstring from "../src/model/PHFileSubstring"

/**
 * This one's a doozy. Your instructions:
 * - Read the documentation and code for RegExpParser and "get it",
 *   particularly the way that the special character stuff works
 *   for RegExps. (Check out REParser.getNonSpecialCharRegExpString(),
 *   look at how it's used, review regexps if necessary.)
 * - Define three files (the empty one I had time for) such that you can make either of them
 *   "b" language or "b++" when necessary (defined below).
 *   - A simple file with some tokens and AT LEAST two types of special characters.
 *     (Newlines ("\n") and spaces are a must, commas, parens, and brackets also cool.)
 *   - A complex file with more tokens and at least three types of special characters,
 *     including the ones from before
 *   - A "substring file" that's a substring of the complex file
 * - Fill in the tests, adding more or letting me know if you run into anything weird.
 * 
 * Don't hesitate to ask if you need any help or clarification,
 *  Casey
 */

// ""    is called the "empty language", where no characters are special. (Quiz: what happens in parsing?)
// "b"   is a language called "basic" whose only special characters are newlines, spaces, and commas.
// "b++" is an upgrade to basic that decided to include parentheses and comments of the form // --> \n (like this one).
let specialCharRules: { [fileExtension: string]: ISpecialToken[] }
    = {"": [],
       "b": [new CharSpecialToken("\n"),
            new CharSpecialToken(" "),
            new CharSpecialToken(",")],
       "b++": [new CharSpecialToken("\n"),
            new CharSpecialToken(" "),
            new CharSpecialToken(","),
            new CharSpecialToken(" "),
            new CharSpecialToken("("),
            new CharSpecialToken(")"),
            new CommentSpecialToken("//", "\n")]}

// You may want to copy-paste some of these into the different test methods. Up to you.
let emptyFile: PHFile = new PHFile("empty", "b", "")
let simpleFileEmp: PHFile = new PHFile("simp", "", "This is simple \n yay!")
let simpleFileB: PHFile = new PHFile("f", "b", "My name is \n (insert), nice to meet you!")
let simpleFileBPlus: PHFile = new PHFile("f", "b", "My name is \n (insert), nice to meet you!")
let substringFileSimple: PHFile = new PHFile("sub", "b", "(insert), nice to meet")
let complexFileB: PHFile = new PHFile("cool", "b", "keep going \n don't stop //never quit (please)")
let complexFileBPlus: PHFile = new PHFile("cool", "b++", "keep going \n don't stop //never quit (please)")
let substringFileComplex: PHFile = new PHFile("sub", "b++", "keep going \n don't stop")

let xp: XParser = new XParser(5, specialCharRules)


describe("parse some PHFile with Basic rules", () => {

    it("empty file parses to the empty string", () => {
        expect(xp.parse(emptyFile)).to.equal("")
    })

    it("simple file parsing", () => {
        expect(xp.parse(simpleFileB)).to.equal(xp.getFillerChar() + " " + xp.getFillerChar() + " " + xp.getFillerChar() + " \n " + xp.getFillerChar() + ", " + xp.getFillerChar() + " " + xp.getFillerChar() + " " + xp.getFillerChar() + " " )
    })

    it("complex file parsing", () => {
        expect(xp.parse(complexFileB)).to.equal(xp.getFillerChar() + " " + xp.getFillerChar() +  " \n " + xp.getFillerChar() + " " + xp.getFillerChar() + " " + xp.getFillerChar()  + " " + xp.getFillerChar() + " ")
    })
})

describe("use different file extensions (including Basic++) to test parse rules", () => {

    it("empty file parses to the empty string no matter which parse rules", () => {
        expect(xp.parse(emptyFile)).to.equal("")
    })

    it("simple file parsing", () => {
        expect(xp.parse(simpleFileBPlus)).to.equal((xp.getFillerChar() + " " + xp.getFillerChar() + " " + xp.getFillerChar() + " \n " + xp.getFillerChar() + ", " + xp.getFillerChar() + " " + xp.getFillerChar() + " " + xp.getFillerChar() + " " ))
    })

    it("complex file parsing", () => {
        expect(xp.parse(complexFileBPlus)).to.equal(xp.getFillerChar() + " " + xp.getFillerChar() + " \n " + xp.getFillerChar() + " " + xp.getFillerChar() + " " + xp.getFillerChar() + "//never quit (please)")
    })

    it("parsed substringFile is still substring of parsed complexFile", () => {
        xp.parse(substringFileComplex)
        xp.parse(complexFileBPlus)
        expect(complexFileBPlus.getContent()).contains(substringFileComplex.getContent())

    })

})

describe("unparse (find parsed strings in) our PHFiles", () => {

    /**
     * I'm kind of loose on the "it" functions here, so here are some
     * additional directions for what you might include. (I don't think
     * they're checking TOO closely, so use your discretion on how you
     * can best spend your time.)
     * - Totally bogus parse strings should find no matches in ANY file.
     * - Super simple parse strings should find a shit ton of matches.
     *   If you're looking to get creative with generating test oracles,
     *   here's your chance.
     * - Nothing is ever found in empty files.
     * - The same shit that's found in the substring file is also found
     *   in the complex file (if you make it right, and the thing to be
     *   found isn't on the overlap region.)
     */

    it("unparse files parsed using the empty language", () => {
        expect(xp.unparse("", emptyFile)).to.equal("")
        expect(xp.unparse("", simpleFileEmp)).to.equal("This is simple \n yay!")
    })

    it("unparse files parsed using Basic language", () => {
        expect(xp.unparse("My name is \n (insert), nice to meet you!", simpleFileB)).to.equal([])
    })

    it("unparse files parsed using Basic++ language", () => {
        expect(xp.unparse("", simpleFileBPlus)).to.equal("nice")
    })
})

describe("find parsed matches between some PHFiles", () => {

    it("finds no matches between empty and empty file", () => {
        expect(xp.findParsedMatches(emptyFile, emptyFile)).to.equal([])
    })
    
    it("finds no matches between classic and empty file", () => {
        expect(xp.findParsedMatches(simpleFileB, emptyFile)).to.equal([])
    })
    
    it("finds one match between simple file and itself", () => {
        expect(xp.findParsedMatches(simpleFileB, simpleFileB)).to.equal([])
    })

    it("finds one match between a file and a substring file of itself", () => {
        expect(xp.findParsedMatches(simpleFileB, substringFileSimple)).to.equal([])
    })

    it("finds all matches between simple and complex files", () => {
        expect(xp.findParsedMatches(simpleFileBPlus, complexFileBPlus)).to.deep.equal([])
    })
})

describe("unparsing and finding file similarities with incorrect parse types (undefined or non-string)", () => {

    let file: PHFile = new PHFile("f", "ts", "firstline\nsecondline\nthirdline")
    let np: NumberParser = new NumberParser()
    let num: PHFile = new PHFile("num", "ts", "numbers\none\ntwo")
    let file123: PHFile = new PHFile("f", "ts", "firstline\nsecondline\nthirdline")
    let file2: PHFile = new PHFile("f", "ts", "secondline")
    let file13: PHFile = new PHFile("f", "ts", "firstline\nthirdline")

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
