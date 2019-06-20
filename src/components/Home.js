import React, { Component } from 'react';

import Carousel from './Carousel';
import Product from './Product'

class Home extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Carousel />
        <Product/>
      </div>
    );
  }
}

export default Home;
