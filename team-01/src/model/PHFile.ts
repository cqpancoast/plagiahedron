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
    private programName?: string

    constructor(private name: string, private extension: string, private content: string) {}

    /**
     * Returns private field name of PHFile.
     */
    getName(): string {
        return this.name
    }

    /**
     * Returns priavte field extension of PHFile.
     */
    getExtension(): string {
        return this.extension
    }

    /**
     * Returns a string with both name and extension of PHFile.
     * If a file is named "f.ts", the name will be "f" and the extension will be ".ts".
     */
    getNameAndExtension(): string {
        return this.name + this.extension
    }

    /**
     * @param programName the name of the program this file is being made a part of.
     * @throws an error if the name is already defined.
     */
    setProgramName(programName: string) {
        if (this.programName !== undefined) {
            throw new Error(`This file has already been given to the program ${this.programName}.`)
        }
        this.programName = programName
    }

    /**
     * @throws an error if the name isn't defined.
     */
    getProgramName(): string {
        if (this.programName === undefined) {
            throw new Error("This file has not yet been given to a Program.")
        }
        return this.programName
    }

    /**
     * Gets the contents of this file.
     */
    getContent(): string {
        return this.content
    }

    /**
     * Parses this file and stores the result, if this hasn't already happened.
     * @param parser an IParser that produces any type from this file.
     * @throws Error if attempting to re-parse content.
     */
    acceptParser(parser: IParser<any>) {
        if (this.parsedContent === undefined) {
            this.parsedContent = parser.parse(this)
        } else {
            throw new Error("Attempted to re-parse a file.")
        }
    }

    /**
     * Returns the parsed content associated with this file.
     */
    getParsedContent(): any {
        return this.parsedContent
    }
}
