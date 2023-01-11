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

export const Modal = (props: {
  bgClick: any;
  onClickToastPopup?: any;
  name?: string;
}) => {
  const urlLink: string =
    "https://rh-capsule.firebaseapp.com/capsule/" + auth.currentUser.uid;

  const linkCopy = async () => {
    try {
      navigator.clipboard.writeText(urlLink).then(() => {
        props.onClickToastPopup();
        props.bgClick(false);
      });
    } catch (err: any) {
      console.log(err);
      alert("링크 복사 실패");
    }
  };

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
      ) : props.name === "glassSetting" ? 
      <div className="modalBG" onClick={() => props.bgClick(false)}>
        <div className="modalGlassSettingBox">gd</div>
      </div> 
      : null}
    </div>
  );
};
