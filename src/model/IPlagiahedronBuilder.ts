import CodeSet from "./CodeSet";
import Plagiahedron from "./Plagiahedron";


/**
 * Takes in a code set and produces a Plagiahedron representative of
 * similarities between files within the code set's constituent programs.
 */
export default interface IPlagiahedronBuilder {
    constructPlagiahedron(codeSet: CodeSet): Plagiahedron
}
