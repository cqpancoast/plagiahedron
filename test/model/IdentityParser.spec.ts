import PHFile from "../../src/model/PHFile"

/**
 * Hello, and welcome to the ONLY complicated test file so far.
 * We'll decide tomorrow on the form of the parser we'll actually use, and I'll make that then.
 * For now, we should test this because we may use this in other tests.
 * Also, making this helped me conceptually in making a more general parser,
 * so maybe it's the same thing for you testing it!
 */

describe("parse a basic PHFile", () => {

    let file: PHFile = new PHFile("f", "ts", "firstline\nsecondline\nthirdline")

    it("identity parser simply returns the file contents", () => {

    })
})

describe("unparse a basic PHFile", () => {

    let stringFirst: string = "firstline"
    let stringLine: string = "line"
    let stringDline: string = "dline"
    let file: PHFile = new PHFile("f", "ts", "firstline\nsecondline\nthirdline")

    it("finds one instance of firstline", () => {

    })

    it("finds three instances of line", () => {

    })

    it("finds two instances of dline", () => {

    })
})

describe("find parsed matches between a basic PHFile", () => {

    let file123: PHFile = new PHFile("f", "ts", "firstline\nsecondline\nthirdline")
    let file2: PHFile = new PHFile("f", "ts", "secondline")
    let file13: PHFile = new PHFile("f", "ts", "firstline\nthirdline")
    
    it("finds one match between a file and itself", () => {

    })

    it("finds one match between a file and a substring file of itself", () => {

    })

    it("finds two matches between a file and a file made of two substrings of itself", () => {

    })
})
