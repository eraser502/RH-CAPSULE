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
          <img className="glass" src="/assets/glass_BD284A.png" />
          <GlassButton
            name="색상 결정하기"
            buttonColor="#BD284A"
            onClick={()=>{props.setColor("BD284A")}}
          />
        </div>
        <div className="glassBox">
          <img className="glass" src="/assets/glass_AC96D6.png" />
          <GlassButton
            name="색상 결정하기"
            buttonColor="#AC96D6"
            onClick={()=>{props.setColor("AC96D6")}}
          />
        </div>
        <div className="glassBox">
          <img className="glass" src="/assets/glass_8DB6CC.png" />
          <GlassButton
            name="색상 결정하기"
            buttonColor="#8DB6CC"
            onClick={()=>{props.setColor("8DB6CC")}}
          />
        </div>
        <div className="glassBox">
          <img className="glass" src="/assets/glass_CCC89B.png" />
          <GlassButton
            name="색상 결정하기"
            buttonColor="#CCC89B"
            onClick={()=>{props.setColor("CCC89B")}}
          />
        </div>
        <div className="glassBox">
          <img className="glass" src="/assets/glass_D6B89C.png" />
          <GlassButton
            name="색상 결정하기"
            buttonColor="#D6B89C"
            onClick={()=>{props.setColor("D6B89C")}}
          />
        </div>
      </Slider>
    </div>
  );
};
// class="slick-slide slick-active slick-current"
