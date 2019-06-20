import React, { Component } from "react";
import { connect } from 'react-redux'

import {onRegisterUser} from '../actions/index'

class Register extends Component {

    onRegisClick=()=>{
        const username = this.username.value
        const firstname = this.firstname.value
        const lastname = this.lastname.value
        const email = this.email.value
        const password = this.password.value

        this.props.onRegisterUser(username,firstname,lastname,email,password)
    }

  render() {
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
                    type="submit"
                    onClick={this.onRegisClick}
                  >
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default connect(null,{onRegisterUser}) (Register);
