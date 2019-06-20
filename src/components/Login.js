import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import {onLoginClick} from '../actions/index'

class Login extends Component {

  onSubmitClick = () => {
    const username = this.username.value
    const password = this.password.value
    
    this.props.onLoginClick(username, password);
  };

  onErrorLogin=()=>{
    console.log('error');
    
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
                  <input
                    ref={input => {
                      this.username = input;
                    }}
                    className="form-control"
                    type="text"
                  />
                </form>
                <div className="card-title mt-1">
                  <h4>Password</h4>
                </div>
                <form className="input-group">
                  <input
                    ref={input => {
                      this.password = input;
                    }}
                    className="form-control"
                    type="password"
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
