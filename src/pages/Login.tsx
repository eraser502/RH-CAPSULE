import React, { useEffect, useState } from "react";
import { Capsule } from "../components/Capsule";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { makeUser } from "../services/login.services";

export const Login = (props:{setIsLogin:any}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (user: any) => {
          if (user.user.emailVerified) {
            console.log(
              "유저 로그인 성공, 인증 여부:" + user.user.emailVerified
            );
            console.log(auth)
            setLoading(false);
            props.setIsLogin(true)
            // window.location.replace("/main")
            // alert('로그인에 성공했습니다.')
          } else {
            alert("이메일 인증이 필요합니다.");
            // if (!window.confirm("이메일 인증이 필요합니다.")) { return }
            setLoading(false);
          }
        }
      );
    } catch (err: any) {
      setLoading(false);
      alert("로그인 실패\n err :" + err);
    }
  };


  const enterLogin = (e:any) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  }

  // const handleRedirectResult = async () => {
  //   if (auth.currentUser?.uid) {
  //     return;
  //   }
  //   console.log(auth.currentUser);
  //   try {
  //     const result = await getRedirectResult(auth);
  //     console.log(result)
  //     // await makeUser(result);
  //   } catch (err: any) {
  //     console.error("조짐");
  //     throw new Error(err);
  //   }
  //   return;
  // };

  // useEffect(() => {
  //   setLoading(true);
  //   (async () => {
  //     await handleRedirectResult()
  //       .then(() => {
  //         setLoading(false);
  //       })
  //       .catch((err: any) => {
  //         setLoading(false);
  //         alert("로그인 실패\n err : " + err);
  //       });
  //   })();
  // }, [a]);

  

  return (
    <div className="loginContainer">
      <div className="loginTitleBox">
        <div className="loginTitle">모두의 타임캡슐</div>
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
      </div>
      <div className="loginButtonBox">
        <button
          className="loginButton"
          onClick={() => {
            handleLogin();
          }}
        >
          {loading? "로딩중..." :"로그인"}
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
