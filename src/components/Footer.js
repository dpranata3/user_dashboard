import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="page-footer text-center font-small mt-4 wow fadeIn">
          <div className="pt-4">
            <a
              className="btn btn-outline-white"
              href="https://mdbootstrap.com/docs/jquery/getting-started/download/"
              role="button"
            >
              Something 1
              <i className="fas fa-download ml-2" />
            </a>
            <a
              className="btn btn-outline-white"
              href="https://mdbootstrap.com/education/bootstrap/"
              role="button"
            >
              Something 2
              <i className="fas fa-graduation-cap ml-2" />
            </a>
          </div>

          <hr className="my-4" />

          <div className="pb-4">
            <a href="http://www.google.com">
              <i className="fab fa-facebook-f mr-3" />
            </a>
              <i className="fab fa-twitter mr-3" />
              <i className="fab fa-youtube mr-3" />
              <i className="fab fa-google-plus-g mr-3" />
              <i className="fab fa-dribbble mr-3" />
              <i className="fab fa-pinterest mr-3" />      
              <i className="fab fa-github mr-3" />
              <i className="fab fa-codepen mr-3" />          
          </div>

          <div className="footer-copyright py-3">
            © 2019 Copyright: 
            <a
              href="https://medium.com/@donny.pranata3"
            >
              Donny Pranata
            </a>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
