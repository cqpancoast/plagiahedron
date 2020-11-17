/**
 * Interface for CodeSet, to be implemented by CodeSetController
 */
export default interface ICodeSetFeatureListener {
    /**
     * Called when needed to add a program to the codeset
     */
    onAddProgram(): any
    /**
     * Called when needed to delete a program from the codeset
     * @param programName name of program to be deleted
     */
    onDeleteProgram(programName: string): any
    /**
     * Called when needed to delete a file from the codeset
     * May need to check for if filename exists within program name
     * @param programName name of program with file to be deleted
     * @param fileName name of file to be deleted
     */
    onDeleteFile(programName: string, fileName: string): any
    /**
     * Called when needed to generate report
     */
    onGenerateReport(): any
}
