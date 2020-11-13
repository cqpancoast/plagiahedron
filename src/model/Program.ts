import PHFile from "./PHFile"

/**
 * A program with files whose contents are to be compared for plagiarism with
 * the contents of files of other programs.
 */
export default class Program {
    
    constructor(private name: string, private files: PHFile[]) {
        files.forEach(file => file.setProgramName(name))
    }

    /**
     * Returns private field name, representing name of program.
     */
    getName(): string {
        return this.name
    }
    
    /**
     * Returns all files in this program.
     */
    getFiles(): PHFile[] {
        return this.files
    }
    /**
     * Returns a file in the Program.
     * @param fileNameAndExtension name and extension of the file to be accessed.
     * @throw Error if the indicated file isn't contained within this program.
     */
    getFile(fileNameAndExtension: string): PHFile {
        try {
            return this.files[this.files.map(file => file.getNameAndExtension()).indexOf(fileNameAndExtension)]
        } catch (error) {
            throw new Error(`Error accessing file name and extension ${fileNameAndExtension} from this program.`)
        }
    }
}
