import React, { useState } from "react";
import { Capsule } from "../components/Capsule";
import "./SignUp.scss";
import { useNavigate } from "react-router-dom";
import { joinWithVerification, makeUser } from "../services/login.services";

export const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  let passwordCheck = password === password2 && password.length > 5 && name;

  const handleSignUp = async () => {
    setLoading(true);
    const signUpSuccess = await joinWithVerification(name, email, password);
    if (signUpSuccess) {
      navigate("/login");
    }
    setLoading(false);
  };

  return (
    <div className="signUpContainer">
      <div className="signUpTitleBox">
        <div className="signUpTitle">적어줘! 타임캡슐</div>
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
        {email.length > 12 && (!email.includes("@") || !email.includes(".")) ? (
          <div style={{ color: "red", fontSize: "14px" }}>
            *이메일 형식에 맞지 않습니다.
          </div>
        ) : null}

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
        {password.length > 5 &&
        password2.length > 5 &&
        password != password2 ? (
          <div style={{ color: "red", fontSize: "14px" }}>
            *비밀번호가 일치하지 않습니다.
          </div>
        ) : password.length < 6 ? (
          <div style={{ color: "gray", fontSize: "14px" }}>
            *비밀번호는 6자리 이상이어야 합니다.
          </div>
        ) : null}
      </div>
      <div className="signUpButtonBox">
        <button
          className="signUpButton"
          onClick={() => {
            handleSignUp();
          }}
          disabled={!passwordCheck}
          style={passwordCheck ? {} : { backgroundColor: "#e0e0e0" }}
        >
          {loading ? "회원가입중..." : "회원가입"}
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
