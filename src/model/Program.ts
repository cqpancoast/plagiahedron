import PHFile from "./PHFile"

/**
 * A program with files whose contents are to be compared for plagiarism with
 * the contents of files of other programs.
 */
export default class Program {
    private filedict: { [fileName: string] : PHFile; }

    getFile(fileName: string): PHFile {
        return this.filedict[fileName]
    }
    removeFile(fileName: string) {
        delete this.filedict[fileName]
    }
    addFile(fileName: string, file: PHFile) {
        this.filedict[fileName] = file
    }
    getFileNames(): string[] {
        return Object.keys(this.filedict)
    }
}
