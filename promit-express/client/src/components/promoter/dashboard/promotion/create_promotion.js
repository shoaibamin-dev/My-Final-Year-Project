import React from 'react';
import ReactDND from '../../../reactdnd/src'







function CreatePromotion(props) {



  const [states, setStates] = React.useState([false]);

  const navigateDashboard = () => {
    props.navigateDashboard();
  }


 console.log(props, "inside CreatePromotion")
  return (
    <div >
     <ReactDND navigateDashboard={props.navigateDashboard} current_seller_data = {props.current_seller_data} product={props.product}/>
    </div>
  );
}

export default CreatePromotion;
