import React from 'react'
import './UploadPage.css'

export default class UploadPage extends React.Component {
    render() {
        return (
            <div className="UploadPage">
                <p className="UploadPageTitle"> 25 Programs </p>
                <div className="ListContainer">
                </div>
                <button className="PlusButton">+</button>
                <button className="CompareButton">COMPARE
                </button>
            </div>
        );
    }
}