import React from 'react'
import axios from "axios";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import Ratings from '../../../ratings/index';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

    rootb: {
        marginTop: 50,
    },
    paper: {
        padding: theme.spacing(2),

        color: theme.palette.text.secondary,
    },
    right: {
        float: 'right'
    },

    left: {
        float: 'left'
    },

    center: {
        textAlign: 'center'
    },
    mtop: {
        marginTop: '-8px'
    },

    rmtop:{
        float: 'right',
        marginTop: '-8px'
    }



}));


export default function CartForm(props) {

    console.log("CARTFORM", props)

    const [states, setStates] = React.useState({ list: [], isLoaded: false });

    const classes = useStyles();



    const handleSinglePay = (elId) => {


        axios.put(`/api/buyer/cart/bought/${props.current_seller_data._id}`, { id: elId }).then((res) => {
           
            // console.log("res.data",res.data)



        // axios.put(`/api/buyer/cart/bought/${props.current_seller_data._id}`,).then(()=>)


         const newStates = { ...states };
            let prevList = newStates.list;

            for (let i = 0; i < prevList.length; i++) {
                const element = prevList[i];

                if(element.newId == elId){
                    
                    prevList[i].isPurchased = true;
                    props.addPurchase(elId);
                
                }

                // console.log("elementlist",element)                
            }

            
            
            console.log(newStates, "newSTATESs")
            setStates(newStates);
            
        }

        )

        console.log(elId)
    }


    const loadPromotions = () => {



        if (!states.isLoaded) {

            let joined_cart_products = [];






            props.current_seller_data.products_bought.map((elem, index) => {

                   


                axios.get(`/api/product/${elem[1]}`).then(product_result => {
                    
                    const cloned_product_result = product_result.data;

                    console.log("cloned_product_result",cloned_product_result)
                        
                    
                    cloned_product_result.quantity = elem[5];
                    cloned_product_result.newId = elem[0];
                    cloned_product_result.isPurchased = elem[6];


                    //   let merged = { ...cloned_product_result, ...elem[4] };
                    joined_cart_products.push(cloned_product_result);

                    if (index == props.current_seller_data.products_bought.length - 1) {
                        const newStates = { ...states };
                        newStates.list = joined_cart_products.slice();
                        newStates.isLoaded = true;
                        console.log(newStates, "newSTATES")
                        setStates(newStates);
                    }


                    // console.log("ELEM", product_result)

                })

                    




            })



        }






    }

    loadPromotions();


    return (states.isLoaded)?(
        <div>



            <div className={classes.root}>
            <h1 className={classes.center}>Your Cart</h1>
                <Grid container spacing={3}>

                    {
                        states.list.map((e, index) => {
                            return (!e.isPurchased)?( <Grid key={index} item xs={12}>
                                <Paper className={classes.paper}>
                                    <span className={classes.left}>Name: {e.name}</span>
                                    <span>Qty: {e.quantity}</span>
                                    <span className={classes.right}>Total: ${e.quantity * e.price} (${e.quantity} * ${e.price}) &nbsp;&nbsp;<Button onClick={() => handleSinglePay(e.newId)} className={classes.mtop} variant="contained" color="primary">Checkout</Button></span>
                                </Paper>
                            </Grid>):('')
                        })

                    }

                </Grid>
            </div>

            <div className={classes.root, classes.rootb}>
            <h1 className={classes.center}>Purchased Product</h1>
                <Grid container spacing={3}>

                    {
                        states.list.map((e, index) => {
                            return (e.isPurchased)?( <Grid key={index} item xs={12}>
                                <Paper className={classes.paper}>
                                    <span className={classes.left}>Name: {e.name}</span>
                                    <span>Qty: {e.quantity}</span>
                                    <span className={classes.rmtop}>Total: ${e.quantity * e.price} (${e.quantity} * ${e.price}) &nbsp;&nbsp;&nbsp;<Ratings exchanges={e.exchanges} buyer_id={props.current_seller_data._id} product_id={e._id} new_id={e.newId}/>&nbsp;&nbsp;<DoneAllIcon/></span>
                                    </Paper>
                            </Grid>):('')
                        })

                    }

                </Grid>
            </div>

        </div>):('')
    
}

