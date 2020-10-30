import PHFile from "./PHFile"
import Program from "./Program"

/**
 * Represents a set of programs that contain files, the contents of which
 * will be cross-checked for similarities.
 */
export default class CodeSet {
   
    constructor(private programs: Program[]) {}

    getProgram(programName: string): Program {
        return null
    }
    getFile(programName: string, fileName: string): PHFile {
        return null
    }
    removeProgram(programName: string) {
        /* implement this! */
    }
    addProgram(program: Program) {
        this.programs.push(program)
    }
    getProgramNames(): string[] {
        return null
    }
}
