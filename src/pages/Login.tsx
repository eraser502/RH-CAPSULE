import React, { useState } from "react";
import { Capsule } from "../components/Capsule";
import "./Login.scss";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await
        signInWithEmailAndPassword(auth, email, password)
        .then((user:any) => {
          if (user.user.emailVerified) {         
            console.log(
              '유저 로그인 성공, 인증 여부:' + user.user.emailVerified,
            )
            // navigate("/main")
            window.location.replace("/")
            // alert('로그인에 성공했습니다.')
            // setLoading(false)
            
          } else {
            alert('이메일 인증이 필요합니다.')
            // setLoading(false)
          }
        })
    } catch (err: any) {
      alert("로그인 실패\n err :" + err);
    }
  };

  // const loginCheck=async ()=>{
  //   if(await userCheck() === true){

  //   }
  // }

  return (
    <div className="loginContainer">
      <div className="loginTitleBox">
        <div className="loginTitle">RH-Capsule</div>
        <Capsule width="60px" />
      </div>
      <div className="loginInputBox">
        <input
          placeholder="e-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <div className="loginButtonBox">
        <button className="loginButton" onClick={() => handleLogin()}>
          로그인
        </button>
        <div className="signUpText">
          계정이 없으신가요?{" "}
          <span
            style={{ borderBottom: "1px solid white" }}
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
