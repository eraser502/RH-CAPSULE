import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { auth } from './firebase';
import { Login } from "./pages/Login";
// import { onAuthStateChanged } from 'firebase/auth';
import { Main } from "./pages/Main";
import { Open } from "./pages/Open";
import { GuestMain } from "./pages/GuestMain";
import { SignUp } from "./pages/SignUp";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
import { makeUser } from "./services/login.services";
import { Block } from "./pages/Block";

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && auth.currentUser.emailVerified) {
        // console.log('App 인증:' + auth.currentUser.emailVerified)
        setIsLogin(true)
      } else {
        setIsLogin(false)
      }
      setLoading(false)
    })
  }, [])
  


  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <BrowserRouter>
        {loading === false && isLogin ? (
          <Routes>
            <Route path="/" element={<Navigate to="open" />} />
            {/* <Route path="/main" element={<Main />} /> */}
            <Route path="/open" element={<Open />} />
            {/* <Route path="/" element={<Navigate to="main" />} />
            <Route path="/main" element={<Main />} /> */}
            <Route path="/capsule/:userId" element={<GuestMain />} />
            <Route path="/*" element={<Navigate to="open" />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Navigate to="login" />} />
            <Route path="/login" element={<Login setIsLogin={(e:any)=>{setIsLogin(e);makeUser();}} />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/capsule/:userId" element={<GuestMain />} />
            <Route path="*" element={<Navigate to="login" />} />
          </Routes>
        )}
        {/* <Routes>
            <Route path="*" element={<Navigate to="block" />} />
            <Route path="/block" element={<Block />} />
        </Routes> */}
      </BrowserRouter>
      {loading ? <div>lodaing</div> : <div></div>}
    </div>
  );
}

export default App;
