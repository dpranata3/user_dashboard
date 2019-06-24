import React, { Component } from "react";
import BgImg1 from '../images/men.jpg'
import BgImg2 from '../images/woman.jpg'
import BgImg3 from '../images/hair.jpg'


class Carousel extends Component {
   
    render(){

        const CarouselStyle1 = {
            backgroundImage: `url(${BgImg1})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        }

        const CarouselStyle2 = {
            backgroundImage: `url(${BgImg2})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        }

        const CarouselStyle3 = {
            backgroundImage: `url(${BgImg3})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        }
        
        return(
            // <!--Carousel Wrapper-->
            <div id="carousel-example-1z" className="carousel slide carousel-fade pt-4" data-ride="carousel">
          
              {/* <!--Indicators--> */}
              <ol className="carousel-indicators">
                <li data-target="#carousel-example-1z" data-slide-to="0" className="active"></li>
                <li data-target="#carousel-example-1z" data-slide-to="1"></li>
                <li data-target="#carousel-example-1z" data-slide-to="2"></li>
              </ol>
              {/* <!--/.Indicators--> */}
          
              {/* <!--Slides--> */}
              <div className="carousel-inner" role="listbox">
          
                {/* <!--First slide--> */}
                <div className="carousel-item active" style={CarouselStyle1}>
                  <div className="view" >
          
                    {/* <!-- Mask & flexbox options--> */}
                    <div className="mask rgba-black-strong d-flex justify-content-center align-items-center">
          
                      {/* <!-- Content --> */}
                      <div className="text-center white-text mx-5 wow fadeIn">
                        <h1 className="mb-4">
                          <strong>The Skin all you need 1</strong>
                        </h1>
          
                        <p>
                          <strong>Best and comes from natural ingridients 1</strong>
                        </p>
          
                        <p className="mb-4 d-none d-md-block">
                          <strong>You will feel better after tasting our product, lots are do and so will you.</strong>
                        </p>
          
                        <a href="/" className="btn btn-outline-white btn-lg">Go Get Yours 
                         <i className="fas fa-cart-arrow-down"></i>
                        </a>
                      </div>
                      {/* <!-- Content --> */}
          
                    </div>
                    {/* <!-- Mask & flexbox options--> */}
          
                  </div>
                </div>
                {/* <!--/First slide--> */}
          
                {/* <!--Second slide--> */}
                <div className="carousel-item">
                  <div className="view" style={CarouselStyle2}>
          
                    {/* <!-- Mask & flexbox options--> */}
                    <div className="mask rgba-black-strong d-flex justify-content-center align-items-center">
          
                      {/* <!-- Content --> */}
                      <div className="text-center white-text mx-5 wow fadeIn">
                        <h1 className="mb-4">
                          <strong>The Skin all you need 2</strong>
                        </h1>
          
                        <p>
                          <strong>Best and comes from natural ingridients 2</strong>
                        </p>
          
                        <p className="mb-4 d-none d-md-block">
                          <strong>You will feel better after tasting our product, lots are do and so will you.</strong>
                        </p>
          
                        <a href="/" className="btn btn-outline-white btn-lg">Go Get Yours 
                          <i className="fas fa-cart-arrow-down"></i>
                        </a>
                      </div>
                      {/* <!-- Content --> */}
          
                    </div>
                    {/* <!-- Mask & flexbox options--> */}
          
                  </div>
                </div>
                {/* <!--/Second slide--> */}
          
                {/* <!--Third slide--> */}
                <div className="carousel-item">
                  <div className="view" style={CarouselStyle3}>
          
                    {/* <!-- Mask & flexbox options--> */}
                    <div className="mask rgba-black-strong d-flex justify-content-center align-items-center">
          
                      {/* <!-- Content --> */}
                      <div className="text-center white-text mx-5 wow fadeIn">
                        <h1 className="mb-4">
                          <strong>The Skin all you need 3</strong>
                        </h1>
          
                        <p>
                          <strong>Best and comes from natural ingridients 3</strong>
                        </p>
          
                        <p className="mb-4 d-none d-md-block">
                          <strong>You will feel better after tasting our product, lots are do and so will you.</strong>
                        </p>
          
                        <a href="https://mdbootstrap.com/education/bootstrap/" className="btn btn-outline-white btn-lg">Go Get Yours 
                          <i className="fas fa-cart-arrow-down"></i>
                        </a>
                      </div>
                      {/* <!-- Content --> */}
          
                    </div>
                    {/* <!-- Mask & flexbox options--> */}
          
                  </div>
                </div>
                {/* <!--/Third slide--> */}
          
              </div>
              {/* <!--/.Slides--> */}
          
              {/* <!--Controls--> */}
              <a className="carousel-control-prev" href="#carousel-example-1z" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carousel-example-1z" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
              {/* <!--/.Controls--> */}
          
            </div>
            // <!--/.Carousel Wrapper-->

            
        )
    }
}

export default Carousel