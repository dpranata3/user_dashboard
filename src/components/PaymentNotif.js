import React,{Component} from 'react'
import axios from '../config/axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import swal from '@sweetalert/with-react'

import {savePayment} from '../actions/pay'

class PaymentNotif extends Component {

  state = {
    payments: [],
    totalPay: ""
  };

  componentDidMount(){
      this.getPay()
  }
  onSubmitPay = async id => {
    const id_order = id
    const order_no = this.state.payments[0].order_id
    const transaction_date = this.date.value
    const sender_name = this.sendername.value
    const amount = this.amount.value
    const payment_to = this.payment_to.value
    const pay_image = this.payProof.files[0]
    
   await this.props.savePayment(id_order,order_no,transaction_date,sender_name,amount,payment_to,pay_image)
   
   await axios.patch(`/orders/edit/${id_order}`, {
       payment: "waiting for confirmation",
       shipment: "waiting for confirmation",
     })
     .then(res => {
       console.log(res.data);
     });

   swal({
     title: "Successfully Upload",
     text: "You have to wait your payment to be confirmed",
     icon: "success",
     button: "OK"
   }).then(() => {
     window.location.href = `/`;
   });
  };
    

  getPay = () => {
    const orderId = this.props.match.params.id
    axios.get(`/orders/pay/${orderId}`).then(res => {
      this.setState({ payments: res.data});
    });
  };

  paymentList = () => { 
    return this.state.payments.map(pay => {
      return (
        <tr key={pay.id}>
          <td className="text-center">{pay.id}</td>
          <td className="text-center">{pay.order_id}</td>
          <td className="text-center">{pay.payment}</td>
          <td className="text-center">
            <input
              ref={input => (this.amount = input)}
              className="form-control"
              type="number"
              defaultValue={pay.totalAmount}
            />
          </td>
          <td className="text-center">
            <input
              ref={input => (this.sendername = input)}
              className="form-control"
              type="text"
            />
          </td>
          <td className="text-center">
            <input
              ref={input => (this.date = input)}
              className="form-control"
              type="date"
            />
          </td>
          <td className="text-center">
            <input
              ref={input => (this.payment_to = input)}
              className="form-control"
              type="text"
            />
          </td>
          <td className="text-center">
            <input
              ref={input => (this.payProof = input)}
              className="form-control"
              type="file"
            />
          </td>
          <td>
            <button
              className="btn btn-primary"
              onClick={() => {this.onSubmitPay(pay.id)}}
            >
              Confirm
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
                  <th className="text-center">Payment Status</th>
                  <th className="text-center">Total Amount</th>
                  <th className="text-center">Sender Name</th>
                  <th className="text-center">Transaction Date</th>
                  <th className="text-center">Payment to</th>
                  <th className="text-center">Upload Proof</th>
                  <th className="text-center">Confirm</th>

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

export default connect(mapStateToProps,{savePayment})(PaymentNotif)