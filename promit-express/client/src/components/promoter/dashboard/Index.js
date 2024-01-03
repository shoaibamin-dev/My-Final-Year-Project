import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Avatar from '@material-ui/core/Avatar';
import { MainListItems, SecondaryListItems } from './listItems';
import ProfileForm from './profile/profile';
import IndexProduct from './product/Index';
import IndexPromotion from './promotion/Index';
import CreatePromotion from './promotion/create_promotion'

// import Chart from './Chart';



import Deposits from './Deposits';
import Orders from './Orders';

const axios = require('axios');













function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://localhost:3000/">
        Promit
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard(props) {
  console.log("DASHBOARD", props)
  const classes = useStyles();
  // 3 - enable promotion
  // 4 - current product to be promoted
  const [states, setStates] = React.useState(['Dashboard',true,{...props}, false, {}]);
  const [sells, setSells] = React.useState({ list: [], isLoaded: false, totalEarnings: 0 });

  console.log(states,"DASHBOARD")

  const handleDrawerOpen = () => {
    const newStates = [...states];
    newStates[1] = true;
    setStates(newStates);
  
  };
  const handleDrawerClose = () => {
    const newStates = [...states];
    newStates[1] = false;
    setStates(newStates);
  };

  const navigateDashboard = () => {
    const newStates = [...states];
    newStates[3] = false;
    newStates[4] = {};
    setStates(newStates);
  }

  const enablePromotion = (currentProductObject) => {
    
    // console.log("INSIDE enablePromotion", currentProductObject)
    
    const newStates = [...states];
    newStates[3] = true;
    newStates[4] = currentProductObject;
    setStates(newStates);
  }


  //Profile
  const handleSave = (id,curStates) => {
    console.log("HELLO handlesave");

    const newStates = [...states];
    
    axios.put(`/api/promoter/${id}`, {...curStates}).then(response => {

      // console.log(id)  
      console.log(response.data,"RESPONSE DATA")
      newStates[2].current_seller_data = response.data;
      // newStates[2].address = response.data.address;
      // newStates[2].city = response.data.city;
      // newStates[2].country = response.data.country;

      console.log(newStates,"newStates")
      setStates(newStates);
      
    }, response => {
      console.log('response')
    })
  }

  

  //Product

  // const addProduct = (product) =>{

  //   // console.log("GETT PRODUCT", product)
  //   const newStates = [...states];
  //   newStates[2].current_seller_data.products.push(product);
  //   setStates(newStates);

  //   console.log("STATE AFTER ADDING PRODUCT", states)

  // }



  
  //Load Sells

  const loadSells = () => {

    // console.log("props.products_sold[0]",props.products_sold[0])

    console.log("loadsells", states[2].current_seller_data.promoting_products_sold);

    if (!sells.isLoaded) {
      // console.log("length",Object.keys(states[2].current_seller_data.products_sold).length)
      let joined_sold_products = [];
      let p_sold = states[2].current_seller_data.promoting_products_sold;
      let oc = 0;
      let te = 0

      console.log("p_sold.length", Object.keys(p_sold).length)

      if (Object.keys(p_sold).length > 0) {



        for (var property in p_sold) {
          if (p_sold.hasOwnProperty(property)) {

            let elem = p_sold[property];
            console.log(elem, "ELEM")


            axios.get(`/api/product/${elem[1]}`).then(product_result => {

              const cloned_product_result = product_result.data;

              console.log("cloned_product_result", cloned_product_result)


              cloned_product_result.newId = elem[0];
              cloned_product_result.quantity = elem[5];
              cloned_product_result.soldDate = elem[6];
              cloned_product_result.referenceBuyerId = elem[7];

              te += (elem[4] * elem[5]);



              //   let merged = { ...cloned_product_result, ...elem[4] };
              joined_sold_products.push(cloned_product_result);

              if (Object.keys(states[2].current_seller_data.promoting_products_sold).length == oc + 1) {
                const newStates = { ...sells };
                newStates.list = joined_sold_products.slice();
                newStates.totalEarnings = te - (te / 10);
                newStates.isLoaded = true;
                console.log(newStates, "newSTATES")
                setSells(newStates);
              }

              oc++;
              // console.log("ELEM", product_result)

            })






          }
        }
      }
      else {
        const newStates = { ...sells };
        newStates.isLoaded = true;
        setSells(newStates);
      }







      // }





    }
  }

  loadSells();



  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (states[3])?(<CreatePromotion navigateDashboard={navigateDashboard} current_seller_data = {states[2]} product = {states[4]} />):(
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, states[1] && classes.appBarShift)}>



        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton,  states[1] && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {states[0]}
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              {/* <NotificationsIcon /> */}
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !states[1] && classes.drawerPaperClose),
        }}
        open={states[1]}
      >
        <div className={classes.toolbarIcon}>


          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
          
        </div>

        <Container style={{paddingTop: 10}} maxWidth="sm">
            <Avatar style={{height: 100, width: 100, marginTop:0, marginBottom:0, marginLeft: 'auto', marginRight: 'auto' }}>{states[2].current_seller_data.name[0].toUpperCase()}</Avatar>

      <h5 style={{paddingTop: 15, paddingBottom: 5}}>{states[2].current_seller_data.name}</h5>
        </Container>
        <Divider />
        <List><MainListItems states={states} setStates={setStates}/></List>
        <Divider />
        <List><SecondaryListItems/></List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        {(states[0] == "Dashboard")?(
         
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                {/* <Chart /> */}
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits totalEarnings={states[2].current_seller_data.commission_earned}/>
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders list={sells.list}/>
              </Paper>
            </Grid>
          </Grid>
        
        ):(
          (states[0] == "Products")?(
            // <CreateProductForm addProduct={addProduct} current_seller_data={{...states[2].current_seller_data}}/>
            <IndexProduct enablePromotion = {enablePromotion} />

            ):(
            (states[0] == "Profile")?(
              <ProfileForm handleSave={handleSave} current_seller_data={{...states[2].current_seller_data}}/>
            ):(
              (states[0] == "Promotions")?(
                <IndexPromotion current_seller_data={{...states[2].current_seller_data}}/>
              ):('')
            )
          )
        )
        }
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}