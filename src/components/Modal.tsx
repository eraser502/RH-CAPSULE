import React from "react";
import "./Modal.scss";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";
import { handleSignOut } from "../services/login.services";
import { auth } from "../firebase";
import { FiLink } from "react-icons/fi";
import { Carousel } from "./Carousel";

export const Modal = (props: {
  bgClick: any;
  onClickToastPopup?: any;
  name?: string;
}) => {


  return (
    <div className="modalContainer">
      {props.name === "setting" ? (
        <>
          <div className="modalBG" onClick={() => props.bgClick(false)}></div>
          <div className="modalContentBox">
            {/* <span>
              링크 복사 <FiLink />
            </span> */}
            {/* <div className="modalContentLink" onClick={()=>{linkCopy()}}>{urlLink}</div> */}
            <button onClick={() => handleSignOut()}>로그아웃</button>
          </div>
        </>
      ) 
      : null}
    </div>
  );
}; 
// onClick={() => props.bgClick(false)}