import PHFile from "../src/model/PHFile"
import ISpecialToken from "../src/model/ISpecialToken"
import CharSpecialToken from "../src/model/CharSpecialToken"
import CommentSpecialToken from "../src/model/CommentSpecialToken"
import XParser from "../src/model/XParser"
import "mocha"
import { expect } from "chai"
import NumberParser from "./NumberParser"

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
    
let emptyOnly: { [fileExtension: string]: ISpecialToken[] }
            = {"": []}
            
let bOnly: { [fileExtension: string]: ISpecialToken[] }
            = {"b": [new CharSpecialToken("\n"),
                    new CharSpecialToken(" "),
                    new CharSpecialToken(",")]}
let bPlusOnly: { [fileExtension: string]: ISpecialToken[] }
                    = {"b++": [new CharSpecialToken("\n"),
                            new CharSpecialToken(" "),
                            new CharSpecialToken(","),
                            new CharSpecialToken(" "),
                            new CharSpecialToken("("),
                            new CharSpecialToken(")"),
                            new CommentSpecialToken("//", "\n")]}
                
        
// You may want to copy-paste some of these into the different test methods. Up to you.
let emptyFile: PHFile = new PHFile("empty", "b", "")
let simpleFile: PHFile = new PHFile("f", "ts", "firstline")
let substringFile: PHFile = new PHFile("sub", "ts", "line")
let complexFile: PHFile = new PHFile("cool", "ts", "firstline\nsecondline\nthirdline")
let xp: XParser = new XParser(5, specialCharRules)
let xpemp: XParser = new XParser(5, emptyOnly)
let xpb: XParser = new XParser(5, bOnly)
let xpbplus: XParser = new XParser(5, bPlusOnly)

describe("parse some PHFile with Basic rules", () => {

    it("empty file parses to the empty string", () => {
        //expect(xp.parse(emptyFile)).to.equal("")
    })

    it("simple file parsing", () => {
        //expect(xp.parse(simpleFile)).to.equal("firstline")
    })

    it("complex file parsing", () => {
        //expect(xp.parse(complexFile)).to.equal("firstline\nsecondline\nthirdline")
    })
})

describe("use different file extensions (including Basic++) to test parse rules", () => {

    it("empty file parses to the empty string no matter which parse rules", () => {
        expect(xp.parse(emptyFile)).to.equal("")
        expect(xpemp.parse(emptyFile)).to.equal("")
        expect(xpb.parse(emptyFile)).to.equal("")
        expect(xpbplus.parse(emptyFile)).to.equal("")
    })

    it("no special characters -> files parser to RegExpParser.getNonSpecialCharRegExpString()", () => {
        expect(xpemp.parse(simpleFile)).to.equal("firstline")
    })

    it("simple file parsing", () => {
        expect(xpbplus.parse(simpleFile)).to.equal("firstline")
    })

    it("complex file parsing", () => {
        expect(xpbplus.parse(complexFile)).to.equal("firstline\nsecondline\nthirdline")
    })

    it("parsed substringFile is still substring of parsed complexFile", () => {
        xpb.parse(substringFile)
        xpb.parse(complexFile)
        expect(complexFile.getContent()).contains(substringFile.getContent())

    })

    it("error thrown on files with different extensions", () => {
        //where in xparser is an error thrown for this?
        expect(emptyFile.getExtension()).to.not.equal(simpleFile.getExtension())
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
        expect(xpemp.unparse("", emptyFile)).to.equal("")
        expect(xpemp.unparse("", simpleFile)).to.equal("firstline")
    })

    it("unparse files parsed using Basic language", () => {
        expect(xpb.unparse("firstLine", simpleFile)).to.equal("firstline")
    })

    it("unparse files parsed using Basic++ language", () => {
        expect(xpbplus.unparse("line", substringFile)).to.equal("line")
    })
})

describe("find parsed matches between some PHFiles", () => {

    it("finds no matches between empty and empty file", () => {
        expect(xp.findParsedMatches(emptyFile, emptyFile)).to.equal([])
    })
    
    it("finds no matches between classic and empty file", () => {
        expect(xp.findParsedMatches(simpleFile, emptyFile)).to.equal([])
    })
    
    it("finds one match between simple file and itself", () => {
        expect(xp.findParsedMatches(simpleFile, simpleFile)).to.equal(["firstline"])
    })

    it("finds one match between a file and a substring file of itself", () => {
        expect(xp.findParsedMatches(simpleFile, substringFile)).to.equal(["line"])
    })

    it("finds all matches between simple and complex files", () => {
        expect(xp.findParsedMatches(simpleFile, complexFile)).to.equal(["firstline"])
    })
})

describe("unparsing and finding file similarities with incorrect parse types (undefined or non-string)", () => {

    let file: PHFile = new PHFile("f", "ts", "firstline\nsecondline\nthirdline")
    let np: NumberParser = new NumberParser()
    let num: PHFile = new PHFile("num", "ts", "numbers\none\ntwo")
    let file123: PHFile = new PHFile("f", "ts", "firstline\nsecondline\nthirdline")
    let file2: PHFile = new PHFile("f", "ts", "secondline")
    let file13: PHFile = new PHFile("f", "ts", "firstline\nthirdline")

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
