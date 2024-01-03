import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import BorderColorRoundedIcon from '@material-ui/icons/BorderColorRounded';
import Divider from '@material-ui/core/Divider';
import CustomAlert from '../custom_alert';

import ProductCard from './product_list';
import CreatePromotion from '../promotion/create_promotion'

const axios = require('axios');




const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));





export default function IndexProduct(props) {
  console.log(props, "CreateProductForm")
  const classes = useStyles();

  //0 - product list
  // 1 - dontknow
  // 2 - switch to promotion panel
  // 3 - dontknw


  const [states, setStates] = React.useState([{ products: [] }, false, false, {}]);

  const handlePromotion = (currentProductPromotion) =>{
    // console.log(obj)
    // const newState = [...states];
    // newState[2] = true
    // newState[3] = JSON.parse(JSON.stringify(obj));
    // console.log(states,"UPDATED STATES")
    // setStates(newState);
    props.enablePromotion(currentProductPromotion);
  } 

  const loadAllProducts = () => {

    console.log("loadAllProducts",states)
    if (!states[1]) {

      axios.get('/api/product').then((res) => {
        console.log("ALL PRODUCTS", res.data);
        const newState = [ ...states ];
        newState[0].products = res.data;
        newState[1] = true;
        console.log("NEW STATE", newState)
        setStates(newState)

      })
    }

    // let newState = [...states];



    // console.log('hello world')
  }





  loadAllProducts();




  return (
    <div>

      <React.Fragment>

        <Grid container >

          {states[0].products.map((e, index) => {
            return <Grid key={index} item xs={4} spacing={6}>
              <ProductCard handlePromotion={handlePromotion} product={e} />
            </Grid>
          })}

        </Grid>

      </React.Fragment>

    </div>
  );
}