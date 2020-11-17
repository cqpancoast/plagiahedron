import ICodeSetFeatureListener from "./ICodeSetFeatureListener"
import SessionModel from "../model/SessionModel"
// import ReactCodeSetView from "../view/ReactCodeSetView"

/**
 * Concrete implementation of interface ICodeSetFeatureListener
 * Allows for model and view to interact with each other and update both at once
 */
class CodeSetController implements ICodeSetFeatureListener {
    //model represents the model attached to this controller
    // private model: SessionModel
    //view represents the view attached to this controller
    // private view: ReactCodeSetView

    /**
     * Starts system
     * @param model sets this model to be the SessionModel
     * @param view sets this view to be the ReactCodeSetView
     */
    // start(model: SessionModel, view: ReactCodeSetView) {
    //     throw new Error("Method not implemented.")
    // }
    /**
     * Defines behavior when needed to add a program
     */
    onAddProgram() {
        throw new Error("Method not implemented.")
    }
    /**
     * Defines behavior when needed to delete a program
     * @param programName name of program to be deleted
     */
    onDeleteProgram(programName: string) {
        throw new Error("Method not implemented.")
    }
    /**
     * Defines behavior whrn deleteFile is called
     * @param programName program with file to be deleted
     * @param fileName file to be deleted
     */
    onDeleteFile(programName: string, fileName: string) {
        throw new Error("Method not implemented.")
    }
    /**
     * Defines behavior for model and view when generatereport is called
     */
    onGenerateReport() {
        throw new Error("Method not implemented.")
    }
}
