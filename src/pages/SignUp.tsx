import React, { useState } from "react";
import { Capsule } from "../components/Capsule";
import "./SignUp.scss";
import { useNavigate } from 'react-router-dom';
import { joinWithVerification } from '../services/login.services';

export const SignUp = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="signUpContainer">
      <div className="signUpTitleBox">
        <div className="signUpTitle">RH-Capsule</div>
        <Capsule width="60px" />
      </div>
      <div className="signUpInputBox">
        <input placeholder="e-mail" onChange={(e)=>setEmail(e.target.value)} value={email}/>
        <input placeholder="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
      </div>
      <div className="signUpButtonBox">
        <button className="signUpButton" onClick={() => {navigate("/login"); joinWithVerification(email, password)}}>회원가입</button>
      </div>
    </div>
  );
};
