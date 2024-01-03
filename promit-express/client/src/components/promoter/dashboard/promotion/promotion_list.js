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


const axios = require('axios');


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

export default function PromotionCard(props) {

  console.log(props, "PromotionCard")

  const classes = useStyles();
  const [states, setStates] = React.useState([false, {}]);

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

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.promotion.name[0].toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.promotion.name}
        subheader={props.promotion.register_date.substring(0, 10)}


      />

      <a href={`http://localhost:5000/api/image/${props.promotion.picture_id}`} target="_blank"><CardMedia
        className={classes.media}
        image={`/api/image/${props.promotion.picture_id}`}
        title="picture"
        style={{ marginTop: 10, marginBottom: 10 }}
      /></a>

      <CardContent>
        <Typography variant="body2" component="p">
          {props.promotion.title}
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
            {props.promotion.desc}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
