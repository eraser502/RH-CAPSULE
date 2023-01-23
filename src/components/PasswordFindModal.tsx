import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import "./PasswordFindModal.scss";
export const PasswordFindModal = (props: any) => {
  const [email, setEmail] = useState("");
  const findPassword = async () => {
    try {
      if (email != "") {
        await sendPasswordResetEmail(auth, email).then(() => {});
      }else{
        alert("이메일을 입력해주세요.");
      }
    } catch (err) {
      alert("이메일 형식이 올바르지 않습니다.");
    }
  };
  return (
    <div className="PFModalContainer">
      <div className="PFModalBG" onClick={() => props.bgClick(false)}></div>
      <div className="PFModalContentBox">
        <div className="PFTitle">비밀번호 찾기</div>
        <input
        className="PFInput"
          onChange={(e: any) => setEmail(e.target.value)}
          value={email}
          placeholder="가입하신 이메일을 입력해주세요."
        />
        <button className="PFButton" onClick={() => findPassword()}>찾기</button>
      </div>
    </div>
  );
};
