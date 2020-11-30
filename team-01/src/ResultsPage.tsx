import React from 'react';
import SimilarityCloseup from './SimilarityCloseup';
import SimilaritiesNav from './SimilaritiesNav';
import ProgramsNav from './ProgramsNav';
import BackButton from './BackButton';
import './ResultsPage.css';
import Homepage from './Homepage';

class ResultsPage extends React.Component {
    render() {
        return (
            <div className="ResultsPage">
                <div className="backButton">
                    <BackButton />
                </div>
                <div className="ResultPage-container">
                    <div className="similarity-closeup">
                        <SimilarityCloseup />
                    </div>
        
                    <div className="ResultsPage-nav">
                        <SimilaritiesNav />
                        <ProgramsNav />
                    </div>
                </div>
            </div>
          );
    }

    handleBackClick() {
        return(<Homepage />)
    }
}

export default ResultsPage;
