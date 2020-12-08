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
