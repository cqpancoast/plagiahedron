import CodeSet from "./CodeSet";
import Plagiahedron from "./Plagiahedron";

export default interface IPlagiahedronGenerator {
    constructPlagiahedron(codeset: CodeSet): Plagiahedron
}
