import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from '../config/axios'
import cookies from 'universal-cookie'

import {onLogoutUser} from '../actions/index'

const cookie = new cookies()

class Navbar extends Component {
  state = {
    countCart: ""
  };

  componentDidMount(){
    this.getCountCart()
    
    
  }

  getCountCart = () => {
    const username = cookie.get('masihLogin')
    
    axios.get(`/carts/count/${username}`).then(res => {
      this.setState({ countCart: res.data });
    });
  };

  render() {
    let users = this.props.user;
    
    
    if(this.state.countCart.length){
      var countCart=this.state.countCart[0].total_cart
    }
    
    if (users.username !== "") {
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
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              {/* <!-- Left --> */}
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="nav-link waves-effect" href="/">
                    Order
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link waves-effect" href="/">
                    Payment
                  </a>
                </li>
                <li className="nav-item">
                  <Link
                    to={`/wishlist/${users.username}`}
                    className="nav-link waves-effect"
                  >
                    Wishlist
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={`/profile/${users.username}`}
                    className="nav-link waves-effect"
                  >
                    Profile
                  </Link>
                </li>
              </ul>

              {/* <!-- Right --> */}
              <ul className="navbar-nav nav-flex-icons">
                <li className="nav-item">
                  <Link
                    to={`/cart/${users.username}`}
                    className="nav-link waves-effect"
                  >
                    <span className="badge red z-depth-1 mr-1">
                      {countCart}
                    </span>
                    <i className="fas fa-shopping-cart" />
                    <span className="clearfix d-none d-sm-inline-block">
                      {" "}
                      Cart{" "}
                    </span>
                  </Link>
                </li>
                <label className="nav-link">Hello {users.username}</label>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/"
                    onClick={this.props.onLogoutUser}
                  >
                    <i className="fas fa-power-off" />
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
          <a className="navbar-brand waves-effect" href="/">
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
                <a className="nav-link waves-effect" href="/">
                  Wishlist
                </a>
              </li>
            </ul>

            {/* <!-- Right --> */}
            <ul className="navbar-nav nav-flex-icons">
              <li className="nav-item">
                <a className="nav-link waves-effect" href="/">
                  <span className="badge red z-depth-1 mr-1">
                    {" "}
                    isi sama count cart
                  </span>
                  <i className="fas fa-shopping-cart" />
                  <span className="clearfix d-none d-sm-inline-block">
                    {" "}
                    Cart{" "}
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  <i className="fas fa-sign-in-alt" />
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