import React, {Component} from 'react'
import axios from '../config/axios';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import { Link } from "react-router-dom";
import cookies from 'universal-cookie';
import swal from '@sweetalert/with-react';

import {onSaveCarts} from '../actions/cart'


const cookie = new cookies()

class Cart extends Component {
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
    carts: [],
    checkout:0,
    selectedId:0
  };

  componentDidMount() {
    this.getCartList()
  }

  getCartList = () => {
    const username = cookie.get("masihLogin");
    axios.get(`/carts/view/${username}`)
      .then(res => {
        this.setState({ carts: res.data });
    });
  };

  onCartDel = async id => {
    const ask = window.confirm("Are you sure want delete this cart?");

    if(ask){
     await axios.delete(`/carts/del/${id}`).then(res => {
      swal({
        title: "Data Deleted",
        text: "Cart has been deleted",
        icon: "success",
        button: "OK"
      }).then(()=>{
        this.getCartList()
      })
      });
    }

    
  };

  onSaveCart= async id =>{
    const cart_id = id
    const qty = parseInt(this.eCartQty.value) 

    await this.props.onSaveCarts(cart_id,qty);
    swal({
      title: "Data Updated",
      text: "Cart has been updated",
      icon: "success",
      button: "OK"
    }).then(()=>{
      window.location.href = `/`;
    })
  }

  onEditCart = id =>{
    this.setState({selectedId:id})
  }

  checkoutBtn=()=>{
      return (      
            <Link to='/cart/checkout'>
            <button className="btn btn-warning" type="button">
              Checkout
            </button>
            </Link>
      )
  }

  renderList = () => {
    
    return this.state.carts.map(cart => {
      let subTotal = cart.qty * cart.prod_price;
      if(cart.cart_id !==this.state.selectedId){
        return (
          <tr key={cart.cart_id}>
            <td className="text-center">{cart.cart_id}</td>
            <td className="text-center">{cart.prod_name}</td>
            <td className="text-center">
            <a href={`http://localhost:2019/products/images/${
                    cart.prod_image
                  }`} target="__blank">
            <img
                  src={`http://localhost:2019/products/images/${
                    cart.prod_image
                  }`}
                  alt={cart.prod_name}
                  style={{ width: "50px", height: "50px" }}
                />
            </a>
               
            
            </td>
            <td className="text-center">{this.formatterIDR.format(cart.prod_price)}</td>
            <td className="text-center">{cart.qty}</td>
            <td className="text-center">{this.formatterIDR.format(subTotal)}</td>
            <td>
              <button
                className="btn btn-primary mr-2"
                onClick={()=>{this.onEditCart(cart.cart_id)}}
              >
               <i className="fas fa-edit" /> 
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  this.onCartDel(cart.cart_id);
                }}
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        );
      } 
      else{
        return (
          <tr key={cart.cart_id}>
            <td className="text-center">{cart.cart_id}</td>
            <td className="text-center">{cart.prod_name}</td>
            <td className="text-center">
              <Link to={`/productDetail/${cart.prod_id}`}>
                <img
                  src={`http://localhost:2019/products/images/${
                    cart.prod_image
                  }`}
                  alt={cart.prod_name}
                  style={{ width: "50px", height: "50px" }}
                />
              </Link>
            </td>
            <td className="text-center">
              {this.formatterIDR.format(cart.prod_price)}
            </td>
            <td className="text-center">
              <input
                className="form-control"
                ref={input => {
                  this.eCartQty = input;
                }}
                type="number"
                min={1}
                defaultValue={cart.qty}
              />
            </td>
            <td className="text-center">
              {this.formatterIDR.format(subTotal)}
            </td>
            <td>
              <button
                className="btn btn-success mr-2"
                onClick={() => {
                  this.onSaveCart(cart.cart_id);
                }}
              >
                <i className="fas fa-save" />
              </button>
              <button
                className="btn btn-warning"
                onClick={() => {
                  this.setState({ selectedId: 0 });
                }}
              >
                <i className="fas fa-ban" />
              </button>
            </td>
          </tr>
        );
      }
       
      }) 
  }

  render() {
    let user = this.props.user;
    if (user.username !== "") {
      if (this.state.carts.length > 0) {
        return (
          <main className="mt-5 pt-4">
            <div className="container wow fadeIn">
              <h2 className="my-3 h2 text-center">{user.username} Cart</h2>
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th className="text-center">Id</th>
                    <th className="text-center">Product Name</th>
                    <th className="text-center">Product Image</th>
                    <th className="text-center">Product Price</th>
                    <th className="text-center">Qty</th>
                    <th className="text-center">Sub Total</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>{this.renderList()}</tbody>
              </table>

              <table className="table table-bordered table-hover">
                <tbody className="text-center">{this.checkoutBtn()}</tbody>
              </table>
            </div>
          </main>
        )
      } else {
        return (
          <main className="mt-5 pt-4">
            <div className="container mt-5">
            <div className=" row d-flex justify-content-center">
              <h1 className="display-4">YOU DON'T HAVE ANY ITEM ON CART PLEASE GOT TO <Link to='/'>GO SHOP</Link> </h1>
            </div>
          </div>
          </main>
        )
      }
    }
      
    return <Redirect to="/login" />;
  }
}

const mapStateToProps = state => {
    return {
      user: state.auth
    };
  };

export default connect(mapStateToProps,{onSaveCarts})(Cart)