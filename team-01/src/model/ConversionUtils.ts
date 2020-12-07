
import CodeSet from './CodeSet'
import Program from './Program'
import PHFile from './PHFile'

export default class ConversionUtils {

    /**
     * Creates a new Program
     * @param programName name of the Program
     * @param files list of PHFiles to be held by program
     */
    static makeProgramFromFiles(programName: string, files: PHFile[]): Program | undefined {
        return new Program(programName, files)
    }

    // Adds Program to CodeSet
    static uploadProgramToCodeSet(program: Program): void {

    }

}