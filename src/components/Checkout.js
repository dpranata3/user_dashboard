import React,{Component} from 'react'
import axios from '../config/axios'
import cookies from 'universal-cookie'
import { connect } from 'react-redux';
import {Link,Redirect} from 'react-router-dom'
import swal from '@sweetalert/with-react'

const cookie = new cookies()

class Checkout extends Component {
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
    profiles: [],
    totalCarts: [],
    shippings: [],
    shipCosts: 0,
    shipName: "",
    newFirstname: "",
    newLastname: "",
    newAddress: "",
    newPhone: "",
    newEmail: ""
  };

  componentDidMount() {
    this.getCarts();
    this.getTotalCart();
    this.getProfiles();
    this.getShipping();
  }

  getCarts = () => {
    const username = cookie.get("masihLogin");
    axios.get(`/carts/view/${username}`).then(res => {
      this.setState({ carts: res.data });
    });
  };

  getTotalCart = () => {
    const username = cookie.get("masihLogin");
    axios.get(`/carts/sum/${username}`).then(res => {
      this.setState({ totalCarts: res.data });
    });
  };

  getProfiles = () => {
    const username = cookie.get("masihLogin");
    axios.get(`/users/username/${username}`).then(res => {
      this.setState({ profiles: res.data });
    });
  };

  getShipping = () => {
    axios.get(`/shippings/list`).then(res => {
      this.setState({ shippings: res.data });
    });
  };

  cartList = () => {
    return this.state.carts.map(cart => {
      let subTotal = cart.qty * cart.prod_price;

      return (
        <tr key={cart.cart_id}>
          <td className="text-center">{cart.cart_id}</td>
          <td className="text-center">{cart.prod_name}</td>
          <td className="text-center">
            <Link to={`/productDetail/${cart.prod_id}`}>
              <img
                src={`http://localhost:2019/products/images/${cart.prod_image}`}
                alt={cart.prod_name}
                style={{ width: "50px", height: "50px" }}
              />
            </Link>
          </td>
          <td className="text-center">
            {this.formatterIDR.format(cart.prod_price)}
          </td>
          <td className="text-center">{cart.qty}</td>
          <td className="text-center">{this.formatterIDR.format(subTotal)}</td>
        </tr>
      );
    });
  };

  cartTotal = () => {
    return this.state.totalCarts.map(totCart => {
      return (
        <tr key={totCart.total_qty}>
          <td className="text-center">{totCart.total_qty}</td>
          <td className="text-center">
            {this.formatterIDR.format(totCart.total_price)}
          </td>
        </tr>
      );
    });
  };

  onSelectedService = async () => {
    if (
      this.services.value !== "" &&
      this.firstname.value !== "" &&
      this.lastname.value !== "" &&
      this.address.value !== "" &&
      this.phone.value !== ""
    ) {
      const serviceId = this.services.value;
      const firstname = this.firstname.value;
      const lastname = this.lastname.value;
      const address = this.address.value;
      const phone = this.phone.value;
      const email = this.email.value;

      const res = await axios.get(`/shippings/cost/${serviceId}`);
      this.setState({
        shipCosts: res.data[0].costs,
        shipName: res.data[0].services,
        newFirstname: firstname,
        newLastname: lastname,
        newAddress: address,
        newPhone: phone,
        newEmail: email
      });

      swal({
        title: "Successfully Calculated!",
        text: "Your shipping cost has been added",
        icon: "success",
        button: "OK"
      });
    } else {
      alert("Required field cannot be blank");
    }
  };

  // Modal to display Order
  orderModal = () => {
    if (this.state.shipCosts) {
      var cost = this.state.shipCosts;
    }

    if (this.state.shipName) {
      var serviceName = this.state.shipName;
    }

    if (this.state.totalCarts.length) {
      var total_qty = this.state.totalCarts[0].total_qty;
      var sub_price = this.state.totalCarts[0].total_price;
    }

    var total_price = sub_price + cost;

    return (
      <div
        class="modal fade"
        id="orderModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                Your Order Summary
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <table className="table table-bordered table-hover">
                <div>
                  <strong>
                    <label className="mt-3">Full Name</label>
                  </strong>
                  {" : "}
                  {this.state.newFirstname} {this.state.newLastname}
                </div>
                <div>
                  <strong>
                    <label className="mt-3">Address</label>
                  </strong>
                  {" : "}
                  {this.state.newAddress}
                </div>
                <div>
                  <strong>
                    <label className="mt-3">Email</label>
                  </strong>
                  {" : "}
                  {this.state.newEmail}
                </div>
                <div>
                  <strong>
                    <label className="mt-3">Phone</label>
                  </strong>
                  {" : "}
                  {this.state.newPhone}
                </div>
                <div>
                  <strong>
                    <label className="mt-3">Total Quantity</label>
                  </strong>
                  {" : "}
                  {total_qty}
                </div>
                <div>
                  <strong>
                    <label className="mt-3">Shipping Service</label>
                  </strong>
                  {" : "}
                  {serviceName}
                </div>
                <div>
                  <strong>
                    <label className="mt-3">Shipping Cost</label>
                  </strong>
                  {" : "}
                  {this.state.shipCosts}
                </div>
                <div>
                  <strong>
                    <label className="mt-3">Sub Total</label>
                  </strong>
                  {" : "}
                  {sub_price}
                </div>
                <div>
                  <strong>
                    <label className="mt-3">Total Price</label>
                  </strong>
                  {" : "}
                  {total_price}
                </div>
              </table>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => {
                  this.Order();
                }}
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  userProfile = () => {
    return (
      <div className="container wow fadeIn">
        <h4 className="my-3text-center">Delivery Address Detail</h4>
        <div className="card container">
          <strong>
            <label>First Name</label>
          </strong>
          <div>
            <input
              ref={input => (this.firstname = input)}
              className="form-control "
              type="text"
              defaultValue={this.state.profiles.first_name}
            />
          </div>
          <strong>
            <label>Last Name</label>
          </strong>
          <div>
            <input
              ref={input => (this.lastname = input)}
              className="form-control"
              type="text"
              defaultValue={this.state.profiles.last_name}
            />
          </div>

          <strong>
            <label>Address</label>
          </strong>
          <div>
            <input
              ref={input => (this.address = input)}
              className="form-control"
              type="text"
              defaultValue={this.state.profiles.address}
            />
          </div>
          <strong>
            <label>Phone</label>
          </strong>
          <div>
            <input
              ref={input => (this.phone = input)}
              className="form-control"
              type="text"
              defaultValue={this.state.profiles.telephone}
            />
          </div>
          <strong>
            <label>Email</label>
          </strong>
          <input
            ref={input => (this.email = input)}
            className="form-control"
            type="email"
            defaultValue={this.state.profiles.email}
          />
        </div>
      </div>
    );
  };

  serviceList = () => {
    return this.state.shippings.map(ship => {
      return (
        <option key={ship.id} value={ship.id}>
          {ship.services}
        </option>
      );
    });
  };

  // post order to database
  Order = () => {
    for (var i = 0; i < this.state.carts.length; i++) {
      var order = new Date();
      var year = order.getFullYear();
      var month = order.getMonth();
      var date = order.getDate();
      var hours = order.getHours();
      var minutes = order.getMinutes();
      var seconds = order.getSeconds();
      var neworder = `${year}${month}${date}${hours}${minutes}${seconds}`;

      // post data to td_order_items
      axios
        .post(`/orderitems/add`, {
          order_id: neworder,
          prod_id: this.state.carts[i].prod_id,
          qty: this.state.carts[i].qty,
          total_price: this.state.carts[i].total_price
        })
        .then(resOrderItem => {
          console.log(resOrderItem);
        });

      // delete data from carts
      axios
        .delete(`/carts/del/${this.state.carts[i].cart_id}`)
        .then(resDelCart => {
          console.log(resDelCart);
        });

      // update data stock in td_stocks by prod_id
      const old_stock = this.state.carts[i].curr_stock;
      const stock_reduce = this.state.carts[i].qty;
      const new_stock = old_stock - stock_reduce;
      if (this.state.carts.length > 0) {
        let prod_id = this.state.carts[i].prod_id;

        axios
          .patch(`/products/stock/${prod_id}`, {
            curr_stock: new_stock
          })
          .then(resStock => {
            console.log(resStock);
          });
      }
    }

    let order_id = neworder;
    let username = cookie.get("masihLogin");
    let subtotal = this.state.totalCarts[0].total_price;
    let shippingcost = this.state.shipCosts;
    let totalAmount =
      this.state.totalCarts[0].total_price + this.state.shipCosts;
    let payment = "waiting for payment";
    let shipment = "waiting for payment";
    let fullname = `${this.state.profiles.first_name} ${
      this.state.profiles.last_name
    }`;
    let address = this.state.profiles.address;
    let telephone = this.state.profiles.telephone;

    // // post data to td_orders
    axios
      .post("/orders/add", {
        order_id,
        username,
        subtotal,
        shippingcost,
        totalAmount,
        payment,
        shipment,
        fullname,
        address,
        telephone
      })
      .then(resOrder => {
        console.log(resOrder);
        swal({
          title: "Successfully ordered!",
          text: "You have to choose the payment for your orders",
          icon: "success",
          button: "OK"
        }).then(() => {
          window.location.href = `/`;
        });
      });
  };

  render() {
    let users = this.props.user;
    if (users.username !== "") {
      return (
        <main className="mt-5 pt-4">
          <div className="container wow fadeIn">
            <h2 className="my-3 h2 text-center">Your Items</h2>
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th className="text-center">Id</th>
                  <th className="text-center">Product Name</th>
                  <th className="text-center">Product Image</th>
                  <th className="text-center">Product Price</th>
                  <th className="text-center">Qty</th>
                  <th className="text-center">Sub Total</th>
                </tr>
              </thead>
              <tbody>{this.cartList()}</tbody>
            </table>
            <h2 className="my-3 h2 text-center">Your estimate cost</h2>
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th className="text-center">Total Quantity</th>
                  <th className="text-center">Sub Total Price</th>
                </tr>
              </thead>
              <tbody>{this.cartTotal()}</tbody>
            </table>

            <h2 className="my-3 h2 text-center">Confirm Your Delivery</h2>
            {this.userProfile()}
            <h2 className="my-3 h2 text-center">Choose Delivery Service</h2>
            <table className="table table-bordered table-hover">
              <td className="text-center">
                <select
                  className="form-control"
                  ref={select => {
                    this.services = select;
                  }}
                >
                  {this.serviceList()}
                </select>

                <button
                  className="btn btn-success"
                  type="button"
                  onClick={() => {
                    this.onSelectedService();
                  }}
                >
                  Calculate
                </button>
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  type="button"
                  data-toggle="modal"
                  data-target="#orderModal"
                >
                  Order
                </button>
                {this.orderModal()}
              </td>
            </table>
          </div>
        </main>
      );
    }
    return <Redirect to="/login" />;
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth
  };
};

export default connect(mapStateToProps) (Checkout)