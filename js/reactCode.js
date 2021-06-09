import React from "react";
import pricingJson from "./pricing.json";
import "../css/main.css";

export const Presentational = (props) => <Page parentProps={props}/>

const Page = (props) => {
  return (
    <div>
      <Header/>
      <PricingComponent parentProps={props.parentProps}/>
    </div>
  );
}

const Header = () => {
  return (
    <header className="header">
      <h1>
        Simple, traffic-based pricing
      </h1>
      <p>
        Sign-up for our 30-day trial. No credit card required.
      </p>
    </header>
  );
}

const PricingComponent = (props) => {
  return (
    <div className="card">
      <CardTop parentProps={props.parentProps}/>
      <CardBottom/>
    </div>
  );
}

const CardTop = (props) => {
  return (
    <div className="card-top">
      <SliderDiv parentProps={props.parentProps}/>
      <Billing parentProps={props.parentProps}/>
    </div>
  );
}

const SliderDiv = (props) => {

  const pageViews = pricingJson[props.parentProps.sliderValue].pageviews;

  let price = pricingJson[props.parentProps.sliderValue].price;
  if (props.parentProps.discounted) {
    price = price - (price * 25/100);
  }

  return (
    <div className="slider-div">
      <b>{pageViews} Pageviews</b>
      <Slider parentProps={props.parentProps}/>
      <div className="pricing-wrapper">
        <b>${price}.00</b><span>/month</span>
      </div>
    </div>
  );
}

class Slider extends React.Component {

  constructor(props) {
    super(props);
    this.handleTrackBG = () => {
      const sliderWrapper = document.getElementById("slider-wrapper");

      const percent = this.props.parentProps.sliderValue*100/4;

      const trackBackground = `linear-gradient(
      90deg
      , var(--soft-cyan), var(--soft-cyan) ${ percent }%
      , var(--light-grayish-blue-1) ${ percent }%, var(--light-grayish-blue-1)
      )`;

      sliderWrapper.style.setProperty("--track-background", trackBackground);
    }
  }

  componentDidMount() {
    this.handleTrackBG()
  }

  componentDidUpdate() {
    this.handleTrackBG()
  }

  render() {
    return (
      <div id="slider-wrapper" className={`slider-wrapper`}>
        <input 
          type="range"
          min="0"
          max="4"
          onChange={this.props.parentProps.handleSliderChange.bind(this)}
          value={this.props.parentProps.sliderValue}
        />
      </div>
    );
  }
}

const Billing = (props) => {
  return (
    <div className="billing">
      <span>Monthly Billing</span>
      <div
        className={`toggle-wrapper${props.parentProps.discounted ? " discounted" : ""}`}
        onClick={props.parentProps.handleDiscountToggle}
      >
        <button className="toggle-button"/>
      </div>
      <span>
        Yearly Billing
        <span className="discount-abs">
          <span className="discount-wrapper">
            <span className="minus">-</span>25%<span className="text"> discount</span>
          </span>
        </span>
      </span>
    </div>
  );
}

const CardBottom = () => {
  return (
    <div className="card-bottom">
      <hr/>
      <div className="ul-button-wrapper">
        <ul>
          <li>Unlimited websites</li>
          <li>100% data ownership</li>
          <li>Email reports</li>
        </ul>
        <button className="button">
          Start my trial
        </button>
      </div>
    </div>
  );
}