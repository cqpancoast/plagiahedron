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
import XParser from './model/XParser';
import CommentSpecialToken from './model/CommentSpecialToken';
import CharSpecialToken from './model/CharSpecialToken';
import IParser from './model/IParser';
import SpecialTokens from './SpecialTokens';
import ResultsPage from './ResultsPage';

export default class UploadPage extends React.Component<any, any>{

    count: number = 0
    currentExtension: string = ""

    constructor(props: any) {
        super(props);

        this.state = {
            programNameArray: [],
            programArray: [],
            goToResults: false
        }

        this.addProgram = this.addProgram.bind(this);
        this.handleToResultsClick = this.handleToResultsClick.bind(this);
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
            alert("Invalid input")
            return
        }
        else {
            var programName = prompt("Please enter program name", "Program " + (this.count + 1));
            if (programName) {

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

                    var name: string = file.name.substr(0, file.name.lastIndexOf('.'))
                    var extension: string = file.name.substr(file.name.lastIndexOf('.') + 1)

                    if (this.currentExtension != extension) {
                        if (this.currentExtension === "") {
                            if (this.isValidExtension(extension)) {
                                this.currentExtension = extension
                            } else {
                                alert("Please upload files with extension .java or .ts")
                                return
                            }
                        } else {
                            alert("Please upload files with only extenstion ." + this.currentExtension)
                            return
                        }
                    }

                    phFileList.push(new PHFile(name, extension, fileContents))
                }
                // add name to Program-Container component
                this.addToProgramNameList(programName)

                // add Program to list of program
                this.addToProgramList(new Program(programName, phFileList))
            }
        }
    }

    makeCodeSet(): CodeSet {
        return new CodeSet(this.state.programArray)
    }

    // todo: render? results page and pass PH and Codeset as props
    makePlagiahedron(): Plagiahedron {
        var xParser: IParser<string> = new XParser(20, {
            "": SpecialTokens.emptyLang,
            "java": SpecialTokens.javaBasic,
            "ts": SpecialTokens.typescriptBasic
        })
        var phBuilder: IPlagiahedronBuilder = new PlagiahedronBuilder(xParser, 5)
        return phBuilder.constructPlagiahedron(this.makeCodeSet())
    }

    isValidExtension(ext: string): boolean {
        return (ext === "java" || ext === "ts")
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

    handleToResultsClick() {
        if (this.state.programArray.length >= 2) {
            this.setState({
                goToResults: true
            })
        } else {
            alert("Please compare 2 or more programs.")
        }
    }


    render() {
        return (
            <div>
                {this.state.goToResults ?
                    <ResultsPage ph={this.makePlagiahedron()} codeSet={this.makeCodeSet()} /> :

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
                            <button className="CompareButton" onClick={this.handleToResultsClick}>
                            </button>
                        </div>
                    </div>

                }
            </div>
        );
    }
}
