import React,{Component} from 'react'
import axios from '../config/axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
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
    totalPay: ""
  };

  componentDidMount(){
      this.getOrder()
  }
  onSubmitPay = id => {};

  getOrder = () => {
    const username = cookie.get("masihLogin");
    axios.get(`/orders/list/${username}`).then(res => {
     
      this.setState({ orders: res.data});
    });
  };


  orderList = () => { 
    return this.state.orders.map(order => {
      return (
        <tr key={order.id}>
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
              className="btn btn-danger"
              onClick={() => {
                this.onSubmitPay(order.id)
              }}
            >
              Submit Payment
            </button>
            <button
               className="btn btn-second"
               type="button"
               data-toggle="modal"
               data-target="#orderModal"
               onClick={this.onSubmitPay(order.id)}
            >
              Details
            </button>
          </td>
        </tr>
      );
    });
  };

  render() {
    let users = this.props.user;
    if (users.username !== "") {
      return (
        <main className="mt-5 pt-4">
          <div className="container wow fadeIn">
              <h2 className="h2 text-center"> 
                My Orders List
              </h2>
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