import React,{Component} from 'react'
import axios from '../config/axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
// import swal from '@sweetalert/with-react'
import cookies from 'universal-cookie'

const cookie = new cookies()

class PaymentNotif extends Component {
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
    payments: [],
    totalPay: ""
  };

  componentDidMount(){
      this.getPay()
  }
  onSubmitPay = id => {};

  getPay = () => {
    const username = cookie.get("masihLogin");
    axios.get(`/orders/list/${username}`).then(res => {
     
      this.setState({ payments: res.data});
    });
  };

  paymentList = () => { 
    return this.state.payments.map(pay => {
      return (
        <tr key={pay.id}>
          <td className="text-center">{pay.id}</td>
          <td className="text-center">{pay.order_id}</td>
          <td className="text-center">
            {this.formatterIDR.format(pay.totalAmount)}
          </td>
          <td className="text-center">{pay.payment}</td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => {
                this.onSubmitPay(pay.id)
              }}
            >
              Submit Payment
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
                My Payment List
              </h2>
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th className="text-center">Id</th>
                  <th className="text-center">Order Id</th>
                  <th className="text-center">Total Amount</th>
                  <th className="text-center">Payment Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>{this.paymentList()}</tbody>
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

export default connect(mapStateToProps)(PaymentNotif)