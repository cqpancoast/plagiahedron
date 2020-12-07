import React from 'react'
import './UploadPage.css'
import ProgramUpload from './ProgramUpload'
import Program from './model/Program';

export default class UploadPage extends React.Component<any, any>{

    count: number = 0

    constructor(props: any) {
        super(props);

        this.state = {
            programArray: [],
        }

        this.UploadToCodeSet = this.UploadToCodeSet.bind(this);
    }


    /**
     * Converts Files in a FileList to Programs to be used in the CodeSet
     * @param uploads FileList taken from html input
     */
    UploadToCodeSet(uploads: FileList | null) {
        if (uploads == null) {
            alert("invalid input, please try again")
            return
        }
        else if (uploads?.length === 0) {
            return
        }
        else {
            for (var i = 0; i < uploads.length; i++) {
                // TODO: use ConversionUtil and upload to CodeSet
                // TODO: not upload each file but the name of directory
                let filename: string = uploads.item(i)!.name!.toString()
                this.addToState(filename)
            }
        }
    }


    // todo: render? results page and pass PH and Codeset as props
    renderResultsPage() {
    }


    addToState(name: string) {
        
        let temp: JSX.Element[] = this.state.programArray
        temp.push(<ProgramUpload name={name} count={this.count} />)

        this.setState({ programArray: temp })
        
        this.count++
    }


    render() {

        return (
            <div id="UploadPage">
                <p id="UploadPageTitle"> {this.count} UPLOADED </p>
                <div id="ProgramContainer">
                    {this.state.programArray}
                </div>
                <div id="UploadButton-background">
                    <p id="UploadButton-text"> upload </p>
                    <input type="file" 
                        id="UploadButton"
                        multiple
                        /*/@ts-expect-error/*/
                        webkitdirectory="" 
                        directory=""
                        onChange={(e) => this.UploadToCodeSet(e.target.files)}>
                    </input>
                </div>

                <div id="CompareButton-background">
                    <p id="CompareButton-text">compare files </p>
                    <button id="CompareButton">
                    </button>
                </div>
            </div>
        );
    }
}
