import React from "react";
import "./Capsule.scss";

export const Capsule = (props: { width: string; color?: string }) => {
  return (
    <div className="capsuleContainer">
      <div
        className="capsuleLeft"
        style={{ width: props.width, backgroundColor: props.color }}
      ></div>
      <div className="capsuleRight" style={{ width: props.width }}></div>
    </div>
  );
};

interface OpenableCapsulePropsType {
  width: string;
  data?: any;
  onClick: Function;
}

export const OpenableCapsule: React.FC<OpenableCapsulePropsType> = ({
  width,
  data,
  onClick,
}) => {
  return (
    <div className="capsuleContainer" onClick={() => onClick(data)}>
      <div
        className="capsuleLeft"
        style={{ width: width, backgroundColor: data.capsuleColor }}
      ></div>
      <div className="capsuleRight" style={{ width: width }}></div>
    </div>
  );
};
