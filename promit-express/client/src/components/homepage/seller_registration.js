import React, { Component } from 'react';
import '../../css/seller/registration.css';
import imgSignup from '../../css/images/signup-image.jpg'
import imgSignin from '../../css/images/signin-image.jpg'
import firebase from 'firebase';
import * as firebaseui from 'firebaseui'

import SellerDashboard from '../seller/dashboard/Index';


const Swal = require('sweetalert2')
const axios = require('axios');

export default class SellerRegistration extends Component {
    constructor(props) {
        super(props)

        this.state = {

            name: '',
            email: '',
            pass: '',
            cpass: '',


            log_email: 'iamsell@gmail.com',
            log_pass: 'seller123',

            user_signed_in: false,

            current_seller_data: {}


        }


    }

    handleSubmitRegistration = (ev) => {
        console.log(this.state, "REGIS")
        ev.preventDefault();


        let OTPConfirmed = false;


        var uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                    OTPConfirmed = true;
                }
            },
            signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.

                firebase.auth.PhoneAuthProvider.PROVIDER_ID
            ],
            // tosUrl and privacyPolicyUrl accept either url string or a callback
            // function.
            // Terms of service url/callback.
            tosUrl: 'http://localhost:3000/',
            // Privacy policy url/callback.
            privacyPolicyUrl: function () {
                window.location.assign('http://localhost:3000/');
            }
        };



        // Initialize the FirebaseUI Widget using Firebase.
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        // The start method will wait until the DOM is loaded.

        Swal.fire({
            icon: 'success',
            html: '<div id="firebaseui-auth-container2" ></div>',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.value) {


                if (OTPConfirmed) {




                    let self = this;
                    let newSeller = {
                        name: this.state.name,
                        email: this.state.email,
                        password: this.state.pass
                    };
            
                    axios.post('/api/seller', newSeller)
                        .then(function (response) {
                            console.log(response.data.error)
                            if (response.data.error) {
                                Swal.fire(
                                    'Email already occupied',
                                    'Try using a different email address',
                                    'error'
                                )
            
                            }
            
                            else {
                                Swal.fire(
                                    'You signed up successfully!?',
                                    'Add your products and earn!',
                                    'success'
                                )
                                self.setState({
                                    name: '',
                                    email: '',
                                    pass: '',
                                    cpass: '',
            
                                    log_email: 'iamsell@gmail.com',
                                    log_pass: 'seller123'
                                })
                            }
            
                            console.log(response)
                        })



                }
            }
        });
















            ui.start('#firebaseui-auth-container2', uiConfig);
    }


    handleSubmitLogin = (ev) => {
        console.log(this.state, "LOGIN")
        ev.preventDefault();
        let self = this;
        let curSeller = {
            email: this.state.log_email,
            password: this.state.log_pass
        };

        axios.get(`/api/seller/login?email=${this.state.log_email}&password=${this.state.log_pass}`)
            .then(function (response) {
                if (response.data) {
                    Swal.fire({
                        title: 'Welcome ' + response.data.name,
                        text: 'Start selling products!!!',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.value) {
                            self.setState({
                                log_email: '',
                                log_pass: '',
                                user_signed_in: true,
                                current_seller_data: response.data
                            })
                        }
                    })



                }
                else {
                    return Swal.fire(
                        'Invalid Credentials',
                        'You might have forgotten your email or password',
                        'error'
                    )


                }
            }).catch(function (error) {

            })
    }

    handleChange = (event, attr) => {
        if (attr === 'name') {
            this.setState({ name: event.target.value });
        }
        else if (attr === 'email') {
            this.setState({ email: event.target.value });
        }

        else if (attr === 'pass') {
            this.setState({ pass: event.target.value });
        }

        else if (attr === 'cpass') {
            this.setState({ cpass: event.target.value });
        }

        else if (attr === 'log_email') {
            this.setState({ log_email: event.target.value });
        }

        else if (attr === 'log_pass') {
            this.setState({ log_pass: event.target.value });
        }
    }



    render() {
        return (this.state.user_signed_in) ? (<SellerDashboard current_seller_data={this.state.current_seller_data} />) : (
            <div class="main">

                <h1 className="form-title seller-intro"> SELLER REGISTRATION </h1>
                <br />

                <div class="signup">
                    <div class="container">
                        <div class="signup-content">
                            <div class="signup-form">
                                <h2 class="form-title">Sign up</h2>
                                <form onSubmit={(ev) => { this.handleSubmitRegistration(ev) }} class="register-form" id="register-form">
                                    <div class="form-group">
                                        <label for="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                        <input value={this.state.name} onChange={(ev) => this.handleChange(ev, 'name')} type="text" name="name" id="name" placeholder="Your Name" />
                                    </div>
                                    <div class="form-group">
                                        <label for="email"><i class="zmdi zmdi-email"></i></label>
                                        <input value={this.state.email} onChange={(ev) => this.handleChange(ev, 'email')} type="email" name="email" id="email" placeholder="Your Email" />
                                    </div>
                                    <div class="form-group">
                                        <label for="pass"><i class="zmdi zmdi-lock"></i></label>
                                        <input minLength="6" value={this.state.pass} onChange={(ev) => this.handleChange(ev, 'pass')} type="password" name="pass" id="pass" placeholder="Password" />
                                    </div>
                                    <div class="form-group">
                                        <label for="re-pass"><i class="zmdi zmdi-lock-outline"></i></label>
                                        <input minLength="6" value={this.state.cpass} onChange={(ev) => this.handleChange(ev, 'cpass')} type="password" name="re_pass" id="re_pass" placeholder="Repeat your password" />
                                    </div>

                                    <div class="form-group form-button">
                                        <input type="submit" name="signup" id="signup-seller"  className="form-submit btn btn-info btn-xl text-uppercase js-scroll-trigger" value="Register" />
                                    </div>
                                </form>
                            </div>
                            <div class="signup-image">
                                <figure><img src={imgSignup} alt="sing up image" /></figure>
                            </div>
                        </div>
                    </div>
                </div>

                <hr />
                <div class="sign-in">
                    <div class="container">
                        <div class="signin-content">
                            <div class="signin-image">
                                <figure><img src={imgSignin} alt="sign up image" /></figure>
                            </div>

                            <div class="signin-form">
                                <h2 class="form-title">Sign in</h2>
                                <form onSubmit={(ev) => { this.handleSubmitLogin(ev) }} class="register-form" id="login-form">
                                    <div class="form-group">
                                        <label for="your_email"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                        <input value={this.state.log_email} onChange={(ev) => this.handleChange(ev, 'log_email')} type="text" name="your_email" id="your_email" placeholder="Your Email" />
                                    </div>
                                    <div class="form-group">
                                        <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                                        <input value={this.state.log_pass} onChange={(ev) => this.handleChange(ev, 'log_pass')} type="password" name="your_pass" id="your_pass" placeholder="Password" />
                                    </div>
                                    <div class="form-group form-button">
                                        <input type="submit" name="signin" id="signin-seller"  className="form-submit btn btn-info btn-xl text-uppercase js-scroll-trigger" value="Log in" />
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}