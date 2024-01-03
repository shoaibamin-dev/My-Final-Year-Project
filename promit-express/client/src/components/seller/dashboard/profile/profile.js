import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import SaveIcon from '@material-ui/icons/Save';

const axios = require('axios');


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2)
  },
}));





export default function ProfileForm(props) {
  console.log("PROFILE", props)
  const classes = useStyles();
  const [states, setStates] = React.useState({
    address: props.current_seller_data.address,
    city: props.current_seller_data.city,
    country: props.current_seller_data.country

  });

  const handleSave = (id) => {
    // console.log("HELLO handlesave")
    // axios.put(`/api/seller/${id}`, {...states}).then(response => {
    //   console.log(response.data)
    // }, response => {
    //   console.log('response')
    // })

    props.handleSave(id, states);
  }

  const handleInput = (val, attr) => {
    
    console.log(val)

    const newState = {...states};

    switch (attr) {
      case 'address':
        newState.address = val;
        break;
      case 'city':
        newState.city = val;
        break;
      case 'country':
        newState.country = val;
        break;
      default:
        break;
    }
    console.log(newState)
    setStates(newState);

  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Your Profile Settings
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <TextField
            required
            id="fullName"
            name="fullName"
            label="Full name"
            fullWidth
            autoComplete="given-name"
            value= {states.name}
            disabled
            
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="address"
            name="address"
            label="Address"
            fullWidth
            autoComplete="shipping address-line1"
            value={states.address}
            onChange={(e) => handleInput(e.target.value, 'address')}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            value={states.city}
            onChange={(e) => handleInput(e.target.value, 'city')}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            value={states.country}
            onChange={(e) => handleInput(e.target.value, 'country')}
          />
        </Grid>

        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={() => handleSave(props.current_seller_data._id)}
        >
          Save
      </Button>

      </Grid>
    </React.Fragment>
  );
}