import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {onLoginClick} from '../actions/index'

class Login extends Component {

  onSubmitClick = async () => {

    const username = this.username.value
    const password = this.password.value
    
    await this.props.onLoginClick(username, password);
    
  };

  onErrorLogin=()=>{
    if(this.props.user.error !==""){
      return (
          <div className="alert alert-danger mt-4">
              <label>Username or Password are wrong</label>
          </div>
      )
    }  
  }
  render() {
    let users = this.props.user
    console.log(users);
    
    if(users.username ==="" || users.username === undefined){
      return (
        <div id="home-section">
          <div className="mt-5 row">
            <div className="col-sm-3 mx-auto card">
              <div className="card-body">
                <div className="border-bottom border-secondary card-title">
                  <h1>Login</h1>
                </div>
                <div className="card-title mt-1">
                  <h4>Username</h4>
                </div>
                <form className="input-group">
                  <label for="validationDefault01"></label>
                  <input
                    id="validationDefault01"
                    ref={input => {
                      this.username = input;
                    }}
                    className="form-control"
                    type="text"
                    required
                  />
                </form>
                <div className="card-title mt-1">
                  <h4>Password</h4>
                </div>
                <form className="input-group">
                  <label for="validationPass"></label>
                  <input
                    id="validationPass"
                    ref={input => {
                      this.password = input;
                    }}
                    className="form-control"
                    type="password"
                    required 
                  />
                </form>
                <button
                  className="btn btn-success btn-block mt-5"
                  onClick={this.onSubmitClick}
                >
                  Login
                </button>
                <label className="text-muted">
                  Don't have account?
                  <Link className="ml-3" to="/register">
                    Register
                  </Link>
                </label>
                {this.onErrorLogin()}
              </div>
            </div>
          </div>
        </div>
      );
        
    }
    return(
      <Redirect to='/'/>
    )
  }
      
    
  
}

const mapStateToProps = state => {
    return {
      user: state.auth,
      error: state.auth
    }
  }
  

export default connect(mapStateToProps,{onLoginClick})(Login);
