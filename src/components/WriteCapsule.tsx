import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { Button } from "./Button";
import "./WriteCapsule.scss";

export const WriteCapsule = (props: { setIsWriteOpen: any }) => {
  return (
    <div className="WCContainer">
      <div className="WCHeader">
        <BiArrowBack
          onClick={() => {
            props.setIsWriteOpen(false);
          }}
        />
      </div>
      <div className="WCBox">
        <div className="WCContent"></div>
      </div>
      <Button bottom = "20px" name="타임캡슐 만들기" btnClick={()=>{props.setIsWriteOpen(false)}} />
    </div>
  );
};
