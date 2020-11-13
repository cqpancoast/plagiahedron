import Similarity from "../model/Similarity"

/**
 * Interface for generating a report
 */
export default interface IReportFeatureListener {
    onFilterList(onlyThesePrograms: boolean, programNames: string[])
    onSelectSimilarity(similiarity: Similarity)
    onReorderProgramWindows(newProgramNameOrder: string[])
    onSwitchFileInViewerWindow(programName: string, newFileName: string)
    onDownloadReport()
}

