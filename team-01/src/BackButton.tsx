import React from 'react';
import back from './back-button.svg';
import './BackButton.css';

class BackButton extends React.Component <{onClick: any}> {

    render() {
        return (
            <div className="BackButton" onClick={this.props.onClick}>
                <img src={back} />
            </div>
          );
    }
}

export default BackButton;