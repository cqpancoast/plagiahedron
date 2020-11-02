import PHFile from "./PHFile"

/**
 * A program with files whose contents are to be compared for plagiarism with
 * the contents of files of other programs.
 */
export default class Program {
    
    constructor(private name: string, private files: PHFile[]) {
        files.forEach(file => file.setProgramName(name))
    }

    getName(): string {
        return this.name
    }
    getFiles(): PHFile[] {
        return this.files
    }
    getFile(fileNameAndExtension: string): PHFile {
        return this.files[this.files.map(file => file.getNameAndExtension()).indexOf(fileNameAndExtension)]
    }
}
