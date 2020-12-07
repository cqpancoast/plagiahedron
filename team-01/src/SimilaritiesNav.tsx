import { render } from '@testing-library/react';
import React from 'react';
import './SimilaritiesNav.css';
import Similarity from './Similarity';
import FilterButton from './FilterButton';
import Plagiahedron from './model/Plagiahedron';


class SimilaritiesNav extends React.Component<{ ph: Plagiahedron, onClick: any }>{

    render() {
        return (
            <div className="SimilaritiesNav">
                <div className="Similarities-header">
                    <div className="SimilaritiesNav-title">
                        {this.props.ph.getAllSimilarities().length} Similarities
                    </div>
                    <div className="SimilaritiesNav-button">
                        <FilterButton />
                    </div>
                </div>
                <div className="SimilaritiesNav-fileBox">
                    {
                        this.props.ph.getAllSimilarities().forEach(sim => {
                            const simProps = { groupNumber: this.props.ph.getAllSimilarities().indexOf(sim), score: sim.getScore(), groupSize: sim.getProgramNames().length, similarityContent: sim.getParsedMatch(), ph: this.props.ph, onClick: this.props.onClick };
                            <Similarity {...simProps} />
                        })
                    };
                </div>
            </div>
        );

    }

    
}

export default SimilaritiesNav;