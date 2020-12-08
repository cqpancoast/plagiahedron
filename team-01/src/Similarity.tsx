import { render } from '@testing-library/react';
import React from 'react';
import './Similarity.css';
import Plagiahedron from './model/Plagiahedron';


class Similarity extends React.Component<{groupNumber: number, score: number, groupSize: number, similarityContent: string, ph: Plagiahedron, onClick: any}>{

    formatProgramNames() {
        let programNames = this.props.ph.getAllSimilarities()[this.props.groupNumber].getProgramNames()
        let formattedString = ""
        for(let index = 0; index < programNames.length; index++) {
            if(index !== programNames.length-1) {
                formattedString += (programNames[index] + ", ")
            } else {
                formattedString += programNames[index]
            }
        }
        return formattedString
    }

    formatFileNames() {
        let fileNames = this.props.ph.getAllSimilarities()[this.props.groupNumber].getFileSubstrings().map(fileSubstring => fileSubstring.getFileNameAndExtension())
        let formattedString = ""
        for(let index = 0; index < fileNames.length; index++) {
            if(index !== fileNames.length-1) {
                formattedString += (fileNames[index] + ", ")
            } else {
                formattedString += fileNames[index]
            }
        }
        return formattedString
    }

    render() { 
        return (
            <div className="Similarity" onClick={() => this.props.onClick(this.props.groupNumber)}>
                <div className="Similarity-content">
                    <div className="Similarity-number">
                        {this.props.groupNumber + 1}
                    </div>
                    <div className="Similarity-box">
                        <div className="Similarity-box-code">
                            {this.props.similarityContent.split('\n').map((item) => {
                                return (<span>{item}<br/></span>)
                            })} 
                        </div>
                        <div className="Similarity-box-score">
                            Similarity Score: {this.props.score} <br />
                            Group Size: {this.props.groupSize} <br />
                            Program Names: {this.formatProgramNames()} <br />
                            File Names: {this.formatFileNames()}

                        </div>
                    </div>
                </div>
            </div>
          );

    }
}

export default Similarity;