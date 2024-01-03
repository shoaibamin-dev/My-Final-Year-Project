import React from 'react';

import StarRatings from 'react-star-ratings';

import axios from 'axios';

export default class Ratings extends React.Component {

    constructor(props) {
        super(props)

        console.log("Rating Props", props)


        this.state = {
            rating: 0,
            isRated: false
        }




    }

    changeRating(newRating, name) {
        console.log(newRating)

        if (!this.state.isRated) {


            axios.put(`/api/buyer/cart/rate/${this.props.buyer_id}`, { rating: newRating, product_id: this.props.product_id, new_id: this.props.new_id }).then((res) => {
                console.log("resdata", res.data);

                this.setState({
                    rating: newRating,
                    isRated: true
                });

            })


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
                    console.log("limit exceeded", error)
                    break;
                }


                oc++;
            }
        }
    }


    render() {
        // rating = 2;
        return (
            <StarRatings
                rating={this.state.rating}
                starRatedColor="blue"
                changeRating={this.changeRating.bind(this)}
                numberOfStars={5}
                starDimension="35px"
                starSpacing="0px"
                name='rating'
                starRatedColor='#f4fc17'
                starEmptyColor="gray"
            />
        );
    }
}


