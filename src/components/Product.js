import React, { Component } from "react";
import axios from "../config/axios";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'

class Product extends Component {
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
    products: [],
    categories: [],
    productSearch:[]
  };

  componentDidMount() {
    this.getCatg();
    this.getProduct();
  }

  getCatg = () => {
    axios.get("/categories/all").then(res => {
      this.setState({ categories: res.data });
    });
  };

  getProduct = () => {
    axios.get("/products/all").then(res => {
      this.setState({ products: res.data, productSearch:res.data });
    });
  };

  onAddWish = username => {
    const prod_id = this.state.products.prod_id;
    axios
      .post(`/wishlists/add/${username}`, {
        prod_id
      })
      .then(res => {
        console.log("added to wishlist");
      });
  };


  prodList = () => {
    return this.state.products.map(prod => {
      return (
        <div className="col-lg-3 col-md-6 mb-4" key={prod.prod_id}>
          <div className="card">
            {/* card image   */}
            <div className="view overlay">
              <img
                src={`http://localhost:2019/products/images/${prod.prod_image}`}
                className="card-img-top"
                alt="products"
              />
              <a href="www.google.com">
                <div className="mask rgba-white-slight" />
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
                  <Link
                    className="dark-grey-text"
                    to={`/productDetail/${prod.prod_id}`}
                  >
                    {prod.prod_name}
                    <span className="badge badge-pill primary-color">
                      bestseller
                    </span>
                  </Link>
                </strong>
              </h5>

              <h4 className="font-weight-bold blue-text">
                <strong>{this.formatterIDR.format(prod.prod_price)}</strong>
              </h4>

              <h5 className="font-weight-bold green-text">
                <a href="www.google.com">
                  {" "}
                  <i className="fas fa-cart-plus">Add to Cart</i>
                </a>
              </h5>
            </div>
          </div>
        </div>
      );
    });
  };

  renderList =() =>{
    let users = this.props.user
    if(users.username ===''){
      return this.state.productSearch.map(prod => {
        return (
          <div className="col-lg-3 col-md-6 mb-4" key={prod.prod_id}>
            <div className="card">
              {/* card image   */}
              <div className="view overlay">
              <Link to={`/productDetail/${prod.prod_id}`}>
                <img
                  src={`http://localhost:2019/products/images/${prod.prod_image}`}
                  className="card-img-top"
                  alt="products"
                />
               </Link>
              </div>
              {/* <!--Card image--> */}
  
              <div className="card-body text-center">
              <Link to ={`/productDetail/${prod.prod_id}`}>
                <h5>{prod.catg_name}</h5>
              </Link>
                  
                <h5>
                  <strong>
                    <Link
                      className="dark-grey-text"
                      to={`/productDetail/${prod.prod_id}`}
                    >
                      {prod.prod_name}
                    </Link>
                  </strong>
                </h5>
  
                <h4 className="font-weight-bold blue-text">
                  <strong>{this.formatterIDR.format(prod.prod_price)}</strong>
                </h4>
  
                <h5 className="font-weight-bold green-text">
                  <a href="/login">
                    {" "}
                    <i className="fas fa-cart-plus">Add to Cart</i>
                  </a>
                </h5>
              </div>
            </div>
          </div>
        );
      });
    } 
    else {
      return this.state.productSearch.map(prod => {
        return (
          <div className="col-lg-3 col-md-6 mb-4" key={prod.prod_id}>
            <div className="card">
              {/* card image   */}
              <div className="view overlay">
                <Link to={`/productDetail/${prod.prod_id}`}>
                  <img
                    src={`http://localhost:2019/products/images/${
                      prod.prod_image
                    }`}
                    className="card-img-top"
                    alt="products"
                  />
                </Link>
              </div>
              {/* <!--Card image--> */}

              <div className="card-body text-center">
                <Link to={`/productDetail/${prod.prod_id}`}>
                  <h5>{prod.catg_name}</h5>
                </Link>

                <h5>
                  <strong>
                    <Link
                      className="dark-grey-text"
                      to={`/productDetail/${prod.prod_id}`}
                    >
                      {prod.prod_name}
                    </Link>
                  </strong>
                </h5>

                <h4 className="font-weight-bold blue-text">
                  <strong>
                    {this.formatterIDR.format(prod.prod_price)}
                  </strong>
                </h4>
                <div className="container">
                  <Link to={`/productDetail/${prod.prod_id}`}>
                    <button className="btn btn-primary" type="button">
                      Add to cart
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
    

  }

  catgList = () => {
    return this.state.categories.map(catg => {
      return (
        <ul className="navbar-nav mr-auto" key={catg.id_catg}>
          <li className="nav-item">
            <a className="nav-link" href="/">
              {catg.catg_name}
            </a>
          </li>
        </ul>
      );
    });
  };

  onBtnSearch=()=>{
    let search = this.search.value 
 
        var arrSearch = this.state.products.filter(item => {
            return(
              item.prod_name.toLowerCase().includes(search.toLowerCase())
            )

        })
        
        console.log(arrSearch)

        this.setState({ productSearch: arrSearch })
  }

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
                  ref={input=>this.search = input}
                  className="form-control mr-sm-2"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button type="button" className="btn-btn-outline-primary" onClick={this.onBtnSearch}>
                <i className="fas fa-search"></i>
                </button>
                
              </div>
            </form>
          </div>
        </nav>
        <section className="text-center mb-4">
          <div className="row wow fadeIn">{this.renderList()}</div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth
  };
};

export default connect(mapStateToProps) (Product);
