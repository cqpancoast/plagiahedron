import IParser from "./IParser"

/**
 * Our internal representation of an imported file.
 * 
 * More formally, a file in a Program being compared against others for
 * plagiarism by an IPlagiahedronGenerator. This means that a file can store
 * a parsed version of itself. Once this parsed version is set,
 * it cannot be un-set.
 */
export default class PHFile {
    private parsedContent: any

    constructor(private name: string, private extension: string, private content: string) {}
    /**
     * Returns private field name of PHFile
     */
    getName(): string {
        return this.name
    }
    /**
     * Returns priavte field extension of PHFile
     */
    getExtension(): string {
        return this.extension
    }
    /**
     * Returns a string with both name and extension of PHFile
     * Just for extra convenience
     */
    getNameAndExtension(): string {
        return this.name + this.extension
    }
    /**
     * Returns private field content of PHFile
     */
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
