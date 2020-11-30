import { render } from '@testing-library/react';
import React from 'react';
import './FileCloseup.css';

class FileCloseup extends React.Component{
    
    render() {
        return (
            <div className="FileCloseup">
                <div className="FileCloseup-content">
                    <div className="FileCloseup-title">
                    <div className="FileCloseup-number">
                            1
                        </div>
                        <div className="FileCloseup-name">
                            FileOne.ts
                        </div>
                    </div>
                    <div className="FileCloseup-box">
                        sample text sample text sample text sample text
                    </div>
                </div>
            </div>
          );

    }
}

export default FileCloseup;