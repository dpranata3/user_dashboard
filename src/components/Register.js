import React, { Component } from "react";
import { connect } from 'react-redux'
import swal from '@sweetalert/with-react'

import {onRegisterUser} from '../actions/index'

class Register extends Component {

    onRegisClick=async()=>{
       if(this.username.value!=="" && this.firstname.value !=="" && this.lastname.value !=="" && this.email.value !=="" && this.password.value !==""){
        const username = this.username.value
        const firstname = this.firstname.value
        const lastname = this.lastname.value
        const email = this.email.value
        const password = this.password.value

        await this.props.onRegisterUser(username,firstname,lastname,email,password)
        swal({
          title: "Successfully Registered",
          text: "You have been registered",
          icon: "success",
          button: "OK"
        }).then(() => {
          window.location.href = `/login`;
        });
       }
      else {
        alert('Required field cannot be empty')
      }
    }

    onErrorLogin=()=>{
      if(this.props.user.error !==""){
        let errorMsg = this.props.user.error
              
        return (
            <div className="alert alert-danger mt-4">
                <label>{errorMsg}</label>
            </div>
        )
      }  
    }

  render() {
    console.log(this.props.user);
    
    return (
      <div>
        <main className="mt-5 pt-4">
          <div className="container wow fadeIn" width="100">
            <h2 className="my-3 h2 text-center">Register</h2>
            <div className="row" />
            <div className="container col-md-6 mb-2">
              <div className="card">
                <form className="card-body">
                  <div className="md-form mb-5">
                    <input
                      ref={input => {
                        this.username = input;
                      }}
                      type="text"
                      id="username"
                      className="form-control"
                    />
                    <label>Username</label>
                  </div>
                  <div className="md-form mb-5">
                    <input
                      ref={input => {
                        this.firstname = input;
                      }}
                      type="text"
                      id="firstname"
                      className="form-control"
                    />
                    <label>First Name</label>
                  </div>
                  <div className="md-form mb-5">
                    <input
                      type="text"
                      id="lastname"
                      className="form-control"
                      ref={input => {
                        this.lastname = input;
                      }}
                    />
                    <label>Last Name</label>
                  </div>
                  <div className="md-form mb-5">
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      ref={input => {
                        this.email = input;
                      }}
                    />
                    <label>Email</label>
                  </div>
                  <div className="md-form mb-5 input-group">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      ref={input => {
                        this.password = input;
                      }}
                    />
                    <label>Password</label>
                    <button>
                      <i className="fas fa-eye" />
                    </button>
                  </div>
                  <hr className="mb-2" />
                  <button
                    className="btn btn-success btn-lg btn-block"
                    type="button"
                    onClick={this.onRegisClick}
                  >
                    Register
                  </button>
                </form>
                {this.onErrorLogin()}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.auth,
    error: state.auth
  }
}

export default connect(mapStateToProps,{onRegisterUser}) (Register);
