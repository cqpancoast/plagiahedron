import ICodeSetFeatureListener from "./ICodeSetFeatureListener"
import SessionModel from "../model/SessionModel"
import ReactCodeSetView from "../view/ReactCodeSetView"


class CodeSetController implements ICodeSetFeatureListener {
    private model: SessionModel
    private view: ReactCodeSetView

    start(model: SessionModel, view: ReactCodeSetView) {
        throw new Error("Method not implemented.")
    }
    onAddProgram() {
        throw new Error("Method not implemented.")
    }
    onDeleteProgram(programName: string) {
        throw new Error("Method not implemented.")
    }
    onDeleteFile(programName: string, fileName: string) {
        throw new Error("Method not implemented.")
    }
    onGenerateReport() {
        throw new Error("Method not implemented.")
    }
}
