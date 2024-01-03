import React from 'react';

import StarRatings from 'react-star-ratings';

import axios from 'axios';

export default class ReadOnlyRating extends React.Component {



    constructor(props) {
        super(props)

        console.log("Rating Props", props)


        this.state = {
            rating: 0,
        }
    }

    componentDidMount() {


        const exchanges = this.props.exchanges;
        console.log("componentdidmount rating", exchanges);
        if (exchanges) {

            let oc = 0
            while (true) {

                try {
                    if (exchanges[oc.toString()][3].toString() == this.props.new_id.toString()) {

                        if (exchanges[oc.toString()][7]) {

                            console.log("found rating!", parseInt(exchanges[oc.toString()][7]));

                            this.setState({
                                rating: exchanges[oc.toString()][7],
                                isRated: true
                            });

                        }

                        break;


                    }

                }
                catch (error) {
                    // console.log("limit exceeded", error)
                    break;
                }


                oc++;
            }
        }
    }

  


    render() {
        // aggregateRating = 2.35;
        return (
            <StarRatings
                rating={this.state.rating}
                starDimension="25px"
                starSpacing="0px"
                starRatedColor='yellow'
            />
        );
    }
}