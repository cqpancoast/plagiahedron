import IReportView from "./IReportView"
import SessionModel from "../model/SessionModel"


class TextualReportView implements IReportView<string> {
    render(session: SessionModel): string {
        throw new Error("Method not implemented.")
    }
}
