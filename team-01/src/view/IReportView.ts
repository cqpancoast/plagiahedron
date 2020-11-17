import SessionModel from "../model/SessionModel";

export default interface IReportView<T> {
    render(session: SessionModel): T
}
