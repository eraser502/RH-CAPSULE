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
        color: props.buttonColor === "#BD284A" ? "white" : "",
      }}
    >
      {props.name}
    </button>
  );
};
