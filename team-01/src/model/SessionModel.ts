import CodeSet from "./CodeSet"
import IPlagiahedronBuilder from "./IPlagiahedronBuilder"
import Plagiahedron from "./Plagiahedron"

export default class SessionModel {

    private report?: Plagiahedron

    constructor(
        private codeSet: CodeSet,
        private phbuild: IPlagiahedronBuilder) {}

    /**
     * Gets the code set this session is using.
     */
    getCodeSet(): CodeSet {
        return this.codeSet
    }

    /**
     * Gets the report, if it exists. Otherwise throws an error.
     * @throws Error if the report has not yet been generated in this session.
     */
    getReport(): Plagiahedron {
        if (this.report !== undefined) {
            return this.report
        } else {
            throw new Error("Plagiahedron not yet generated in this session.")
        }
    }

    /**
     * Let the games begin! Generates the plagiahedron.
     */
    generateReport() {
        this.report = this.phbuild.constructPlagiahedron(this.codeSet)
    }
}