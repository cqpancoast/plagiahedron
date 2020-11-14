import SessionModel from "../model/SessionModel"
import Similarity from "../model/PHSimilarity"
// import ReactCodeSetView from "../view/ReactCodeSetView"
import IReportFeatureListener from "./IReportFeatureListener"


class ReportController implements IReportFeatureListener {
    // private model: SessionModel
    // private view: ReactCodeSetView

    // start(model: SessionModel, view: ReactCodeSetView) {
    //     throw new Error("Method not implemented.")
    // }
    onFilterList(onlyThesePrograms: boolean, programNames: string[]) {
        throw new Error("Method not implemented.")
    }
    onSelectSimilarity(similiarity: Similarity) {
        throw new Error("Method not implemented.")
    }
    onReorderProgramWindows(newProgramNameOrder: string[]) {
        throw new Error("Method not implemented.")
    }
    onSwitchFileInViewerWindow(programName: string, newFileName: string) {
        throw new Error("Method not implemented.")
    }
    onDownloadReport() {
        throw new Error("Method not implemented.")
    }
}
