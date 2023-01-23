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
    alert("이메일 전송완료. 이메일을 확인해주세요. \n이메일이 오지 않으셨다면 스팸함을 확인해주세요.");
    await updateProfile(auth.currentUser, { displayName: name});
    return true
  } catch (err: any) {
    if(err.message === "Firebase: Error (auth/email-already-in-use)."){
      alert("이미 존재하는 이메일입니다.");
      return false
    }else{
      alert(err)
      return true
    }
  }
};

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
