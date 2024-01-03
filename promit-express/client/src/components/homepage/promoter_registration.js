import React, { Component } from 'react';
import '../../css/promoter/registration.css';
import imgSignup from '../../css/images/signup-image.jpg'
import imgSignin from '../../css/images/signin-image.jpg'
import PromoterDashboard from '../promoter/dashboard/Index';

import firebase from 'firebase';
import * as firebaseui from 'firebaseui'


const Swal = require('sweetalert2')
const axios = require('axios');




export default class PromoterRegistration extends Component {
    constructor(props) {
        super(props)

        this.state = {

            name: '',
            email: '',
            pass: '',
            cpass: '',

            log_email: 'promoter1@gmail.com',
            log_pass: 'promoter1@gmail.com',

            user_signed_in: false


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
            html: '<div id="firebaseui-auth-container3" ></div>',
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
            
                    axios.post('/api/promoter', newSeller)
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
                                    'Login and explore us more',
                                    'success'
                                )
                                self.setState({
                                    name: '',
                                    email: '',
                                    pass: '',
                                    cpass: '',
            
                                    log_email: '',
                                    log_pass: ''
                                })
                            }
            
                            console.log(response)
                        })
            






                }
            }
        })






















            ui.start('#firebaseui-auth-container3', uiConfig);

    }


    handleSubmitLogin = (ev) => {
        console.log(this.state, "LOGIN")
        ev.preventDefault();
        let self = this;
        let curSeller = {
            email: this.state.log_email,
            password: this.state.log_pass
        };

        axios.get(`/api/promoter/login?email=${this.state.log_email}&password=${this.state.log_pass}`)
            .then(function (response) {
                if (response.data) {
                    Swal.fire({
                        title: 'Welcome ' + response.data.name,
                        text: 'Start promoting products!!!',
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
        return (this.state.user_signed_in) ? (<PromoterDashboard current_seller_data={this.state.current_seller_data} />) : (
            <div className="main">

                <br />

                <h1 className="form-title promoter-intro"> PROMOTER REGISTRATION </h1>

                <div className="signup">
                    <div className="container">
                        <div className="signup-content">
                            <div className="signup-form">


                                <h2 className="form-title">Sign up</h2>
                                <form onSubmit={(ev) => { this.handleSubmitRegistration(ev) }} className="register-form" id="register-form">
                                    <div className="form-group">
                                        <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                        <input value={this.state.name} onChange={(ev) => this.handleChange(ev, 'name')} type="text" name="name" id="name" placeholder="Your Name" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                                        <input value={this.state.email} onChange={(ev) => this.handleChange(ev, 'email')} type="email" name="email" id="email" placeholder="Your Email" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="pass"><i className="zmdi zmdi-lock"></i></label>
                                        <input minLength="6" value={this.state.pass} onChange={(ev) => this.handleChange(ev, 'pass')} type="password" name="pass" id="pass" placeholder="Password" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="re-pass"><i className="zmdi zmdi-lock-outline"></i></label>
                                        <input minLength="6" value={this.state.cpass} onChange={(ev) => this.handleChange(ev, 'cpass')} type="password" name="re_pass" id="re_pass" placeholder="Repeat your password" />
                                    </div>

                                    <div className="form-group form-button">
                                        <input type="submit" name="signup" id="signup-promoter" className="form-submit btn btn-success btn-xl text-uppercase js-scroll-trigger" value="Register" />
                                    </div>
                                </form>
                            </div>
                            <div className="signup-image">
                                <figure><img src={imgSignup} alt="sign up image" /></figure>
                            </div>
                        </div>
                    </div>
                </div>

                <hr />
                <div className="sign-in">
                    <div className="container">
                        <div className="signin-content">
                            <div className="signin-image">
                                <figure><img src={imgSignin} alt="sign up image" /></figure>
                            </div>

                            <div className="signin-form">
                                <h2 className="form-title">Sign in</h2>
                                <form onSubmit={(ev) => { this.handleSubmitLogin(ev) }} className="register-form" id="login-form">
                                    <div className="form-group">
                                        <label htmlFor="your_email"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                        <input value={this.state.log_email} onChange={(ev) => this.handleChange(ev, 'log_email')} type="text" name="your_email" id="your_email" placeholder="Your Email" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="your_pass"><i className="zmdi zmdi-lock"></i></label>
                                        <input value={this.state.log_pass} onChange={(ev) => this.handleChange(ev, 'log_pass')} type="password" name="your_pass" id="your_pass" placeholder="Password" />
                                    </div>
                                    <div className="form-group form-button">
                                        <input type="submit" name="signin" id="signin-promoter" className="form-submit btn btn-success btn-xl text-uppercase js-scroll-trigger" value="Log in" />
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