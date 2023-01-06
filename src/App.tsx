import './App.css';
import React, { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { auth } from './firebase';
import { Login } from './pages/Login';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [loading, setLoading] = useState<boolean>(true)
  const [isLogin, setIsLogin] = useState<boolean>(false)
  
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => { // user 판명을 듣고 
  //     if(user) { // 있으면
  //       console.log('O')
  //       setIsLogin(true); // 로그인 됨
  //     } else {
  //       console.log('X')
  //       setIsLogin(false); // 로그인 안됨
  //     }
  //     setLoading(false);
  //   });
  // }, [])

  return (
    <div>
      <BrowserRouter>
        {loading === false && isLogin ?
          <Routes>
            <Route path='/' element={<Navigate to='profile' />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/diary' element={<Diary />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/plan' element={<Plan />} />
            <Route path='/*' element={<Navigate to='profile' />} />

          </Routes>
          :
          <Routes>
            <Route path='/' element={<Navigate to='login' />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Navigate to='login' />} />
          </Routes>
        }

      </BrowserRouter>
      {loading ? <div>lodaing</div> : <div></div>}
    </div>
  );
}

export default App;
