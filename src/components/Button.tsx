import React from "react";
import "./Button.scss";
import "../theme/variable.css";

export const Button = (props: {
  bottom: string;
  name: string;
  btnClick: any;
  btColor?: any;
}) => {
  return (
    <button
      className="RCButton"
      onClick={() => props.btnClick()}
      style={{ bottom: props.bottom, backgroundColor: "#" + props.btColor }}
    >
      {props.name}
    </button>
  );
};
