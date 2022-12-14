import React from 'react';
import SimilarityCloseup from './SimilarityCloseup';
import SimilaritiesNav from './SimilaritiesNav';
import ProgramsNav from './ProgramsNav';
import BackButton from './BackButton';
import Homepage from './Homepage';
import Plagiahedron from './model/Plagiahedron';
import CodeSet from './model/CodeSet';
import './ResultsPage.css';

class ResultsPage extends React.Component<{ph: Plagiahedron, codeSet: CodeSet}, {activeSimilarity: number, goHome: boolean}> {

    constructor(props: any) {
        super(props)
        this.state = {
            activeSimilarity: 0, 
            goHome: false
        }
        this.handleBackClick = this.handleBackClick.bind(this)
        this.setActiveSimilarity = this.setActiveSimilarity.bind(this)
    }

    /**
     * Changes the goHome state value to display the Homepage component
     */
    handleBackClick() {
        this.setState({
            goHome: true
        });
    }

    /**
     * Sets the active similarity, the similarity chosen by the user
     * @param index the index (in the array of all similarities) of the similarity that is now active
     */
    setActiveSimilarity(index: number) {
        this.setState({
            activeSimilarity: index
        });
    }
    
    render() {
        const simProps = {ph: this.props.ph, onClick: this.setActiveSimilarity, activeSimIndex: this.state.activeSimilarity}
        const progProps = {ph: this.props.ph, activeSimIndex: this.state.activeSimilarity}
        const closeupProps = {ph: this.props.ph, codeSet: this.props.codeSet, activeSimIndex: this.state.activeSimilarity}
        return (
            <div>
                {this.state.goHome ?
                <Homepage /> :

                <div className="ResultsPage">
                    <div className="backButton">
                        <BackButton onClick={this.handleBackClick}/>
                    </div>
                    <p className="results-title">Similarity Report</p>
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
}

export default ResultsPage;
