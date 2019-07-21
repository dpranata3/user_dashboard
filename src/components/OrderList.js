import React,{Component} from 'react'
import axios from '../config/axios'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
// import swal from '@sweetalert/with-react'
import cookies from 'universal-cookie'

const cookie = new cookies()

class OrderList extends Component {
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
    orders: [],
    orderDetails: [],
    totalPay: ""
  };

  componentDidMount() {
    this.getOrder();
  }
  onSubmitPay = id => {};

  getOrder = () => {
    const username = cookie.get("masihLogin");
    axios.get(`/orders/list/${username}`).then(res => {
      this.setState({ orders: res.data });
    });
  };

  getOrderDetail = order_id => {
    axios.get(`/orders/detail/${order_id}`).then(res => {
      this.setState({ orderDetails: res.data });
    });
  };

  // Confirm Payment

  // order details
  orderDetailModal = () => {
    this.modalList = () => {
      return this.state.orderDetails.map(oDetail => {
        return (
          <tr key={oDetail.id}>
            <td className="text-center">{oDetail.id}</td>
            <td className="text-center">{oDetail.order_id}</td>
            <td className="text-center">{oDetail.prod_name}</td>
            <td className="text-center">{oDetail.qty}</td>
            <td className="text-center">
              {this.formatterIDR.format(oDetail.prod_price)}
            </td>
            <td className="text-center">
              {this.formatterIDR.format(oDetail.total_price)}
            </td>
          </tr>
        );
      });
    };
    return (
      <div
        className="modal fade"
        id="orderDetailModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content" style={{ width: "850px" }}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">
                Your Order Details
              </h5>
            </div>
            <div className="modal-body">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th className="text-center">No</th>
                    <th className="text-center">Order Id</th>
                    <th className="text-center">Product Name</th>
                    <th className="text-center">Product Qty</th>
                    <th className="text-center">Product Price</th>
                    <th className="text-center">Amount</th>
                  </tr>
                </thead>
                <tbody>{this.modalList()}</tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  orderList = () => {
    const orders = this.state.orders;

    return orders.map((order, i) => {
      // Check payment status
      if (
        orders[i].payment !== "Paid" ||
        orders[i].payment === "Declined" ||
        orders[i].payment === "waiting for confirmation"
      ) {
        if (orders[i].payment === "waiting for confirmation") {
          return (
            <tr key={i}>
              <td className="text-center">{order.id}</td>
              <td className="text-center">{order.order_id}</td>
              <td className="text-center">
                {this.formatterIDR.format(order.totalAmount)}
              </td>
              <td className="text-center">{order.payment}</td>
              <td className="text-center">{order.shipment}</td>
              <td className="text-center">{order.order_status}</td>
              <td>
                <button
                  disabled
                  className="btn btn-success"
                  onClick={() => {
                    this.onSubmitPay(order.id);
                  }}
                >
                  Submitted
                </button>

                <button
                  className="btn btn-primary"
                  type="button"
                  data-toggle="modal"
                  data-target="#orderDetailModal"
                  onClick={() => {
                    this.getOrderDetail(order.order_id);
                  }}
                >
                  Details
                </button>
                {this.orderDetailModal()}
              </td>
            </tr>
          );
        } else if (orders[i].payment === "Declined") {
          return (
            <tr key={i}>
              <td className="text-center">{order.id}</td>
              <td className="text-center">{order.order_id}</td>
              <td className="text-center">
                {this.formatterIDR.format(order.totalAmount)}
              </td>
              <td className="text-center">{order.payment}</td>
              <td className="text-center">{order.shipment}</td>
              <td className="text-center">{order.order_status}</td>
              <td>
                <Link to={`/payment/${order.id}`}>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      this.onSubmitPay(order.id);
                    }}
                  >
                    Reupload
                  </button>
                </Link>
                <button
                  className="btn btn-primary"
                  type="button"
                  data-toggle="modal"
                  data-target="#orderDetailModal"
                  onClick={() => {
                    this.getOrderDetail(order.order_id);
                  }}
                >
                  Details
                </button>
                {this.orderDetailModal()}
              </td>
            </tr>
          );
        } else {
          return (
            <tr key={i}>
              <td className="text-center">{order.id}</td>
              <td className="text-center">{order.order_id}</td>
              <td className="text-center">
                {this.formatterIDR.format(order.totalAmount)}
              </td>
              <td className="text-center">{order.payment}</td>
              <td className="text-center">{order.shipment}</td>
              <td className="text-center">{order.order_status}</td>
              <td>
                <Link to={`/payment/${order.id}`}>
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      this.onSubmitPay(order.id);
                    }}
                  >
                    Submit
                  </button>
                </Link>

                <button
                  className="btn btn-primary"
                  type="button"
                  data-toggle="modal"
                  data-target="#orderDetailModal"
                  onClick={() => {
                    this.getOrderDetail(order.order_id);
                  }}
                >
                  Details
                </button>
                {this.orderDetailModal()}
              </td>
            </tr>
          );
        }
      } else {
        return (
          <tr key={i}>
            <td className="text-center">{order.id}</td>
            <td className="text-center">{order.order_id}</td>
            <td className="text-center">
              {this.formatterIDR.format(order.totalAmount)}
            </td>
            <td className="text-center">{order.payment}</td>
            <td className="text-center">{order.shipment}</td>
            <td className="text-center">{order.order_status}</td>
            <td>
              <button disabled className="btn btn-info">
                Paid
              </button>

              <button
                className="btn btn-primary"
                type="button"
                data-toggle="modal"
                data-target="#orderDetailModal"
                onClick={() => {
                  this.getOrderDetail(order.order_id);
                }}
              >
                Details
              </button>
              {this.orderDetailModal()}
            </td>
          </tr>
        );
      }
    });
  };

  render() {
    let users = this.props.user;
    if (users.username !== "") {
      if (this.state.orders.length > 0) {
        return (
          <main className="mt-5 pt-4">
            <div className="container wow fadeIn">
              <h2 className="h2 text-center">My Orders List</h2>
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th className="text-center">Id</th>
                    <th className="text-center">Order Id</th>
                    <th className="text-center">Total Amount</th>
                    <th className="text-center">Payment Status</th>
                    <th className="text-center">Shipment Status</th>
                    <th className="text-center">Order Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>{this.orderList()}</tbody>
              </table>
            </div>
          </main>
        );
      } else {
        return (
          <main className="mt-5 pt-4">
            <div className="container mt-5">
              <div className=" row d-flex justify-content-center">
                <h1 className="display-4">
                  YOU DON'T HAVE ANY ORDER HISTORY PLEASE GOT TO{" "}
                  <Link to="/">GO SHOP</Link>{" "}
                </h1>
              </div>
            </div>
          </main>
        );
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

export default connect(mapStateToProps)(OrderList)