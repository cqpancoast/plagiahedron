export default interface ICodeSetFeatureListener {
    onAddProgram()
    onDeleteProgram(programName: string)
    onDeleteFile(programName: string, fileName: string)
    onGenerateReport()
}
