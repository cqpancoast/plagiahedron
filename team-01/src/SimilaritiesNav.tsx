import { render } from '@testing-library/react';
import React from 'react';
import './SimilaritiesNav.css';
import Similarity from './Similarity';
import FilterButton from './FilterButton';
import Plagiahedron from './model/Plagiahedron';


class SimilaritiesNav extends React.Component<{ ph: Plagiahedron, onClick: any }, {similarityArray: any}>{

    constructor(props: any) {
        super(props);
        this.state = {
            similarityArray: [<Similarity groupNumber={1} score={2} groupSize={5} similarityContent="hello" ph={this.props.ph} onClick={this.props.onClick}/>],
        }
    }

    /**
     * Sets the similarityArray state value to all of the Similarity components that need to be rendered 
     */

    makeSimilaritiesArray() {
        const tempArray = []
        for(var index = 0; index < this.props.ph.getAllSimilarities().length; index++) {
            var sim = this.props.ph.getAllSimilarities()[index]
            const simProps = { groupNumber: this.props.ph.getAllSimilarities().indexOf(sim), score: sim.getScore(), groupSize: sim.getProgramNames().length, similarityContent: sim.getParsedMatch(), ph: this.props.ph, onClick: this.props.onClick };
            tempArray.push(<Similarity {...simProps} />)
        }

        this.setState({
            similarityArray: tempArray
        })
    }

    render() {
        return (
            <div className="SimilaritiesNav">
                <div className="Similarities-header">
                    <div className="SimilaritiesNav-title">
                        {this.props.ph.getAllSimilarities().length === 1 ? 
                        <div>
                            {this.props.ph.getAllSimilarities().length} Similarity
                        </div> :
                        <div>
                            {this.props.ph.getAllSimilarities().length} Similarities
                        </div>

                        }
                    </div>
                    <div className="SimilaritiesNav-button">
                        <FilterButton />
                    </div>
                </div>
                <div className="SimilaritiesNav-fileBox">
                    {this.state.similarityArray}
                </div>
            </div>
        );

    }
    
}

export default SimilaritiesNav;