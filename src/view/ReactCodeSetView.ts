import ICodeSetFeatureListener from "../controller/ICodeSetFeatureListener"
import CodeSet from "../model/CodeSet"
import SessionModel from "../model/SessionModel"
import ICodeSetView from "./ICodeSetView"


export default class ReactCodeSetView implements ICodeSetView<ReactComponent> {
    private featureListener: ICodeSetFeatureListener

    render(session: SessionModel): ReactComponent {
        throw new Error("Method not implemented.")
    }
    addFeatureListener(f: ICodeSetFeatureListener) {
        this.featureListener = f
    }
}
