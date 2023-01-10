import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { db, auth } from "../firebase";
import { getDoc, doc, setDoc, connectFirestoreEmulator, collection } from "firebase/firestore";
import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  sendEmailVerification,
} from "firebase/auth";

export const joinWithVerification = async (name : string, email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(auth.currentUser);
    alert("이메일 전송완료, 확인요망");
    await updateProfile(auth.currentUser, { displayName: name});
  } catch (err: any) {
    // console.error(err)
    alert(err);
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

export const makeUser = async () => {
    
  // The signed-in user info.
  const user = auth.currentUser;

  if ((await getDoc(doc(db, 'user', user.uid))).exists()) { return }
  await setDoc(doc(db, "user", user.uid), {
      userEmail: user.email,
      userName: user.displayName,
  }, { merge: true }).catch((err) => console.log(err))

  return
}
