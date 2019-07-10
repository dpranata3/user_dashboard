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
                          <strong>Skin Care</strong>
                        </h1>
          
                        <p>
                          <strong>Get Your Brighter and Cleaner Skin! Gives you a natural and healthy bright glow skin</strong>
                        </p>
          
                        <p className="mb-4 d-none d-md-block">
                          <strong>Gives you a natural and healthy bright glow skin</strong>
                        </p>
          
                        
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
                          <strong>Hair Treatment</strong>
                        </h1>
          
                        <p>
                          <strong>Treat processed hair to a nutritious deep conditioner, hair mask or leave-in conditionerbv</strong>
                        </p>
          
                        <p className="mb-4 d-none d-md-block">
                          <strong>Find treatments, supplements and tools to help keep your hair healthy and looking its best</strong>
                        </p>
          
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
                          <strong>Facial</strong>
                        </h1>
          
                        <p>
                          <strong>Restore your skin's natural beauty</strong>
                        </p>
          
                        <p className="mb-4 d-none d-md-block">
                          <strong>Your face is how the world sees you</strong>
                        </p>
          
                        
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