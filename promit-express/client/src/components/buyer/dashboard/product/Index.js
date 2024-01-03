import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import SaveIcon from '@material-ui/icons/Save';

import PromotionCard from './promotion_list';
import Funnel from './funnel';




const axios = require('axios');


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2)
  },
}));





export default function IndexPromotion(props) {

  console.log(props, "IndexPromotion")

  const classes = useStyles();
  const [states, setStates] = React.useState({ list: [], isLoaded: false, current_funnel: {}, current_funnel_bool: false });

  console.log(states,"STATE, INDEX");

  // const loadAllPromotion = () => {

  //   console.log("loadAllPromotion",states)
  //   if (!states[1]) {

  //     axios.get('/api/product').then((res) => {

  //       console.log("ALL PRODUCTS", res.data);
  //       const newState = [ ...states ];
  //       newState[0].products = res.data;
  //       newState[1] = true;
  //       console.log("NEW STATE", newState)
  //       setStates(newState)

  //     })
  //   }

  //   // let newState = [...states];



  //   // console.log('hello world')
  // }






  // loadAllPromotion();



const setCurrentFunnel = (funnelInfo) =>{

  

    const newState = {...states};

    newState.current_funnel = funnelInfo;
    
    newState.current_funnel_bool = true;
    console.log(newState, "NEWSTATE");
    setStates(newState);


}








  const loadPromotions = () => {

    // for (let p = 0; p < props.current_seller_data.promoting_products.length; p++) {
    //   const pid = props.current_seller_data.promoting_products[p];

    //   console.log(pid, "pid")

    //   axios.get(`/api/promotion/${pid}`).then((res) => {
    //     const newStates = { ...states };
    //     newStates.isLoaded = p == (props.current_seller_data.promoting_products.length - 1);
    //     newStates.list.push(res.data);
    //     console.log(newStates)
    //     setStates(newStates);

    //   })

    // }

    // console.log("HELLO WORLDDDD", props.current_seller_data.promoting_products)


    if (!states.isLoaded) {

      let joined_product_promotion = [];

      axios.get(`/api/promotion/`).then((res) => {

        // console.log(res.data);


        const promotions_result = res.data;
        promotions_result.map((elem, index) => {
          axios.get(`/api/product/${elem.product_id}`).then(product_result => {
            const cloned_product_result = product_result.data;
            delete cloned_product_result.register_date; 
            delete cloned_product_result._id; 

            let merged = { ...cloned_product_result, ...elem };
            joined_product_promotion.push(merged);

            if (index == promotions_result.length - 1) {
              const newStates = { ...states };
              newStates.list = joined_product_promotion.slice();
              newStates.isLoaded = true;
              console.log(newStates, "newSTATES")
              setStates(newStates);
            }

          })
        })



      })
    }





  }

  loadPromotions();






  return (states.current_funnel_bool)?(<Funnel addCart={props.addCart}  currentFunnel={states.current_funnel} buyerId ={props.current_seller_data._id}/>):(
    <div>

      <React.Fragment>
        <div style={{ marginTop: 80 }} ></div>

        <Grid container >


          {
            states.list.map((e, index) => {
              return <Grid key={index} item xs={4} spacing={6}>
                <PromotionCard addCart={props.addCart}  setCurrentFunnel={setCurrentFunnel} promotion={e} />
              </Grid>
            })

          }




        </Grid>

      </React.Fragment>

      {/* <h1>Index promotion</h1> */}

    </div>
  )
}