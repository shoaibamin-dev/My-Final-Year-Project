import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red, blue } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import OverReadOnlyRating from '../../../ratings/overallrating';



import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: blue[500],
  },
}));

export default function ProductCard(props) {

  console.log(props, "ProductCard")

  const classes = useStyles();
  const [states, setStates] = React.useState([false, { rating: 0 }, false]);

  //   const newStates = [...states];
  //   axios.get(`/api/product/${props.product_id}`).then((res)=>{
  //       newStates[1] = {...res.data};
  //       setStates(newStates);
  //   })

  //   console.log("CURSTATE",states)



  const handleExpandClick = () => {
    const newState = [...states];
    newState[0] = !states[0]
    setStates(newState);

  };

  const getOverAllRating = () => {

    if (!states[2]) {
      axios.get(`/api/product/rating/${props.product._id}`).then((res) => {
        console.log("getOverAllRating res.data", res.data);

              const newStates = [ ...states ];
                newStates[1].rating = res.data.rating;
                newStates[2] = true;
                console.log(newStates, "newSTATES")
                setStates(newStates);
      })
    }
  }

  getOverAllRating();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.product.name[0].toUpperCase()}
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        action={
          <OverReadOnlyRating rating = {states[1].rating}/>
        }
        title={props.product.name}
        subheader={props.product.register_date.substring(0, 10)}
      />

      {props.product.pictures_id.map((elem, index) => {
        return <CardMedia
          key={index}
          className={classes.media}
          image={`/api/image/${props.product.pictures_id[index]}`}
          title={props.product.pictures_id[index]}
          style={{ marginTop: 10, marginBottom: 10 }}
        />
      })}


      <CardContent>
        <Typography variant="body2" component="p">
          {props.product.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: states[0],
          })}
          onClick={handleExpandClick}
          aria-expanded={states[0]}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={states[0]} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Description:</Typography>
          <Typography paragraph>
            {props.product.desc}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
