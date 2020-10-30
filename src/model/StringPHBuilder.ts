import CodeSet from "./CodeSet"
import Plagiahedron from "./Plagiahedron"
import PHSimilarity from "./PHSimilarity"
import APlagiahedronBuilder from "./APlagiahedronBuilder"
import IParser from "./IParser"

class StringPHBuilder extends APlagiahedronBuilder<string> {

    constructor(protected parser: IParser<string>, protected maxGroupSize: number) {
        super()
    }
    
}
