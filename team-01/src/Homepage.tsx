import React from 'react';
import TitleLine from './line.svg';
import UploadPage from './UploadPage'
import './Homepage.css';
import { render } from '@testing-library/react';

class Homepage extends React.Component<{}, {goToUpload: boolean}>{
    constructor(props: any) {
      super(props);
      this.state = {
        goToUpload: false
      }

      this.handleUploadClick = this.handleUploadClick.bind(this);
    }

    getHomepageText(): string {
      return "Plagiahedron is a program designed to allow you to compare two or more files and check them for potential plagiarism. Simply upload one or more .java or .ts files for each individual student submission. Please ensure all individual submissions are uploaded separately. All uploads should be of one filetype."
    }

    /**
     * Changes the goToUpload state value to display the UploadPage component
     */
    handleUploadClick() {
      this.setState({
        goToUpload: true
      })
    }

    render() {
      return (
        <div>
          {this.state.goToUpload ?
          <UploadPage /> :

          <div className="Homepage">
          <div className="Homepage-title">
            <h1>
              Plagiahedron
            </h1>
          </div>
    
          <div className="Homepage-line">
              <img src={TitleLine}/>
          <p className="Homepage-text"> {this.getHomepageText()} </p>
            </div>
    
          <div className="UploadPageButton-background">
            <div className="UploadPageButton-text"> Upload files </div>
            <button className="UploadPageButton" onClick={this.handleUploadClick}>
            </button>
          </div>
        </div>
          }
        </div>
      );

    }
}

export default Homepage;
