import React from 'react';
import SimilarityCloseup from './SimilarityCloseup';
import SimilaritiesNav from './SimilaritiesNav';
import ProgramsNav from './ProgramsNav';
import BackButton from './BackButton';
import './ResultsPage.css';
import Homepage from './Homepage';
import Plagiahedron from './model/Plagiahedron';
import PHSimilarity from './model/PHSimilarity';

class ResultsPage extends React.Component<{ph: Plagiahedron}, {activeSimilarity: number, goHome: boolean}> {
    constructor(props: any) {
        super(props);
        this.state = {
            activeSimilarity: 0, 
            goHome: false
        }
        this.handleBackClick = this.handleBackClick.bind(this);
        this.setActiveSimilarity = this.setActiveSimilarity.bind(this);
    }
    render() {
        const simProps = {ph: this.props.ph, onClick: this.setActiveSimilarity}
        const progProps = {ph: this.props.ph, activeSim: this.props.ph.getAllSimilarities()[this.state.activeSimilarity]}
        const closeupProps = {ph: this.props.ph, activeSim: this.props.ph.getAllSimilarities()[this.state.activeSimilarity]}
        return (
            <div>
                {this.state.goHome ?
                <Homepage /> :

                <div className="ResultsPage">
                    <div className="backButton">
                        <BackButton onClick={this.handleBackClick}/>
                    </div>
                    <div className="ResultPage-container">
                        <div className="similarity-closeup">
                            <SimilarityCloseup {...closeupProps}/>
                        </div>
            
                        <div className="ResultsPage-nav">
                            <SimilaritiesNav {...simProps}/>
                            <ProgramsNav {...progProps}/>
                        </div>
                    </div>
                </div>
            }
                
            </div>
          );
    }

    handleBackClick() {
        this.setState({
            goHome: true
        });
    }

    setActiveSimilarity(index: number) {
        this.setState({
            activeSimilarity: index
        });
    }
}

export default ResultsPage;
