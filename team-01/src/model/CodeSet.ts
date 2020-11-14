import PHFile from "./PHFile"
import Program from "./Program"

/**
 * Represents a set of programs that contain files, the contents of which
 * will be cross-checked for similarities.
 */
export default class CodeSet {
   
    constructor(private programs: Program[]) {}

    /**
     * Returns program found in set of programs.
     * @param programName name of program to be found.
     * @throws Error if the given program name is not associated with this code set.
     */
    getProgram(programName: string): Program {
        try {
            return this.programs[this.programs.map(program => program.getName()).indexOf(programName)]
        } catch (error) {
            throw new Error(`Error accessing program with alleged name ${programName} from this CodeSet.`)
        }
    }
    /**
     * Returns a file based on program to be found and subsequent file within program
     * Check for bad match?
     * @param programName Program to find file in.
     * @param fileName File to be found.
     */
    getFile(programName: string, fileName: string): PHFile {
        return this.getProgram(programName).getFile(fileName)
    }

    /**
     * Removes a program from the currently stored list of Programs associated with this CodeSet.
     * @param programName the name of a Program.
     * @throws Error if the given program name is not associated with this code set.
     */
    removeProgram(programName: string) {
        this.programs.splice(this.programs.map(program => program.getName()).indexOf(programName))
    }
    /**
     * Adds a program to the codeset
     * @param program program to be added
     */
    addProgram(program: Program) {
        this.programs.push(program)
    }
    /**
     * Returns list of all names of programs associated with this CodeSet.
     */
    getProgramNames(): string[] {
        return this.programs.map(program => program.getName())
    }
}
