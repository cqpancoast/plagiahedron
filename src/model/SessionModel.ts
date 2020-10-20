import CodeSet from "./CodeSet"
import IPlagiahedronGenerator from "./IPlagiahedronGenerator"
import Plagiahedron from "./Plagiahedron"

export default class SessionModel {
    private codeSet: CodeSet
    private report: Plagiahedron
    private phgen: IPlagiahedronGenerator

    getCodeSet(): CodeSet {
        return this.codeSet
    }
    getReport(): Plagiahedron {
        return this.report
    }
    generateReport() {
        this.report = this.phgen.constructPlagiahedron(this.codeSet)
    }
}
