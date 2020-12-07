import { render } from '@testing-library/react';
import React from 'react';
import './Program.css';
import FileLines from './file-lines.svg';

class Program extends React.Component <{name: string}>{
    
    render() {
        return (
            <div className="Program">
                <div className="Program-content">
                    <div className="Program-lines">
                        <img src={FileLines}/>
                    </div>

                    <div className="Program-name">
                        {this.props.name}
                    </div>
                </div>
            </div>
          );

    }
}

export default Program;