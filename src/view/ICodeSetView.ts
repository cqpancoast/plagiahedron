import SessionModel from "../model/SessionModel"

export default interface ICodeSetView<T> {
    render(model: SessionModel): T
}
