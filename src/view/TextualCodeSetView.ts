import CodeSet from "../model/CodeSet"
import SessionModel from "../model/SessionModel"
import ICodeSetView from "./ICodeSetView"

class TextualCodeSetView implements ICodeSetView<string> {
    render(session: SessionModel): string {
        throw new Error("Method not implemented.")
    }
}
