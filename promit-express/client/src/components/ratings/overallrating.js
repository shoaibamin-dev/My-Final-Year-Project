import React from 'react';

import StarRatings from 'react-star-ratings';

import axios from 'axios';

export default class OverReadOnlyRating extends React.Component {



    constructor(props) {
        super(props)

        console.log("OverReadOnlyRating Props", props)


    }


  


    render() {
        return (
            <StarRatings
                rating={this.props.rating}
                starDimension="25px"
                starSpacing="0px"
                starRatedColor='blue'
            />
        );
    }
}