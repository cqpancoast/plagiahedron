import React from 'react'
import './UploadPage.css'
import ProgramUpload from './ProgramUpload'
import ConversionUtils from './model/ConversionUtils';
import PHFile from './model/PHFile';
import Program from './model/Program';
import CodeSet from './model/CodeSet';
import Plagiahedron from './model/Plagiahedron';
import IPlagiahedronBuilder from './model/IPlagiahedronBuilder';
import PlagiahedronBuilder from './model/PlagiahedronBuilder';

export default class UploadPage extends React.Component<any, any>{

    count: number = 0

    constructor(props: any) {
        super(props);

        this.state = {
            programNameArray: [],
            programArray: []
        }

        this.addProgram = this.addProgram.bind(this);
    }

    // from: https://blog.shovonhasan.com/using-promises-with-filereader/
    readUploadedFileAsText = (inputFile: Blob): any => {
        const temporaryFileReader = new FileReader();

        return new Promise((resolve, reject) => {
            temporaryFileReader.onerror = () => {
                temporaryFileReader.abort();
                reject(new DOMException("Problem parsing input file."));
            };

            temporaryFileReader.onload = () => {
                resolve(temporaryFileReader.result as String);
            };
            temporaryFileReader.readAsText(inputFile);
        });
    };

    /**
     * Adds Program name to list of Programs and adds Program to Codeset
     * @param uploads FileList taken from html input
     */
    addProgram = async (uploads: FileList | null) => {
        // var uploads = event.target.files

        if (!uploads) {
            alert("invalid input, please try again")
            return
        }
        else if (uploads?.length === 0) {
            return
        }
        else {
            // add name to Program list
            var programName = prompt("Please enter program name", "Program " + (this.count + 1));
            if (programName) {
                this.addToProgramNameList(programName)

                // convert to Program and upload to CodeSet
                let phFileList: PHFile[] = []

                for (var i = 0; i < uploads.length; i++) {

                    let file = uploads.item(i) as File

                    // get file contents with FileReader 
                    try {
                        var fileContents = await this.readUploadedFileAsText(file)
                    } catch (e) {
                        console.log("ERROR" + e);
                    }

                    var name: string = file.name
                    var extension: string = file.name.substr(file.name.lastIndexOf('.') + 1)

                    phFileList.push(new PHFile(name, extension, fileContents))

                }
                this.addToProgramList(new Program(programName, phFileList))
            }
        }
    }

    // todo: render? results page and pass PH and Codeset as props
    renderResultsPage() {
        var codeSet: CodeSet = new CodeSet(this.state.programArray)
    }

    /**
     * Adds Program to list of Programs
     * @param name Program name to be added 
     */
    addToProgramList(program: Program) {
        let temp: Program[] = this.state.programArray
        temp.push(program)
        this.setState({ programArray: temp })
    }

    /**
     * Adds name of Program to ProgramContainer
     * @param name Program name to be added to front-end ProgramContainer 
     */
    addToProgramNameList(name: string) {
        let temp: JSX.Element[] = this.state.programNameArray
        temp.push(<ProgramUpload name={name} count={this.count + 1} />)

        this.setState({ programNameArray: temp })

        this.count++
    }

    /**
     * Dynamically changes page title based on number of uploaded programs
     */
    getUploadPageTitle(): string {
        if (this.count == 0) return "PROGRAM UPLOAD"
        else return this.count + " UPLOADED"
    }


    render() {
        return (
            <div className="UploadPage">

                <p className="UploadPageTitle"> {this.getUploadPageTitle()} </p>
                <div className="Program-Container" id="ProgramContainer">
                    {this.state.programNameArray}
                </div>

                <div className="UploadButtonContainer">
                    <div className="UploadButton-background">
                        <p className="UploadButton-text">upload folder</p>
                        <input type="file"
                            className="UploadButton"
                            id="UploadDirectory"
                            multiple
                            /*/@ts-expect-error/*/
                            webkitdirectory=""
                            directory=""
                            onChange={(e) => this.addProgram(e.target.files)}
                        >
                        </input>
                    </div>
                    <div className="UploadButton-background">
                        <p className="UploadButton-text"> upload file </p>
                        <input type="file"
                            className="UploadButton"
                            id="UploadSingle"
                            onChange={(e) => this.addProgram(e.target.files)}>
                        </input>
                    </div>
                </div>

                <div className="CompareButton-background">
                    <p className="CompareButton-text">compare all</p>
                    <button className="CompareButton">
                    </button>
                </div>
            </div>
        );
    }
}
