import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

import ReadOnlyRating from '../../ratings/readonlyrating';
 

import axios from 'axios';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
  createData(2, '16 Mar, 2019', 'Tom ASDAD', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
 
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders(props) {

  const classes = useStyles();

  console.log("ORDERS PROPS",props)

  const [states, setStates] = React.useState({ list: [], isLoaded: true });

  




  return (states.isLoaded)?(
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
        <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>PPU</TableCell>
            <TableCell>Buying Amount</TableCell>
            <TableCell align="right">Money Spent</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {props.list.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>{row.price}$</TableCell>
              <TableCell>{row.quantity * row.price}$</TableCell>
              <TableCell align="right">{(row.quantity * row.price)}$</TableCell>
              {/* <TableCell align="right">{Math.floor((row.quantity * row.price)*0.1)}$</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div> */}
    </React.Fragment>
  ):('');
}