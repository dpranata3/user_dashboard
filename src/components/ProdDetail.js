import React, { Component } from "react";
import axios from "../config/axios";
import cookies from 'universal-cookie'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import swal from '@sweetalert/with-react'

import {onAddCart} from '../actions/cart'

const cookie = new cookies()

class ProdDetail extends Component {
  // format IDR
  constructor(props) {
    super(props);
    this.formatterIDR = new Intl.NumberFormat("id", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    });
  }

  state = {
    productDetail: [],
    url: ""
  };

  componentDidMount() {
    this.getProdDetail();
  }

  getProdDetail = () => {
    const prod_id = this.props.match.params.prod_id;
    axios.get(`/products/view/${prod_id}`).then(res => {
      this.setState({
        productDetail: res.data[0],
        url: `http://localhost:2019/products/images/${res.data[0].prod_image}`
      });
    });
  };

  // Input data ke td_carts
  onAddCarts = async () => {
    const prod_price = this.state.productDetail.prod_price;
    const username = cookie.get("masihLogin");
    const prod_id = parseInt(this.props.match.params.prod_id);

    const qty = parseInt(this.iQty.value);
    const total_price = parseInt(qty * prod_price);

    await this.props.onAddCart(username, prod_id, qty, total_price);

    swal({
      title: "Cart Added",
      text: "Product has been added to cart",
      icon: "success",
      button: "OK"
    }).then(() => {
      window.location.href = `/`;
    });
  };

  render() {
    let prods = this.state.productDetail;
    let users = this.props.user

    if(users.username!==""){
      return (
        <main className="mt-5 pt-4">
          <div className="container wow fadeIn">
            <h2 className="my-3 h2 text-center">{prods.prod_name} </h2>
            <div className="row">
              <div className="col-md-6 mb-4">
                <img src={this.state.url} className="img-fluid" alt="products" />
              </div>
  
              <div className="col-md-6 mb-4">
                <div className="p-4">
                  <div className="mb-3">
                    <a href="/">
                      <span className="badge purple mr-1">{prods.prod_name}</span>
                    </a>
                  </div>
  
                  <p className="lead">
                    <span>{this.formatterIDR.format(prods.prod_price)}</span>
                  </p>
  
                  <p className="lead font-weight-bold">Description</p>
  
                  <p>{prods.prod_desc}</p>
  
                  <form className="d-flex justify-content-left">
                    <input
                      ref={input => (this.iQty = input)}
                      type="number"
                      defaultValue="1"
                      min={0}
                      aria-label="Search"
                      className="form-control"
                      style={{ width: "100px" }}
                    />
                    <button
                      className="btn btn-primary btn-md ml-2 my-0 p"
                      onClick={this.onAddCarts}
                      type="button"
                    >
                      Add to cart
                      <i className="fas fa-shopping-cart ml-2" />
                    </button>
                    <button
                      className="btn btn-success btn-md ml-2 my-0 p"
                      type="button"
                    >
                      Add to Wishlist
                      <i className="fas fa-hands ml-2" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      );
    }
    else {
      return (
        <main className="mt-5 pt-4">
          <div className="container wow fadeIn">
            <h2 className="my-3 h2 text-center">{prods.prod_name} </h2>
            <div className="row">
              <div className="col-md-6 mb-4">
                <img
                  src={this.state.url}
                  className="img-fluid"
                  alt="products"
                />
              </div>

              <div className="col-md-6 mb-4">
                <div className="p-4">
                  <div className="mb-3">
                    <a href="/">
                      <span className="badge purple mr-1">
                        Category 2
                      </span>
                    </a>
                    <a href="/">
                      <span className="badge blue mr-1">New</span>
                    </a>
                    <a href="/">
                      <span className="badge red mr-1">Bestseller</span>
                    </a>
                  </div>

                  <p className="lead">
                    <span>
                      {this.formatterIDR.format(
                        this.state.productDetail.prod_price
                      )}
                    </span>
                  </p>

                  <p className="lead font-weight-bold">Description</p>

                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Et dolor suscipit libero eos atque quia ipsa
                    sint voluptatibus! Beatae sit assumenda asperiores
                    iure at maxime atque repellendus maiores quia
                    sapiente.
                  </p>

                  <form className="d-flex justify-content-left">
                    <input
                      ref={input => (this.iQty = input)}
                      type="number"
                      defaultValue="1"
                      min={0}
                      aria-label="Search"
                      className="form-control"
                      style={{ width: "100px" }}
                    />
                    <Link to="/login">
                      <button
                        className="btn btn-primary btn-md ml-2 my-0 p"
                        type="button"
                      >
                        Add to cart
                        <i className="fas fa-shopping-cart ml-2" />
                      </button>
                    </Link>
                    <Link to="/login">
                      <button
                        className="btn btn-success btn-md ml-2 my-0 p"
                        type="button"
                      >
                        Add to Wishlist
                        <i className="fas fa-hands ml-2" />
                      </button>
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      );
    }


    
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth
  };
};


export default connect(mapStateToProps,{onAddCart})(ProdDetail);
