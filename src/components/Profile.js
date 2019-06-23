import React, { Component } from "react";
import axios from "../config/axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import swal from '@sweetalert/with-react'

import { onSaveProfile } from "../actions/index";

class Profile extends Component {
  state = {
    profiles: [],
    url: "",
    selectedId: 0
  };

  componentDidMount() {
    this.getProfile();
  }

  getProfile = () => {
    const username = this.props.match.params.username;
    axios.get(`/users/username/${username}`).then(res => {
      this.setState({
        profiles: res.data,
        url: `http://localhost:2019/users/images/${res.data.avatar}`
      });
    });
  };

  onEditProfile = id => {
    this.setState({ selectedId: id });
  };

  onSaveProfiles = async username => {
    const first_name = this.firstname.value;
    const last_name = this.lastname.value;
    const address = this.address.value;
    const phone = this.phone.value;
    const email = this.email.value;
    const avatar = this.ava.files[0];

    await this.props.onSaveProfile(
      username,
      first_name,
      last_name,
      address,
      phone,
      email,
      avatar
    );
    swal({
      title: "Successfully Edited",
      text: "Your profile has been edited",
      icon: "success",
      button: "OK"
    }).then(() => {
      window.location.href = `/`;
    });

    
  };

  render() {
    let profile = this.state.profiles;
    let user = this.props.user;

    if (user.username !== "") {
      if (profile.id !== this.state.selectedId) {
        return (
          <main className="mt-5 pt-4">
            <div className="container wow fadeIn">
              <h2 className="my-3 h2 text-center">{profile.first_name}'s Profile</h2>
              <div className="card container">
                <div className="col-md-4">
                  <img
                    src={this.state.url}
                    alt="John"
                    style={{ width: "350px", height: "350px" }}
                  />
                </div>
                <div className="col-md-6">
                  <h3>
                    {profile.first_name} {profile.last_name}
                  </h3>

                  <strong>
                    <label>Address</label>
                  </strong>
                  <div>{profile.address}</div>

                  <strong>
                    <label>Phone</label>
                  </strong>
                  <div>{profile.telephone}</div>

                  <strong>
                    <label>Email</label>
                  </strong>
                  <div className="text-primary">{profile.email}</div>

                  <button
                    className="btn btn-primary mr-2"
                    onClick={() => {
                      this.onEditProfile(profile.id);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </main>
        );
      } else {
        return (
          <main className="mt-5 pt-4">
            <div className="container wow fadeIn">
              <h2 className="my-3 h2 text-center">{profile.first_name}'s Profile</h2>
              <div className="card container">
                <div>
                  <img
                    src={this.state.url}
                    alt="John"
                    style={{ width: "350px", height: "350px" }}
                  />
                  <input
                    ref={input => (this.ava = input)}
                    className="form-control"
                    type="file"
                  />
                </div>
                <strong>
                  <label>First Name</label>
                </strong>
                <div>
                  <input
                    ref={input => (this.firstname = input)}
                    className="form-control "
                    type="text"
                    defaultValue={profile.first_name}
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
                    defaultValue={profile.last_name}
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
                    defaultValue={profile.address}
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
                    defaultValue={profile.telephone}
                  />
                </div>
                <strong>
                  <label>Email</label>
                </strong>
                <input
                  ref={input => (this.email = input)}
                  className="form-control"
                  type="email"
                  defaultValue={profile.email}
                />
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => {
                    this.onSaveProfiles(profile.username);
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    this.setState({ selectedId: 0 });
                  }}
                  className="btn btn-danger"
                >
                  Cancel
                </button>
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

export default connect(mapStateToProps,{ onSaveProfile })(Profile);
