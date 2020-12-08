import { render } from '@testing-library/react';
import React from 'react';
import './Similarity.css';
import Plagiahedron from './model/Plagiahedron';


class Similarity extends React.Component<{groupNumber: number, score: number, groupSize: number, similarityContent: string, ph: Plagiahedron, onClick: any}>{

    render() { 
        return (
            <div className="Similarity" onClick={() => this.props.onClick(this.props.groupNumber)}>
                <div className="Similarity-content">
                    <div className="Similarity-number">
                        {this.props.groupNumber + 1}
                    </div>
                    <div className="Similarity-box">
                        <div className="Similarity-box-code">
                            {this.props.similarityContent} 
                        </div>
                        <div className="Similarity-box-score">
                            Similarity Score: {this.props.score} {"\n"}
                            Group Size: {this.props.groupSize}

                        </div>
                    </div>
                </div>
            </div>
          );

    }
}

export default Similarity;