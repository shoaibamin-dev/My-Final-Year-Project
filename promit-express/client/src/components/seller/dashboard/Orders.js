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
import axios from 'axios'

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
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

  console.log("Orderprops", props)

  // const [states, setStates] = React.useState({ list: [], isLoaded: false });


  // const loadSells = () => {

  //   // console.log("props.products_sold[0]",props.products_sold[0])


  //   if (!states.isLoaded) {
  //     console.log("length",Object.keys(props.products_sold).length)
  //     let joined_sold_products = [];
  //     let p_sold = props.products_sold;
  //     let oc =0;
  //     for (var property in p_sold) {
  //       if (p_sold.hasOwnProperty(property)) {
         
  //           let elem = p_sold[property];
  //           console.log(elem, "ELEM")


  //           axios.get(`/api/product/${elem[1]}`).then(product_result => {

  //             const cloned_product_result = product_result.data;

  //             console.log("cloned_product_result", cloned_product_result)


  //             cloned_product_result.newId = elem[0];
  //             cloned_product_result.quantity = elem[5];
             


  //             //   let merged = { ...cloned_product_result, ...elem[4] };
  //             joined_sold_products.push(cloned_product_result);

  //             if (Object.keys(props.products_sold).length == oc + 1) {
  //               const newStates = { ...states };
  //               newStates.list = joined_sold_products.slice();
  //               newStates.isLoaded = true;
  //               console.log(newStates, "newSTATES")
  //               setStates(newStates);
  //             }

  //             oc++;
  //             // console.log("ELEM", product_result)

  //           })






  //       }
  //     }








  //     // }





  //   }
  // }

  // loadSells();

  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Sold Date</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>PPU</TableCell>
            <TableCell>Sale Amount</TableCell>
            <TableCell>Customers Rating</TableCell>
            <TableCell align="right">Net Income (-10%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.list.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.soldDate?row.soldDate:row.register_date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>{row.price}$</TableCell>
              <TableCell>{row.quantity * row.price}$</TableCell>
              <TableCell><ReadOnlyRating  exchanges={row.exchanges}  new_id={row.referenceBuyerId}/></TableCell>
              <TableCell align="right">{(row.quantity * row.price) - (row.quantity * row.price)/10}$</TableCell>
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
  );
}