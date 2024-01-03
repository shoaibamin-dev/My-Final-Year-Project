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





export default function CreateProductForm(props) {
  console.log(props, "CreateProductForm")
  const classes = useStyles();

  const [states, setStates] = React.useState([false, "Add A New Product", <AddCircleOutlineIcon />, { title: '', name: '', desc: '', price: 0, file: {} }, false]);

  const handleToggle = () => {
    const newStates = [...states];
    newStates[0] = !newStates[0];
    newStates[1] = (newStates[0]) ? ("Close This Form") : ("Add A New Product")
    newStates[2] = (newStates[0]) ? (<HighlightOffIcon />) : (<AddCircleOutlineIcon />)
    setStates(newStates);
  }

  const handleInput = (val, attr) => {

    console.log(val)

    const newStates = [...states];

    switch (attr) {
      case 'title':
        newStates[3].title = val;
        break;
      case 'name':
        newStates[3].name = val;
        break;
      case 'desc':
        newStates[3].desc = val;
        break;
      case 'price':
        newStates[3].price = val;
        break;
      default:
        break;
    }
    console.log(newStates)
    setStates(newStates);

  }

  const onChangeHandler = (event) => {



    const newStates = [...states];
    const file = event.target.files;
    newStates[3].file = file;
    setStates(newStates);

    console.log(states)



    // formData.append("name", 'Shoaib Amin');

    // console.log(imagefile.files[0])

    // console.log(formData)


  }

  const handleSubmit = (e) => {

    // e.preventDefault();

    // let formData = new FormData();
    // // var imagefile = event.target);
    // formData.append("file", states[3].file);

    //  axios.post('/upload_image',formData).then(function (response) {
    //   console.log(response.data)

    // })
    //   .catch(function (err) {
    //     console.log(err)

    //   })

    const oldStates = [...states];

    var fd = new FormData()
    // fd.append('files0',oldStates[3].file[0],oldStates[3].file[0].name)



    for (let f in oldStates[3].file) {
      let sfile = oldStates[3].file[f];
      if (typeof (sfile) === "object") {
        console.log(oldStates[3].file[f])
        fd.append('files', sfile, sfile.name)

      }
    }

    var statebody = Object.assign({}, oldStates[3], { owner_id: props.current_seller_data._id })
    delete statebody.file;
    fd.append('state', JSON.stringify(statebody))
    axios.post('/api/product/upload_product', fd)
      .then((res) => {
        props.addProduct(res.data.result)
        // console.log(res.data)

        axios.put(`/api/seller/update_products/${props.current_seller_data._id}`, res.data).then((ress) => {
            // props.addProduct();
          
          console.log(ress.data)

          oldStates[3] = {...states[3], title: '', name: '', desc: '', price: 0, file: {} };
          oldStates[4] =true;
          setStates(oldStates);

        document.querySelector('#contained-button-file').value = null;
          
          console.log("SELLER UPDATED")
        }).catch((err) => {
          console.log(err)
        })

        console.log(res)


      }).catch((e) => {
        console.log(e)
      })



  }



  return (
    <div>
      <Button

        color="primary"
        size="large"
        className={classes.button}
        startIcon={states[2]}
        style={{ color: 'green' }}
        onClick={() => handleToggle()}
      >
        {[...states][1]}
      </Button>



      {(states[0]) ? (


        <React.Fragment>
          <div style={{ marginTop: 40 }} ></div>
          <Grid container >

            <Grid container xs={2} spacing={3}></Grid>
            <Grid container xs={8} spacing={3}>
              <Grid item xs={12} >
                <TextField
                  required
                  id="productTitle"
                  name="productTitle"
                  label="Product Title"
                  fullWidth
                  autoComplete="given-name"
                  value={states[3].title}
                  onChange={(e) => handleInput(e.target.value, 'title')}

                />
              </Grid>

              <Grid item xs={12} >
                <TextField
                  required
                  id="productName"
                  name="productName"
                  label="Product Name"
                  fullWidth
                  autoComplete="given-name"
                  value={states[3].name}
                  onChange={(e) => handleInput(e.target.value, 'name')}

                />
              </Grid>

              <Grid item xs={12} >
                <TextField
                  required
                  id="productDesc"
                  name="productDesc"
                  label="Description"
                  fullWidth
                  multiline
                  autoComplete="given-name"
                  value={states[3].desc}
                  onChange={(e) => handleInput(e.target.value, 'desc')}


                />
              </Grid>




              <Grid item xs={12} >
                <TextField
                  id="productPricePerUnit"
                  name="productPricePerUnit"
                  label="Product Price Per Unit (in USD)"
                  fullWidth
                  autoComplete="shipping address-level2"
                  value={states[3].price}
                  onChange={(e) => handleInput(e.target.value, 'price')}
                />
              </Grid>

              <Grid item xs={12} sm={6}>

                <div className={classes.root}>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={onChangeHandler}
                    name="file"
                    
                  />


                </div>

              </Grid>


              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<BorderColorRoundedIcon />}
                  onClick={(ev) => { handleSubmit(ev) }}
                >
                  Create
      </Button>
              </Grid>


            </Grid>
            <Grid container xs={2} spacing={3}></Grid>
          </Grid>
          
          {(states[4])?(<CustomAlert/>):(<div></div>)}
          

        </React.Fragment>

      ) : (<div></div>)}

      <div style={{ marginTop: 40 }}></div>
      <Divider/>

      <React.Fragment>
        <div style={{ marginTop: 80 }} ></div>

        <Grid container >

          {props.current_seller_data.products.map((e,index)=>{
            return <Grid key={index} item xs={4} spacing={6}>
               <ProductCard product = {e} />
            </Grid>
          })}

          

        </Grid>

      </React.Fragment>


    </div>
  );
}