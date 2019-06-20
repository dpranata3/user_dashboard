import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {onLogoutUser} from '../actions/index'

class Navbar extends Component {
  render() {
    let users = this.props.user
    
    if(users.username !==""){
      return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-light white scrolling-navbar">
          <div className="container">
            {/* <!-- Brand --> */}
            <Link className="navbar-brand wave-effect" to="/">
            <strong className="blue-text">Skin Shop</strong>
            </Link>
              
            
  
            {/* <!-- Collapse --> */}
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
  
            {/* <!-- Links --> */}
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              {/* <!-- Left --> */}
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="nav-link waves-effect" href="www.google.com">
                    Order
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link waves-effect"
                    href="www.google.com"  
                  >
                    Payment
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link waves-effect"
                    href="www.google.com"
                  >
                    Wishlist
                  </a>
                </li>
                <li className="nav-item">
                  <Link to={`/profile/${users.username}`} className="nav-link waves-effect">Profile</Link>
                </li>
              </ul>
  
              {/* <!-- Right --> */}
              <ul className="navbar-nav nav-flex-icons">
                <li className="nav-item">
                  <a className="nav-link waves-effect" href="www.google.com">
                    <span className="badge red z-depth-1 mr-1"> isi sama count cart</span>
                    <i className="fas fa-shopping-cart" />
                    <span className="clearfix d-none d-sm-inline-block"> Cart </span>
                  </a>
                </li>
                <label className="nav-link">Hello {users.username}</label>
                <li className="nav-item">
                  
                 <Link className="nav-link" to='/' onClick={this.props.onLogoutUser}>
                    <i className="fas fa-power-off"></i>
                 </Link>
                   
                 
                </li>
              
              </ul>
            </div>
          </div>
        </nav>
      );
    } 
      return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-light white scrolling-navbar">
          <div className="container">
            {/* <!-- Brand --> */}
            <a
              className="navbar-brand waves-effect"
              href="www.google.com"
            >
              <strong className="blue-text">Skin Shop</strong>
            </a>
  
            {/* <!-- Collapse --> */}
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
  
            {/* <!-- Links --> */}
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              {/* <!-- Left --> */}
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a
                    className="nav-link waves-effect"
                    href="www.google.com"
                  >
                    Wishlist
                  </a>
                </li>
              </ul>
  
              {/* <!-- Right --> */}
              <ul className="navbar-nav nav-flex-icons">
                <li className="nav-item">
                  <a className="nav-link waves-effect" href="www.google.com">
                    <span className="badge red z-depth-1 mr-1"> isi sama count cart</span>
                    <i className="fas fa-shopping-cart" />
                    <span className="clearfix d-none d-sm-inline-block"> Cart </span>
                  </a>
                </li>
                <li className="nav-item">
                 <Link to='/login' className="nav-link">
                    <i className="fas fa-sign-in-alt"></i>
                 </Link>
                   
                 
                </li>
              
              </ul>
            </div>
          </div>
        </nav>
      );
    
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth
  };
};

export default connect(mapStateToProps,{onLogoutUser})(Navbar)