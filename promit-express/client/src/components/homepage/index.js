import React, { Component } from 'react';
// import firstEmployee from '../../img/header-bg.jpg'

import imgWebDev from '../../img/about/web-developer.jpg'
import imgWebDes from '../../img/about/web-designer.jpg'

import SellerRegistration from './seller_registration';
import PromoterRegistration from './promoter_registration';
import BuyerRegistration from './buyer_registration';
// import ProductsList from '../buyer/index';

// import SellerDashboard from '../seller/dashboard/Dashboard';
 




class HomePage extends Component {

  constructor(props){
    super(props)

    this.state = {
      btnSellerPressed:false,
      btnPromoterPressed:false,
      btnProductsPressed:false,
      btnBuyerPressed:false,
    }
  }

  btnSellerPressed = () =>{
    this.setState({btnSellerPressed:true})
  }

  btnPromoterPressed = () =>{
    this.setState({btnPromoterPressed:true})
  }

  
  btnProductsPressed = () =>{
    this.setState({btnProductsPressed:true})
  }

  
  btnBuyerPressed = () =>{
    this.setState({btnBuyerPressed:true})
  }



    render() {
        return (this.state.btnSellerPressed)?(<div><SellerRegistration/></div>):
        (this.state.btnPromoterPressed)?(<div><PromoterRegistration/></div>):
        (this.state.btnBuyerPressed)?(<div><BuyerRegistration/></div>):(<div id="page-top">
<nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
  <div className="container">
    <a className="navbar-brand js-scroll-trigger" href="#page-top">Promit</a>
    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
      Menu
      <i className="fas fa-bars"></i>
    </button>
    <div className="collapse navbar-collapse" id="navbarResponsive">
      <ul className="navbar-nav text-uppercase ml-auto">
         <li className="nav-item" onClick={()=>this.btnBuyerPressed()}>
          <a className="nav-link js-scroll-trigger" href="#">Products</a>
        </li>
        <li className="nav-item">
          <a className="nav-link js-scroll-trigger" href="#services">Services</a>
        </li>
        {/* <li className="nav-item">
          <a className="nav-link js-scroll-trigger" href="#portfolio">Portfolio</a>
        </li> */}
        <li className="nav-item">
          <a className="nav-link js-scroll-trigger" href="#about">About</a>
        </li>
        <li className="nav-item">
          <a className="nav-link js-scroll-trigger" href="#team">Team</a>
        </li>
        <li className="nav-item">
          <a className="nav-link js-scroll-trigger" href="#contact">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<header className="masthead">
  <div className="container">
    <div className="intro-text">
      <div className="intro-lead-in">Let's Promote it!</div>
      <div className="intro-heading text-uppercase"> SHOP & EARN </div>
      <a className="btn btn-success btn-xl text-uppercase js-scroll-trigger" onClick={()=>this.btnPromoterPressed()}>Promoter</a>
      &nbsp;<a className="btn btn-info btn-xl text-uppercase js-scroll-trigger" onClick={()=>this.btnSellerPressed()}>Seller</a>
      &nbsp;<a className="btn btn-danger btn-xl text-uppercase js-scroll-trigger" onClick={()=>this.btnBuyerPressed()}>Buyer</a>
      <br/>
      <br/>
      <a className="btn btn-primary btn-xl text-uppercase js-scroll-trigger" href="#services">Tell Me More</a>
    </div>  
  </div>
</header>

<section className="page-section" id="services">
  <div className="container">
    <div className="row">
      <div className="col-lg-12 text-center">
        <h2 className="section-heading text-uppercase">Services</h2>
      </div>
    </div>
    <div className="row text-center">
      <div className="col-md-4">
        <span className="fa-stack fa-4x">
          <i className="fas fa-circle fa-stack-2x text-primary"></i>
          <i className="fas fa-mobile fa-stack-1x fa-inverse"></i>
        </span>
        <h4 className="service-heading">Portable</h4>
        <p className="text-muted">We provide an extensive facility to make this application fully portable so that you can monitor and control things on your phone.</p>
      </div>
      <div className="col-md-4">
        <span className="fa-stack fa-4x">
          <i className="fas fa-circle fa-stack-2x text-primary"></i>
          <i className="fas fa-laptop fa-stack-1x fa-inverse"></i>
        </span>
        <h4 className="service-heading">Fully Responsible</h4>
        <p className="text-muted">Our main goal is to make the web application fully responsible so that you may not feel hesitated in using it on any kind of device!</p>
      </div>
      <div className="col-md-4">
        <span className="fa-stack fa-4x">
          <i className="fas fa-circle fa-stack-2x text-primary"></i>
          <i className="fas fa-credit-card fa-stack-1x fa-inverse"></i>
        </span>
        <h4 className="service-heading">Web Security</h4>
        <p className="text-muted">Our application is sorrounded by many libraries so that your content and data are completely secure and private.</p>
      </div>
    </div>
  </div>
</section>

{/* <section className="bg-light page-section" id="portfolio">
  <div className="container">
    <div className="row">
      <div className="col-lg-12 text-center">
        <h2 className="section-heading text-uppercase">Portfolio</h2>
        <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
      </div>
    </div>
    <div className="row">
      <div className="col-md-4 col-sm-6 portfolio-item">
        <a className="portfolio-link" data-toggle="modal" href="#portfolioModal1">
          <div className="portfolio-hover">
            <div className="portfolio-hover-content">
              <i className="fas fa-plus fa-3x"></i>
            </div>
          </div>
          <img className="img-fluid" src="img/portfolio/01-thumbnail.jpg" alt=""/>
        </a>
        <div className="portfolio-caption">
          <h4>Threads</h4>
          <p className="text-muted">Illustration</p>
        </div>
      </div>
      <div className="col-md-4 col-sm-6 portfolio-item">
        <a className="portfolio-link" data-toggle="modal" href="#portfolioModal2">
          <div className="portfolio-hover">
            <div className="portfolio-hover-content">
              <i className="fas fa-plus fa-3x"></i>
            </div>
          </div>
          <img className="img-fluid" src="img/portfolio/02-thumbnail.jpg" alt=""/>
        </a>
        <div className="portfolio-caption">
          <h4>Explore</h4>
          <p className="text-muted">Graphic Design</p>
        </div>
      </div>
      <div className="col-md-4 col-sm-6 portfolio-item">
        <a className="portfolio-link" data-toggle="modal" href="#portfolioModal3">
          <div className="portfolio-hover">
            <div className="portfolio-hover-content">
              <i className="fas fa-plus fa-3x"></i>
            </div>
          </div>
          <img className="img-fluid" src="img/portfolio/03-thumbnail.jpg" alt=""/>
        </a>
        <div className="portfolio-caption">
          <h4>Finish</h4>
          <p className="text-muted">Identity</p>
        </div>
      </div>
      <div className="col-md-4 col-sm-6 portfolio-item">
        <a className="portfolio-link" data-toggle="modal" href="#portfolioModal4">
          <div className="portfolio-hover">
            <div className="portfolio-hover-content">
              <i className="fas fa-plus fa-3x"></i>
            </div>
          </div>
          <img className="img-fluid" src="img/portfolio/04-thumbnail.jpg" alt=""/>
        </a>
        <div className="portfolio-caption">
          <h4>Lines</h4>
          <p className="text-muted">Branding</p>
        </div>
      </div>
      <div className="col-md-4 col-sm-6 portfolio-item">
        <a className="portfolio-link" data-toggle="modal" href="#portfolioModal5">
          <div className="portfolio-hover">
            <div className="portfolio-hover-content">
              <i className="fas fa-plus fa-3x"></i>
            </div>
          </div>
          <img className="img-fluid" src="img/portfolio/05-thumbnail.jpg" alt=""/>
        </a>
        <div className="portfolio-caption">
          <h4>Southwest</h4>
          <p className="text-muted">Website Design</p>
        </div>
      </div>
      <div className="col-md-4 col-sm-6 portfolio-item">
        <a className="portfolio-link" data-toggle="modal" href="#portfolioModal6">
          <div className="portfolio-hover">
            <div className="portfolio-hover-content">
              <i className="fas fa-plus fa-3x"></i>
            </div>
          </div>
          <img className="img-fluid" src="img/portfolio/06-thumbnail.jpg" alt=""/>
        </a>
        <div className="portfolio-caption">
          <h4>Window</h4>
          <p className="text-muted">Photography</p>
        </div>
      </div>
    </div>
  </div>
</section> */}

<section className="page-section" id="about">
  <div className="container">
    <div className="row">
      <div className="col-lg-12 text-center">
        <h2 className="section-heading text-uppercase">About</h2>
        <h3 className="section-subheading text-muted">A breif go through about the company's purpose.</h3>
      </div>
    </div>
    <div className="row">
      <div className="col-lg-12">
        <ul className="timeline">
          <li>
            <div className="timeline-image">
              <img className="rounded-circle img-fluid" src="img/about/1.jpg" alt=""/>
            </div>
            <div className="timeline-panel">
              <div className="timeline-heading">
                <h4 >Introduction</h4>
              </div>
              <div className="timeline-body">
                <p className="text-muted"> PROMIT is a Web application based project in which we will create the automated environment for the people in order to promote the products of the multiple brands. consectetur!</p>
              </div>
            </div>
          </li>
          <li className="timeline-inverted">
            <div className="timeline-image">
              <img className="rounded-circle img-fluid" src="img/about/2.jpg" alt=""/>
            </div>
            <div className="timeline-panel">
              <div className="timeline-heading">
                <h4>The Affiliate</h4>
              </div>
              <div className="timeline-body">
                <p className="text-muted">It’s where the marketing happens. An affiliate promotes one or multiple affiliate products
and tries to attract and convince potential customers of the value of the merchant’s
product so that they actually end up buying it.</p>
              </div>
            </div>
          </li>
          <li>
            <div className="timeline-image">
              <img className="rounded-circle img-fluid" src="img/about/3.jpg" alt=""/>
            </div>
            <div className="timeline-panel">
              <div className="timeline-heading">
                <h4>The Merchant</h4>
              </div>
              <div className="timeline-body">
                <p className="text-muted">From solo entrepreneurs to startups to massive Fortune 500 companies, anyone could be
the merchant behind an affiliate marketing program. They don’t even have to be actively
involved. They just have to have a product to sell.</p>
              </div>
            </div>
          </li>
          <li className="timeline-inverted">
            <div className="timeline-image">
              <img className="rounded-circle img-fluid" src="img/about/4.jpg" alt=""/>
            </div>
            <div className="timeline-panel">
              <div className="timeline-heading">
                <h4>The Consumer</h4>
              </div>
              <div className="timeline-body">
                <p className="text-muted">The customer or consumer makes the affiliate system go ’round. Without sales, there
aren’t any commissions to hand out and no revenue to be shared. They let the tracking
system work in the background, where the customer can follow the purchase process just
as usual and the affiliate still ends up being paid a commission.</p>
              </div>
            </div>
          </li>

          <li >
            <div className="timeline-image">
              <img className="rounded-circle img-fluid" src="img/about/4.jpg" alt=""/>
            </div>
            <div className="timeline-panel">
              <div className="timeline-heading">
                <h4>The Network</h4>
              </div>
              <div className="timeline-body">
                <p className="text-muted">Only some consider the network part of the affiliate marketing equation.  But, we believe
that an affiliate marketing guide needs to include networks, because, in many cases, a
network works as an intermediary between the affiliate and the merchant.</p>
              </div>
            </div>
          </li>
          <li className="timeline-inverted">
            <div className="timeline-image">
              <h4>Be a Member
                <br/>Of
                <br/>PROMIT!</h4>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section className="bg-light page-section" id="team">
  <div className="container">
    <div className="row">
      <div className="col-lg-12 text-center">
        <h2 className="section-heading text-uppercase">Our Amazing Team</h2>
        <h3 className="section-subheading text-muted">Following are the core workers of this project.</h3>
      </div>
    </div>
    <div className="row">
      <div className="col-sm-6">
        <div className="team-member">
          <img className="mx-auto rounded-circle" src={imgWebDes} alt=""/>
          <h4>Shahzada Asad Ali</h4>
          <p className="text-muted">Web Designer</p>
          <ul className="list-inline social-buttons">
            <li className="list-inline-item">
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-sm-6">
        <div className="team-member">
          <img className="mx-auto rounded-circle" src={imgWebDev} alt=""/>
          <h4>M. Shoaib Amin</h4>
          <p className="text-muted">Web Developer</p>
          <ul className="list-inline social-buttons">
            <li className="list-inline-item">
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* <div className="col-sm-4">
        <div className="team-member">
          <img className="mx-auto rounded-circle" style={{height:'100px', width:'100px'}} src={"../../img/team/3.jpg"} alt="sadsadsad"/>
          <h4>Diana Pertersen</h4>
          <p className="text-muted">Lead Developer</p>
          <ul className="list-inline social-buttons">
            <li className="list-inline-item">
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </li>
          </ul>
        </div>
      </div> */}
    </div>
    {/* <div className="row">
      <div className="col-lg-8 mx-auto text-center">
        <p className="large text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eaque, laboriosam veritatis, quos non quis ad perspiciatis, totam corporis ea, alias ut unde.</p>
      </div>
    </div> */}
  </div>
</section>
<section className="py-5">
  <div className="container">
    <div className="row">
      <div className="col-md-3 col-sm-6">
        <a href="#">
          <img className="img-fluid d-block mx-auto" src="img/logos/envato.jpg" alt=""/>
        </a>
      </div>
      <div className="col-md-3 col-sm-6">
        <a href="#">
          <img className="img-fluid d-block mx-auto" src="img/logos/designmodo.jpg" alt=""/>
        </a>
      </div>
      <div className="col-md-3 col-sm-6">
        <a href="#">
          <img className="img-fluid d-block mx-auto" src="img/logos/themeforest.jpg" alt=""/>
        </a>
      </div>
      <div className="col-md-3 col-sm-6">
        <a href="#">
          <img className="img-fluid d-block mx-auto" src="img/logos/creative-market.jpg" alt=""/>
        </a>
      </div>
    </div>
  </div>
</section>

<section className="page-section" id="contact">
  <div className="container">
    <div className="row">
      <div className="col-lg-12 text-center">
        <h2 className="section-heading text-uppercase">Contact Us</h2>
        <h3 className="section-subheading text-muted">Tell us about your complaints</h3>
      </div>
    </div>
    <div className="row">
      <div className="col-lg-12">
        <form id="contactForm" name="sentMessage" noValidate="novalidate">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <input className="form-control" id="name" type="text" placeholder="Your Name *" required="required" data-validation-required-message="Please enter your name."/>
                <p className="help-block text-danger"></p>
              </div>
              <div className="form-group">
                <input className="form-control" id="email" type="email" placeholder="Your Email *" required="required" data-validation-required-message="Please enter your email address."/>
                <p className="help-block text-danger"></p>
              </div>
              <div className="form-group">
                <input className="form-control" id="phone" type="tel" placeholder="Your Phone *" required="required" data-validation-required-message="Please enter your phone number."/>
                <p className="help-block text-danger"></p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <textarea className="form-control" id="message" placeholder="Your Message *" required="required" data-validation-required-message="Please enter a message."></textarea>
                <p className="help-block text-danger"></p>
              </div>
            </div>
            <div className="clearfix"></div>
            <div className="col-lg-12 text-center">
              <div id="success"></div>
              <button id="sendMessageButton" className="btn btn-primary btn-xl text-uppercase" type="submit">Send Message</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

<footer className="footer">
  <div className="container">
    <div className="row align-items-center">
      <div className="col-md-4">
        <span className="copyright">Copyright &copy; Promit 2019</span>
      </div>
      <div className="col-md-4">
        <ul className="list-inline social-buttons">
          <li className="list-inline-item">
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <a href="#">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </li>
        </ul>
      </div>
      <div className="col-md-4">
        <ul className="list-inline quicklinks">
          <li className="list-inline-item">
            <a href="#">Privacy Policy</a>
          </li>
          <li className="list-inline-item">
            <a href="#">Terms of Use</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</footer>


<div className="portfolio-modal modal fade" id="portfolioModal1" tabIndex="-1" role="dialog" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="close-modal" data-dismiss="modal">
        <div className="lr">
          <div className="rl"></div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="modal-body">
              <h2 className="text-uppercase">Project Name</h2>
              <p className="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
              <img className="img-fluid d-block mx-auto" src="img/portfolio/01-full.jpg" alt=""/>
              <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!</p>
              <ul className="list-inline">
                <li>Date: January 2017</li>
                <li>Client: Threads</li>
                <li>Category: Illustration</li>
              </ul>
              <button className="btn btn-primary" data-dismiss="modal" type="button">
                <i className="fas fa-times"></i>
                Close Project</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div className="portfolio-modal modal fade" id="portfolioModal2" tabIndex="-1" role="dialog" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="close-modal" data-dismiss="modal">
        <div className="lr">
          <div className="rl"></div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="modal-body">
              <h2 className="text-uppercase">Project Name</h2>
              <p className="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
              <img className="img-fluid d-block mx-auto" src="img/portfolio/02-full.jpg" alt=""/>
              <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!</p>
              <ul className="list-inline">
                <li>Date: January 2017</li>
                <li>Client: Explore</li>
                <li>Category: Graphic Design</li>
              </ul>
              <button className="btn btn-primary" data-dismiss="modal" type="button">
                <i className="fas fa-times"></i>
                Close Project</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div className="portfolio-modal modal fade" id="portfolioModal3" tabIndex="-1" role="dialog" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="close-modal" data-dismiss="modal">
        <div className="lr">
          <div className="rl"></div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="modal-body">
              <h2 className="text-uppercase">Project Name</h2>
              <p className="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
              <img className="img-fluid d-block mx-auto" src="img/portfolio/03-full.jpg" alt=""/>
              <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!</p>
              <ul className="list-inline">
                <li>Date: January 2017</li>
                <li>Client: Finish</li>
                <li>Category: Identity</li>
              </ul>
              <button className="btn btn-primary" data-dismiss="modal" type="button">
                <i className="fas fa-times"></i>
                Close Project</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div className="portfolio-modal modal fade" id="portfolioModal4" tabIndex="-1" role="dialog" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="close-modal" data-dismiss="modal">
        <div className="lr">
          <div className="rl"></div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="modal-body">
              <h2 className="text-uppercase">Project Name</h2>
              <p className="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
              <img className="img-fluid d-block mx-auto" src="img/portfolio/04-full.jpg" alt=""/>
              <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!</p>
              <ul className="list-inline">
                <li>Date: January 2017</li>
                <li>Client: Lines</li>
                <li>Category: Branding</li>
              </ul>
              <button className="btn btn-primary" data-dismiss="modal" type="button">
                <i className="fas fa-times"></i>
                Close Project</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div className="portfolio-modal modal fade" id="portfolioModal5" tabIndex="-1" role="dialog" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="close-modal" data-dismiss="modal">
        <div className="lr">
          <div className="rl"></div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="modal-body">
              <h2 className="text-uppercase">Project Name</h2>
              <p className="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
              <img className="img-fluid d-block mx-auto" src="img/portfolio/05-full.jpg" alt=""/>
              <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!</p>
              <ul className="list-inline">
                <li>Date: January 2017</li>
                <li>Client: Southwest</li>
                <li>Category: Website Design</li>
              </ul>
              <button className="btn btn-primary" data-dismiss="modal" type="button">
                <i className="fas fa-times"></i>
                Close Project</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div className="portfolio-modal modal fade" id="portfolioModal6" tabIndex="-1" role="dialog" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="close-modal" data-dismiss="modal">
        <div className="lr">
          <div className="rl"></div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="modal-body">
              <h2 className="text-uppercase">Project Name</h2>
              <p className="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
              <img className="img-fluid d-block mx-auto" src="img/portfolio/06-full.jpg" alt=""/>
              <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!</p>
              <ul className="list-inline">
                <li>Date: January 2017</li>
                <li>Client: Window</li>
                <li>Category: Photography</li>
              </ul>
              <button className="btn btn-primary" data-dismiss="modal" type="button">
                <i className="fas fa-times"></i>
                Close Project</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>




            </div>
        )
    }
}

function mapStateToProp(state){
    return({
        userName: state.root.userName
    })
}


export default HomePage;
