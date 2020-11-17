import Similarity from "../model/PHSimilarity"

/**
 * Interface for generating a report
 */
export default interface IReportFeatureListener {
    onFilterList(onlyThesePrograms: boolean, programNames: string[]): any
    onSelectSimilarity(similiarity: Similarity): any
    onReorderProgramWindows(newProgramNameOrder: string[]): any
    onSwitchFileInViewerWindow(programName: string, newFileName: string): any
    onDownloadReport(): any
}

