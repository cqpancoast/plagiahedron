import { render } from '@testing-library/react';
import React from 'react';
import Tabs from './Tabs';
import Tab from './Tab';
import Plagiahedron from './model/Plagiahedron';
import './ProgramCloseup.css';
import { isThisTypeNode } from 'typescript';
import CodeSet from './model/CodeSet';

/**
 * Tabs code from 
 * https://medium.com/weekly-webtips/create-basic-tabs-component-react-typescript-231a2327f7b6
 */

class ProgramCloseup extends React.Component<{ph: Plagiahedron, codeSet: CodeSet, activeSimIndex: number, programName: string, programIndex: number}, {tabArray: any}>{

    constructor(props: any) {
        super(props);
        this.state = {
            tabArray: []
        }

    }


    /**
     * Returns an array of Tab components that need to be rendered 
     */
    getTabArray(): JSX.Element[] {
        let tabArray: JSX.Element[] = []
        let currentProgram = this.props.codeSet.getProgram(this.props.programName)
        let files = currentProgram.getFiles()
        for(let index = 0; index < files.length; index++) {
            tabArray.push(<Tab title={files[index].getNameAndExtension()}>{files[index].getContent()}</Tab>)
        }
        return tabArray
    }
    
    render() {
        return (
            <div className="FileCloseup">
                <div className="FileCloseup-content">
                    <div className="FileCloseup-title">
                    <div className="FileCloseup-number">
                            1
                        </div>
                        <div className="FileCloseup-name">
                            {this.props.programName}
                        </div>
                    </div>
                    <Tabs>{this.getTabArray()}</Tabs>
                </div>
            </div>
          );

    }
}

export default ProgramCloseup;