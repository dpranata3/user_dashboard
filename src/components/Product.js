import React, { Component } from "react";
import axios from "../config/axios";
import { Link } from "react-router-dom";

class Product extends Component {
  state = {
    products:[],
    categories: []
  };

  componentDidMount(){
      this.getCatg()
      this.getProduct()
  }

  getCatg = () => {
    axios.get('/categories/all')
        .then(res => {
            this.setState({ categories: res.data });
    });
  };

  getProduct = ()=>{
    axios.get('/products/all')
    .then(res=>{
        this.setState({products: res.data})
    })
  };

  prodList = () =>{
      return this.state.products.map(prod=>{
          return(
              <div className="card" key={prod.prod_id}>
            {/* card image   */}
              <div className="view overlay">
                <img src={`http://localhost:2019/products/images/${prod.prod_image}`} className="card-img-top"
                  alt="products"/>
                <a href="www.google.com">
                  <div className="mask rgba-white-slight"></div>
                </a>
              </div>
              {/* <!--Card image--> */}
 
              {/* <!--Card content--> */}
              <div className="card-body text-center">
                {/* <!--Category & Title--> */}
                <a href="www.google.com" className="grey-text">
                  <h5>{prod.prod_code}</h5>
                </a>
                <h5>
                  <strong>
                      <Link className="dark-grey-text" to={`/productDetail/${prod.prod_id}`}>{prod.prod_name}
                        <span className="badge badge-pill primary-color">bestseller</span>
                      </Link>
                  </strong>
                </h5>

                <h4 className="font-weight-bold blue-text">
                  <strong>Rp.{prod.prod_price}</strong>
                </h4>
                
                <h5 className="font-weight-bold orange-text">
                    <a href="www.google.com"><i className="fas fa-thumbs-up">Wishlist</i></a>
                </h5>
                
                <h5 className="font-weight-bold green-text">
                    <a href="www.google.com"> <i className="fas fa-cart-plus">Add to Cart</i></a>
                </h5>
              </div>
              {/* <!--Card content--> */}

              </div>
              
          )
      })
  }
  
  catgList = () => {
    return this.state.categories.map(catg => {
      return (
        <ul className="navbar-nav mr-auto" key={catg.id_catg}>
          <li className="nav-item">
            <a className="nav-link" href="www.google.com">
                {catg.catg_name}
            </a>
          </li> 
          </ul>
      )
    });
  };

  render() {
    return (
      <div>
        {/* <!--Navbar--> */}
        <nav className="navbar navbar-expand-lg navbar-dark mdb-color lighten-3 mt-3 mb-5">
          {/* <!-- Navbar brand --> */}
          <span className="navbar-brand">Categories:</span>

          {/* <!-- Collapse button --> */}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#basicExampleNav"
            aria-controls="basicExampleNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* <!-- Collapsible content --> */}
          <div className="collapse navbar-collapse" id="basicExampleNav">
            {/* <!-- Links --> */}
                {this.catgList()}
            {/* <!-- Links --> */}

            <form className="form-inline">
              <div className="md-form my-0">
                <input
                  className="form-control mr-sm-2"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                />
              </div>
            </form>
          </div>
          {/* <!-- Collapsible content --> */}
        </nav>
        {/* <!--/.Navbar--> */}

        <section className="text-center mb-4">
        {/* <!--Grid row--> */}
        <div className="row wow fadeIn">

          {/* <!--Grid column--> */}
          <div className="col-lg-3 col-md-6 mb-4">

            {/* <!--Card--> */}
            
              {this.prodList()}

          
            {/* <!--Card--> */}

          </div>
          {/* <!--Grid column--> */}

        </div>
        {/* <!--Grid row--> */}
        </section>
      </div>
    );
  }
}

export default Product;
