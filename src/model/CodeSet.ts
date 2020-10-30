import PHFile from "./PHFile"
import Program from "./Program"

/**
 * Represents a set of programs that contain files, the contents of which
 * will be cross-checked for similarities.
 */
export default class CodeSet {
    private programdict: { [programName: string] : Program; }

    getProgram(programName: string): Program {
        return this.programdict[programName]
    }
    getFile(programName: string, fileName: string): PHFile {
        return this.programdict[programName].getFile(fileName)
    }
    removeProgram(programName: string) {
        delete this.programdict[programName]
    }
    removeFile(programName: string, fileName: string) {
        this.programdict[programName].removeFile(fileName)
    }
    addProgram(programName: string, program: Program) {
        this.programdict[programName] = program
    }
    addFile(programName: string, fileName: string, file: PHFile) {
        this.programdict[programName].addFile(fileName, file)
    }
    getProgramNames(): string[] {
        return Object.keys(this.programdict)
    }
}
