import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, createUserWithEmailAndPassword } from "../firebase";
import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  sendEmailVerification,
} from "firebase/auth";

export const joinWithVerification = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(auth.currentUser);
    alert("이메일 전송완료, 확인요망");
  } catch (err: any) {
    // console.error(err)
    alert("유효하지않은 이메일");
  }
};
//여기안에 makeuser 넣으셈
// export const userCheck = async (email: string, password: string) => {
//   await signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed in
//         if(auth.currentUser.emailVerified === true){
//             const user = userCredential.user;
//             console.log(user);
//         }else{
//             handleSignOut();
//         }
        
//       // ...
//     })
//     .catch((error) => {
//       // const errorCode = error.code;
//       // const errorMessage = error.message;
//       console.error(error);
//     });
// };

export const handleSignOut = async () => {
  await auth.signOut();
  return;
};

