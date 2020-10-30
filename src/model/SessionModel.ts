import CodeSet from "./CodeSet"
import IPlagiahedronBuilder from "./IPlagiahedronBuilder"
import Plagiahedron from "./Plagiahedron"

export default class SessionModel {
    private codeSet: CodeSet
    private report: Plagiahedron
    private phbuild: IPlagiahedronBuilder

    getCodeSet(): CodeSet {
        return this.codeSet
    }
    getReport(): Plagiahedron {
        return this.report
    }
    generateReport() {
        this.report = this.phbuild.constructPlagiahedron(this.codeSet)
    }
}
