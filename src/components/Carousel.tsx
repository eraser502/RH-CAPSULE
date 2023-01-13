import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.scss";
import { GlassButton } from "./GlassButton";

export const Carousel = (props: { setColor: any }) => {
  const settings = {
    slide: "div",
    infinite: true,
    arrows: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: false,
  };

  return (
    <div className="glassSettingBox">
      <div className="glassSettingHeader">캡슐함 색상 고르기</div>
      <Slider {...settings}>
        <div className="glassBox">
          <img className="glass" src="/assets/glass_noShadow_BC2749.png" />
          <GlassButton
            name="색상 결정하기"
            buttonColor="#BC2749"
            onClick={()=>{props.setColor("BC2749")}}
          />
        </div>
        <div className="glassBox">
          <img className="glass" src="/assets/glass_noShadow_ECCDC1.png" />
          <GlassButton
            name="색상 결정하기"
            buttonColor="#ECCDC1"
            onClick={()=>{props.setColor("ECCDC1")}}
          />
        </div>
        <div className="glassBox">
          <img className="glass" src="/assets/glass_noShadow_7FE88A.png" />
          <GlassButton
            name="색상 결정하기"
            buttonColor="#7FE88A"
            onClick={()=>{props.setColor("7FE88A")}}
          />
        </div>
        <div className="glassBox">
          <img className="glass" src="/assets/glass_noShadow_95CBFC.png" />
          <GlassButton
            name="색상 결정하기"
            buttonColor="#95CBFC"
            onClick={()=>{props.setColor("95CBFC")}}
          />
        </div>
        <div className="glassBox">
          <img className="glass" src="/assets/glass_noShadow_AF90EF.png" />
          <GlassButton
            name="색상 결정하기"
            buttonColor="#AF90EF"
            onClick={()=>{props.setColor("AF90EF");console.log("sex")}}
          />
        </div>
      </Slider>
    </div>
  );
};
// class="slick-slide slick-active slick-current"
