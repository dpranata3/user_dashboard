import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import cookies from 'universal-cookie'

import Navbar from './Navbar'
import Home from './Home'
import ProdDetail from './ProdDetail';
import Footer from './Footer'
import Login from './Login';
import Register from './Register'
import Profile from './Profile';
import WishList from './WishList'
import Cart from './Cart'
import Checkout from './Checkout'
import PaymentNotif from './PaymentNotif'
import OrderList from './OrderList'

import {keepLogin} from '../actions'



const cookie = new cookies()

class App extends Component {

    componentDidMount() {
        var userCookie = cookie.get('masihLogin')
        
        if (userCookie !== undefined) {
            this.props.keepLogin(userCookie)      
        }
    }


    render(){
       
        return (
          <BrowserRouter>
            <div>
              <Navbar />
              <Route exact path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route exact path="/" component={Home} />
              <Route path="/profile/:username" component={Profile} />
              <Route path="/productDetail/:prod_id" component={ProdDetail}/>
              <Route path="/wishlist/:username" component={WishList}/>
              <Route path="/cart/:username" component={Cart}/>
              <Route path="/cart/checkout" component={Checkout}/>
              <Route path="/payment_notif/:order_id" component={PaymentNotif}/>
              <Route excat path="/payment_notif" component={PaymentNotif}/>
              <Route path="/orderlist" component={OrderList}/>
              

              <Footer />
            </div>
          </BrowserRouter>
        );
    }
}



export default connect (null,{keepLogin})(App)