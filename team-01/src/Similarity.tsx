import { render } from '@testing-library/react';
import React from 'react';
import './Similarity.css';

class Similarity extends React.Component{
    
    render() {
        return (
            <div className="Similarity">
                <div className="Similarity-content">
                    <div className="Similarity-number">
                        1
                    </div>
                    <div className="Similarity-box">
                        <div className="Similarity-box-code">
                            sample code sample code  sample code sample code  sample code sample code  sample code 
                        </div>
                        <div className="Similarity-box-score">
                            Similarity Score: 120 {"\n"}
                            Group Size: 10
                        </div>
                    </div>
                </div>
            </div>
          );

    }
}

export default Similarity;