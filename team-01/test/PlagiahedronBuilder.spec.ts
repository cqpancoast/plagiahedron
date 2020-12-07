import PHFile from "../src/model/PHFile"
import CodeSet from "../src/model/CodeSet"
import IParser from "../src/model/IParser"
import SpecialTokens from "../src/SpecialTokens"
import IPlagiahedronBuilder from "../src/model/IPlagiahedronBuilder"
import PlagiahedronBuilder from "../src/model/PlagiahedronBuilder"
import XParser from "../src/model/XParser"
import { expect } from "chai"
import "mocha"
import Plagiahedron from "../src/model/Plagiahedron"
import Program from "../src/model/Program"


describe("Plagiahedron builder tests", () => {

    let xParser: IParser<string> = new XParser(20, {
        "": SpecialTokens.emptyLang,
        "java": SpecialTokens.javaBasic, 
        "ts": SpecialTokens.typescriptBasic})
    let phBuilder: IPlagiahedronBuilder = new PlagiahedronBuilder(xParser, 5)

    it("No programs", () => {
        let codeSet: CodeSet = new CodeSet([])
        let ph: Plagiahedron = phBuilder.constructPlagiahedron(codeSet)
        expect(ph.getAllSimilarities().length).to.equal(0)
    })

    let file1: PHFile = new PHFile("cool", "ts", "keep going \n don't stop //never quit (please) \n")
    let file2: PHFile = new PHFile("bean", "ts", "keep going \n don't stop //never quit (please) \n")
    let program1: Program = new Program("1", [file1])
    let program2: Program = new Program("2", [file2])

    it("Two identical programs with one file", () => {
        let codeSet: CodeSet = new CodeSet([program1, program2])
        let ph: Plagiahedron = phBuilder.constructPlagiahedron(codeSet)
        expect(ph.getAllSimilarities().length).to.equal(1)
    })

})