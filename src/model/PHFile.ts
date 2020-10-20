export default class PHFile {
    private name: string
    private extension: string
    private content: string

    getName(): string {
        return this.name
    }
    getExtension(): string {
        return this.extension
    }
    getContent(): string {
        return this.content
    }
}
