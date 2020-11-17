import React from 'react';
import './BigButton.css';

function BigButton(props: any) {
  return (
    <div className="BigButton">
        <div className="BigButton-text">
            {props.linkContent}
        </div>
    </div>
  );
}

export default BigButton;
