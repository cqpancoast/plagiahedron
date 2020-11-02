import PHFile from "../../src/model/PHFile"

describe("test non-parsed PHFile", () => {

    let file: PHFile = new PHFile("f", "ts", "firstline\nsecondline\nthirdline")

    /** Test getters, error when parsed content accessed (implementation TODO) */

    it("", () => {

    })
})

describe("test parsed PHFile", () => {

    let file: PHFile = new PHFile("f", "ts", "firstline\nsecondline\nthirdline")
    

})