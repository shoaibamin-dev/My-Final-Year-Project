import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import SaveIcon from '@material-ui/icons/Save';
import ShopIcon from '@material-ui/icons/Shop';
import OverReadOnlyRating from '../../../ratings/overallrating';

const Swal = require('sweetalert2')
const axios = require('axios');



const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2)
  },

  rating:{
    textAlign: 'left',
    marginTop: '10px'
  },

  tleft:{
    textAlign: 'left'
  },

}));





export default function Funnel(props) {

  console.log(props, "SingleFunnel")


  const classes = useStyles();
  const [states, setStates] = React.useState({quantity:0});

  


  const addToCart = () => {

    Swal.fire({
      title: `Confirm Purchase`,
      text: `Product name: ${props.currentFunnel.name} | Price per unit: ${props.currentFunnel.price}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Add to cart!'
    }).then((result) => {
      if (result.value) {
        
        // axios.post(`/api/buyer/cart`,Object.assign(states,props.currentFunnel)).then((res)=>console.log(res.data));
        

        // console.log("PRDOCUTID",props.currentFunnel.product_id)
   

        let savedData = {
          product_id : props.currentFunnel.product_id,
          seller_id : props.currentFunnel.seller_id,
          promoter_id : props.currentFunnel.promoter_id,
          price : props.currentFunnel.price,
          quantity: states.quantity
          
        }

        

        axios.put(`/api/buyer/cart/${props.buyerId}`, savedData).then((res)=>{
          console.log("addtocartresdata",res.data);
          props.addCart([res.data.newId, savedData.product_id, savedData.promoter_id, savedData.seller_id,savedData.price, savedData.quantity, false]);



        });

       
        Swal.fire(
          'Added to cart!',
          'You can go to your cart to check out.',
          'success'
        );
        
      }

    });

  }




  return (
    <div style={{ overflow: 'hidden' }}>

      <img src={`/api/image/${props.currentFunnel.picture_id}`} />

      <br />
     <div  className={classes.rating}> <OverReadOnlyRating rating = {props.currentFunnel.rating}/></div>
      <div  className={classes.tleft}><span><b><i>{props.currentFunnel.exchanges.length}</i></b> purchases</span></div>
      <div  className={classes.tleft}><span>Last purchase: <b><i>{   (props.currentFunnel.exchanges[(props.currentFunnel.exchanges.length-1).toString()] == null)?("None"):(props.currentFunnel.exchanges[(props.currentFunnel.exchanges.length-1).toString()][6])    }</i></b></span></div>
      <br />


      <TextField
        label={`Quantity (${props.currentFunnel.price} USD per piece)`}
        type="number"
        style={{ float: 'left' }}
        InputLabelProps={{
          shrink: true,
        }}

        value={states.quantity}
        onChange={(ev)=>setStates({quantity: Number(ev.target.value)})}

      />
        &nbsp;&nbsp;
      <Button onClick={() => addToCart()} size="medium" variant="contained" color="secondary" startIcon={<ShopIcon />}>
        Add to Cart
      </Button>
    </div>
  );
}