import PHFile from "../../src/model/PHFile"

/**
 * This one's a doozy. Your instructions:
 * - Read the documentation and code for XParser and "get it",
 *   particularly the way that the special character stuff works
 *   with all the file extension stuff and whatnot.
 *   (Check out method "XParser.isSpecialChar".)
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

// ""    is called the "empty language", where no characters are special. Quiz: what happens in parsing?
// "b"   is a language called "basic" whose only special characters are newlines, spaces, and commas.
// "b++" is an upgrade to basic that decided to include parentheses.
let specialCharRules: { [fileExtension: string]: string[] }
    = {"": [],
       "b":   ["\n", " ", ","],
       "b++": ["\n", " ", ",", "(", ")"]}

// You may want to copy-paste some of these into the different test methods. Up to you.
let emptyFile: PHFile = new PHFile("empty", "b", "")
let simpleFile: PHFile
let substringFile: PHFile
let complexFile: PHFile

describe("parse some PHFile with Basic rules", () => {

    it("empty file parses to the empty string", () => {

    })

    it("simple file parsing", () => {

    })

    it("complex file parsing", () => {

    })

    it("parsed substringFile is substring of parsed complexFile", () => {

    })
})

describe("use different file extensions (including Basic++) to test parse rules", () => {

    it("empty file parses to the empty string no matter which parse rules", () => {

    })

    it("files always parse down to just 'x' when there are no special characters", () => {

    })

    it("simple file parsing", () => {

    })
    
    it("complex file parsing", () => {

    })

    it("parsed substringFile is still substring of parsed complexFile", () => {

    })

    it("error thrown on files with different extensions", () => {

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

    })

    it("unparse files parsed using Basic language", () => {

    })

    it("unparse files parsed using Basic++ language", () => {

    })
})

describe("find parsed matches between some PHFiles", () => {

    it("finds no matches between empty and empty file", () => {

    })
    
    it("finds no matches between classic and empty file", () => {

    })
    
    it("finds one match between simple file and itself", () => {

    })

    it("finds one match between a file and a substring file of itself", () => {

    })

    it("finds all matches between simple and complex files", () => {

    })
})

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
