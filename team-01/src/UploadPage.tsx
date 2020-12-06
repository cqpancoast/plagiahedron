import React from 'react'
import './UploadPage.css'
import ProgramUpload from './ProgramUpload'

export default class UploadPage extends React.Component<any, any>
{
    constructor(props: any) {
        super(props);
        this.UploadToCodeSet = this.UploadToCodeSet.bind(this);
    }

    /**
     * Converts Files in a FileList to Programs to be used in the CodeSet
     * @param uploads FileList taken from html input
     */
    UploadToCodeSet(uploads: FileList | null) {
        if (uploads === null) {
            alert("invalid input, please try again")
            return
        }
        else if (uploads?.length === 0) {
            return
        }
        else {
            for (var i = 0; i < uploads.length; i++) {
                // TODO: use ConversionUtil and upload to CodeSet
                alert(uploads.item(i)?.name)
            }
        }
    }

    // todo: render? results page and pass PH and Codeset as props
    renderResultsPage(){
        alert("rendering results...")
    }

    render() {
        return (
            <div className="UploadPage">
                <p className="UploadPageTitle"> XX Programs </p>
                <div className="ProgramContainer">
                    <ProgramUpload />
                    <ProgramUpload />
                    <ProgramUpload />
                    <ProgramUpload />
                    <ProgramUpload />
                    <ProgramUpload />
                </div>
                <div className="UploadButton-background">
                    <p className="UploadButton-text"> upload </p>
                    <input type="file" multiple
                        name="file" id="file" className="UploadButton"
                        onChange={(e) => this.UploadToCodeSet(e.target.files)}>
                    </input>
                </div>

                <div className="CompareButton-background">
                    <p className="CompareButton-text">compare files </p>
                    <button className="CompareButton"
                        onClick={(e) => this.renderResultsPage()}>
                    </button>
                </div>
            </div>
        );
    }
}