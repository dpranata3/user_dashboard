import React, { Component } from "react";
import axios from "../config/axios";

class ProdDetail extends Component {
  state = {
    productDetail: [],
    url: ""
  };

  componentDidMount() {
    this.getProdDetail();
  }

  getProdDetail = () => {
    const prod_id = this.props.match.params.prod_id;
    axios.get(`/products/view/${prod_id}`).then(res => {
      this.setState({
        productDetail: res.data[0],
        url: `http://localhost:2019/products/images/${res.data[0].prod_image}`
      });
    });
  };

  render() {
    let prods = this.state.productDetail;
    return (
      <main className="mt-5 pt-4">
        <div className="container wow fadeIn">
          <h2 className="my-3 h2 text-center">{prods.prod_name} </h2>
          <div className="row">
            <div className="col-md-6 mb-4">
              <img src={this.state.url} className="img-fluid" alt="products" />
            </div>

            <div className="col-md-6 mb-4">
              {/* <!--Content--> */}
              <div className="p-4">
                <div className="mb-3">
                  <a href="www.google.com">
                    <span className="badge purple mr-1">Category 2</span>
                  </a>
                  <a href="www.google.com">
                    <span className="badge blue mr-1">New</span>
                  </a>
                  <a href="www.google.com">
                    <span className="badge red mr-1">Bestseller</span>
                  </a>
                </div>

                <p className="lead">
                  <span>Rp. {this.state.productDetail.prod_price}</span>
                </p>

                <p className="lead font-weight-bold">Description</p>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                  dolor suscipit libero eos atque quia ipsa sint voluptatibus!
                  Beatae sit assumenda asperiores iure at maxime atque
                  repellendus maiores quia sapiente.
                </p>

                <form className="d-flex justify-content-left">
                  <input
                    type="number"
                    value="1"
                    aria-label="Search"
                    className="form-control"
                    style={{ width: "100px" }}
                  />
                  <button
                    className="btn btn-primary btn-md my-0 p"
                    type="submit"
                  >
                    Add to cart
                    <i className="fas fa-shopping-cart ml-1" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default ProdDetail;
