import React, { useEffect, useState } from "react";
import { Capsule } from "../components/Capsule";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { makeUser } from "../services/login.services";
import { PasswordFindModal } from "../components/PasswordFindModal";

export const Login = (props: { setIsLogin: any }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordFind, setIsPasswordFind] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (user: any) => {
          if (user.user.emailVerified) {
            // console.log(
            //   "유저 로그인 성공, 인증 여부:" + user.user.emailVerified
            // );
            // console.log(auth);
            setLoading(false);
            props.setIsLogin(true);
            // window.location.replace("/main")
            // alert('로그인에 성공했습니다.')
          } else {
            alert("이메일 인증이 필요합니다. \n이메일을 확인해주세요.");
            // if (!window.confirm("이메일 인증이 필요합니다.")) { return }
            setLoading(false);
          }
        }
      );
    } catch (err: any) {
      setLoading(false);
      //Firebase: Error (auth/invalid-email).
      //Firebase: Error (auth/wrong-password).
      if (
        err.message === "Firebase: Error (auth/invalid-email)." ||
        err.message === "Firebase: Error (auth/wrong-password)."
      ) {
        alert("이메일 또는 비밀번호가 틀립니다.");
        setIsPasswordFind(true);
      } else {
        alert("로그인 실패\n err :" + err);
      }
    }
  };

  const enterLogin = (e: any) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginTitleBox">
        <div className="loginTitle">적어줘! 타임캡슐</div>
        <Capsule width="60px" />
      </div>
      <div className="loginInputBox">
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
          onKeyPress={(e) => {
            if (e.key === "Enter") handleLogin();
          }}
        />
        {isPasswordFind ? (
          <div className="signUpText">
            비밀번호를 잊으셨나요?{" "}
            <span
              style={{ borderBottom: "1px solid gray" }}
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              비밀번호 찾기
            </span>
          </div>
        ) : null}
        {isModalOpen ? (
          <PasswordFindModal bgClick={() => setIsModalOpen(false)} />
        ) : null}
      </div>
      <div className="loginButtonBox">
        <button
          className="loginButton"
          onClick={() => {
            if(email && password){
              handleLogin();
            }else{
              alert("이메일과 패스워드를 입력해주세요")
            }
          }}
        >
          {loading ? "로그인중..." : "로그인"}
        </button>

        <div className="signUpText">
          계정이 없으신가요?{" "}
          <span
            style={{ borderBottom: "1px solid gray" }}
            onClick={() => navigate("/signUp")}
          >
            신규등록
          </span>
        </div>
      </div>
    </div>
  );
};
// onClick={()=>loginCheck()}
