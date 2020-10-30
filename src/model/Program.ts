import PHFile from "./PHFile"

/**
 * A program with files whose contents are to be compared for plagiarism with
 * the contents of files of other programs.
 */
export default class Program {
    
    constructor(private name: string, private files: PHFile[]) {}

    getName(): string {
        return this.name
    }
    getFile(fileName: string): PHFile {
        return null
    }
    getFileNames(): string[] {
        return null
    }
}
