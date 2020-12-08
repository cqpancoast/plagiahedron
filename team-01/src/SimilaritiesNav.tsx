import React from 'react';
import './SimilaritiesNav.css';
import Similarity from './Similarity';
import Plagiahedron from './model/Plagiahedron';


class SimilaritiesNav extends React.Component<{ ph: Plagiahedron, 
                                                onClick: any, 
                                                activeSimIndex: number }, {similarityArray: any}>{

    constructor(props: any) {
        super(props);
        this.state = {
            similarityArray: [],
        }
    }

    /**
     * Returns an array of Similarity components that need to be rendered 
     */

    getSimilaritiesArray(): JSX.Element[] {
        let similarityArray: JSX.Element[] = []
        let allSimilarities = this.props.ph.getAllSimilarities()
        let sortedSimilarities = allSimilarities.sort((sim1, sim2) => {
            if(sim1.getScore() > sim2.getScore()) {return -1}
            if(sim1.getScore() < sim2.getScore()) {return 1}
            return 0
        })
        for(var index = 0; index < this.props.ph.getAllSimilarities().length; index++) {
            let sim = sortedSimilarities[index]
            const simProps = { groupNumber: this.props.ph.getAllSimilarities().indexOf(sim), 
                score: sim.getScore(), 
                groupSize: sim.getProgramNames().length, 
                similarityContent: sim.getParsedMatch().replace(/\ubeef/g, "#"), 
                ph: this.props.ph, onClick: this.props.onClick};
            similarityArray.push(<Similarity {...simProps} />)
        }

        return similarityArray
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
                </div>
                <div className="SimilaritiesNav-fileBox">
                    {this.getSimilaritiesArray()}
                </div>
            </div>
        );

    }
    
}

export default SimilaritiesNav;