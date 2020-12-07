import React from 'react';
import back from './back-button.svg';
import './BackButton.css';
import Homepage from './Homepage';

class BackButton extends React.Component <{onClick: any}> {

    render() {
        return (
            <div className="backButton" onClick={this.props.onClick}>
                <img src={back} />
            </div>
          );
    }
}

export default BackButton;