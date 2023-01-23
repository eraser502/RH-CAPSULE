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
import { GlassButton } from "./GlassButton";

export const Modal = (props: {
  bgClick: any;
  onClickToastPopup?: any;
  name?: string;
  color: string;
}) => {
  const urlLink: string = "teamrh229@gmail.com";

  const linkCopy = async () => {
    try {
      navigator.clipboard.writeText(urlLink).then(() => {
        props.onClickToastPopup("Email");
      });
    } catch (err: any) {
      // console.log(err);
      alert("Email 복사 실패");
    }
  };

  return (
    <>
      {props.name === "setting" ? (
        <>
          <div className="modalBG" onClick={() => props.bgClick(false)}></div>
          <div className="modalContentBox">
            <div style={{ textAlign: "center", color: "black",fontWeight:"400",fontSize:"20px" }}>
              사용 중 오류사항이나 불편한 점이 생기면
              <br />
              아래 이메일로 문의 바랍니다🙏
              <br />
              <br />
              <span
                onClick={() => {
                  linkCopy();
                }}
                style={{
                  backgroundColor: "white",
                  color: "black",
                  padding: "4px 12px",
                  borderRadius: "8px",
                  fontWeight:"400",
                  fontSize:"20px"
                }}
              >
                teamrh229@gmail.com
              </span>
            </div>
            <button
              style={{
                padding: "4px 16px",
                border: "none",
                borderRadius: "8px",
                backgroundColor: "white",
                fontWeight:"400",
                color:"black",
                fontSize:"16px"
              }}
              onClick={() => {
                handleSignOut();
              }}
            >
              로그아웃
            </button>
          </div>
        </>
      ) : props.name === "info" ? (
        <>
          <div className="modalBG" onClick={() => props.bgClick(false)}></div>
          <div className="modalContentBox2">
            <div className="infoTitle">공지사항</div>
            <div className="infoContent">
              캡슐 작성은 봉인일자까지 가능하며,
              <br />
              선택하신 개봉일자에 가입하신 이메일로
              <br />
              사이트 주소를 보내드릴 예정입니다.
              <br />
              <br />
              적어줘! 타임캡슐을 이용해 주셔서 감사합니다.
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
// onClick={() => props.bgClick(false)}
