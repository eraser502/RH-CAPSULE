import React from "react";
import "./GlassButton.scss";
export const GlassButton = (props: {
  name: string;
  buttonColor: string;
  onClick: any;
}) => {
  return (
    <button
      className="glassButton"
      onClick={() => props.onClick()}
      style={{
        backgroundColor: props.buttonColor,
        color:"#eaeaea",
        fontWeight:"400"
      }}
    >
      {props.name}
    </button>
  );
};
