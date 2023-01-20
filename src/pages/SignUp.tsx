import React, { useState } from "react";
import { Capsule } from "../components/Capsule";
import "./SignUp.scss";
import { useNavigate } from "react-router-dom";
import { joinWithVerification } from "../services/login.services";

export const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  let passwordCheck = (password === password2) && (password.length > 5);
  
  return (
    <div className="signUpContainer">
      <div className="signUpTitleBox">
        <div className="signUpTitle">모두의 타임캡슐</div>
        <Capsule width="60px" />
      </div>
      <div className="signUpInputBox">
        <input
          placeholder="이름"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          placeholder="이메일"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="비밀번호"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              navigate("/login");
              joinWithVerification(name, email, password);
            }
          }}
          onChange={(e) => setPassword2(e.target.value)}
          value={password2}
        />
      </div>
      <div className="signUpButtonBox">
        <button
          className="signUpButton"
          onClick={() => {
            navigate("/login");
            joinWithVerification(name, email, password);
          }}
          disabled={!passwordCheck}
          style={ passwordCheck ? {} : { backgroundColor: "#e0e0e0" }}
        >
          회원가입
        </button>
        <div className="signUpText">
          <span
            style={{ borderBottom: "1px solid gray" }}
            onClick={() => navigate("/login")}
          >
            로그인으로 돌아가기
          </span>
        </div>
      </div>
    </div>
  );
};
