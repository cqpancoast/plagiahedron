import IParser from "./IParser"

/**
 * Our internal representation of an imported file.
 * 
 * More formally, a file in a Program being compared against others for
 * plagiarism by an IPlagiahedronGenerator. This means that a file can store
 * a parsed version of itself. Once this parsed version is set,
 * it cannot be un-set. When this file is added to a Program, its programName
 * field is set, and cannot be unset.
 */
export default class PHFile {
    private parsedContent: any
    private programName: string

    constructor(private name: string, private extension: string, private content: string) {}

    /* If a file is named "f.ts", the name will be "f" and the extension will be ".ts". */

    getName(): string {
        return this.name
    }
    getExtension(): string {
        return this.extension
    }
    getNameAndExtension(): string {
        return this.name + this.extension
    }
    /**
     * @throws an error if the name is already defined.
     * @param programName the name of the program this file is being made a part of
     */
    setProgramName(programName: string) {
        if (this.programName !== undefined) {
            throw new Error
        }
        this.programName = programName
    }
    /**
     * @throws an error if the name isn't defined.
     */
    getProgramName(): string {
        if (this.programName === undefined) {
            throw new Error
        }
        return this.programName
    }
    getContent(): string {
        return this.content
    }

    /**
     * Parses this file and stores the result, if this hasn't already happened.
     * @param parser an IParser that produces any type from this file.
     */
    acceptParser(parser: IParser<any>) {
        if (this.parsedContent === undefined) {
            this.parsedContent = parser.parse(this)
        }
    }
    /**
     * Returns the parsed content associated with this file.
     * @throws some error if this is altered. TODO
     */
    getParsedContent(): any {
        return this.parsedContent
    }
}
