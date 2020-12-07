import { render } from '@testing-library/react';
import React from 'react';
import Tabs from './Tabs';
import Tab from './Tab';
import './FileCloseup.css';

/**
 * Tabs code from 
 * https://medium.com/weekly-webtips/create-basic-tabs-component-react-typescript-231a2327f7b6
 */

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
                    <Tabs>
                        <Tab title="file1">sample code</Tab>
                        <Tab title="file2">sample code sample code sample code</Tab>
                        <Tab title="file3">sample code sample code sample code sample code</Tab>
                    </Tabs>
                </div>
            </div>
          );

    }
}

export default FileCloseup;