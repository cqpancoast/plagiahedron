import React from 'react';
import back from './back-button.svg';
import './BackButton.css';
import Homepage from './Homepage';

class BackButton extends React.Component{

    render() {
        return (
            <div className="backButton">
                <img src={back} />
            </div>
          );
    }
}

export default BackButton;