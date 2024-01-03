import React from 'react';
import logo from './logo.svg';
import "./css/firebaseauth.css";
import './App.css';
import './components/auth/firebase'

import HomePage from './components/homepage';
import SellerDashboard from './components/seller/dashboard/Index';
import ReactDND from './components/reactdnd/src'

import {Foo,Bar} from './components/ratings/index'

// import {AuthFirebase} from './components/auth/firebase'

// import {Mailer} from './components/nodemailer/App'

// import './vendor/jquery/jquery.js'
// import './vendor/bootstrap/js/bootstrap.bundle.js'
// import './vendor/jquery-easing/jquery.easing.js'

// import './js/agency'



function App() {
 
  return (
    <div className="App">
      {/* <AuthFirebase/> */}
      {/* <Mailer/> */}
      {/* <ReactDND/> */}
      {/* <SellerDashboard current_seller_data =  {{"category_of_interest":[],"products":[],"address":"","money_earned":0,"_id":"5ed736c1dc698b023cc300c1","name":"Shoaib Seller","email":"iamsell@gmail.com","password":"seller123","city":"Karachi","country":"Pakistan","register_date":"2020-06-03T05:36:01.035Z","__v":0}}/> */}
      <HomePage/>
  
      
      {/* <script src={"./js/agency.js"} type={"text/javascript"}></script> */}
    </div>
  );
}

export default App;
