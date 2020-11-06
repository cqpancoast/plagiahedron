import PHFile from "./PHFile"

/**
 * A program with files whose contents are to be compared for plagiarism with
 * the contents of files of other programs.
 */
export default class Program {
    
    constructor(private name: string, private files: PHFile[]) {}

    /**
     * Returns private field name, representing name of program
     */
    getName(): string {
        return this.name
    }
    /**
     * Returns specific file in the program 
     * @param fileName name to indicate desired file
     */
    getFile(fileName: string): PHFile {
        return this.files[fileName]
    }
    /**
     * returns all file names found in the program
     */
    getFileNames(): string[] {
        return null
    }
}
