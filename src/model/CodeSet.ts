import PHFile from "./PHFile"
import Program from "./Program"

/**
 * Represents a set of programs that contain files, the contents of which
 * will be cross-checked for similarities.
 */
export default class CodeSet {
   
    constructor(private programs: Program[]) {}

    /**
     * Returns program found in set of programs
     * @param programName name of program to be found
     */
    getProgram(programName: string): Program {
        return this.programs[programName]
    }
    /**
     * Returns a file based on program to be found and subsequent file within program
     * Check for bad match?
     * @param programName Program to find file in
     * @param fileName File to be found
     */
    getFile(programName: string, fileName: string): PHFile {
        return this.programs[programName].getFile(fileName)
    }
    removeProgram(programName: string) {
        /* implement this! */
    }
    /**
     * Adds a program to the codeset
     * @param program program to be added
     */
    addProgram(program: Program) {
        this.programs.push(program)
    }
    /**
     * Returns list of all names of programs
     */
    getProgramNames(): string[] {
        return null
    }
}
