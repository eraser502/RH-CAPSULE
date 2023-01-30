import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { uuidv4 } from "@firebase/util";

export const getData = (uid: string) => {
  let data = localStorage.getItem(uid);
  if (data != null) {
    return true;
  }
  return false;
};

export const setData = (uid: string, isWrite: boolean) => {
  localStorage.setItem(uid, JSON.stringify(isWrite));
};

export const getGlassSetting = async () => {
  //todo 값을 db에서 받아옴
  const docRef = collection(db, "user");
  const docRef2 = doc(docRef, auth.currentUser?.uid);
  const docRef3 = collection(docRef2, "MyGlass");

  const querySnapshot1 = await getDocs(docRef3);
  let arr: any = [];
  let tmpObj: any = {};
  querySnapshot1.forEach((doc) => {
    tmpObj = doc.data();
    tmpObj.id = doc.id;
    arr = [...arr, tmpObj];
  });
  if (arr.length === 0) {
    return undefined;
  }
  let tmp = Object.values(arr[2]);
  tmp.splice(tmp.length - 1, 1)
  return {
    capsuleDB: arr[0],
    glassSetting: arr[1],
    capsuleColorDB: tmp,
  };
};

export const setMyCapsule = async (obj: any) => {
  const docRef = collection(db, "user");
  const docRef2 = doc(docRef, auth.currentUser?.uid);
  const docRef3 = collection(docRef2, "MyCapsule");

  await setDoc(
    doc(docRef3),
    {
      title: obj.title,
      content: obj.content,
      writer: obj.writer,
      createdAt: obj.createdAt,
    },
    { merge: true }
  );
};
export const setCapsuleDB = async () => {
  const docRef = collection(db, "user");
  const docRef2 = doc(docRef, auth.currentUser?.uid);
  const docRef3 = collection(docRef2, "MyGlass");

  await setDoc(doc(docRef3, "Capsules"), {}, { merge: true });
  await setDoc(doc(docRef3, "tCapsuleColors"), {}, { merge: true });
};

export const updateCapsuleDB = async (
  capsule: any,
  userPath: any,
  capsuleColor: any
) => {
  const docRef = collection(db, "user");
  const docRef2 = doc(docRef, userPath);
  const docRef3 = collection(docRef2, "MyGlass");
  // let idx = capsuleColorDB.length;
  // await updateDoc(doc(docRef3, "Capsules"), {
  //   capsuleDB: capsuleDB,
  // });
  const uid = uuidv4();
  await setDoc(
    doc(docRef3, "Capsules"),
    {
      // [`capsule${idx}`]:capsule
      [uid]: capsule,
    },
    { merge: true }
  );
  await updateDoc(
    doc(docRef3, "tCapsuleColors"),
    // doc(docRef3, "Me"),
    {
      [uid]: capsuleColor,
    }
  );
};

export const setGlassSetting = async (obj: any) => {
  const docRef = collection(db, "user");
  const docRef2 = doc(docRef, auth.currentUser?.uid);
  const docRef3 = collection(docRef2, "MyGlass");

  await setDoc(doc(docRef3, "Me"), obj, { merge: true });
};

export const getGuestData = async (userId: any) => {
  //todo 값을 db에서 받아옴
  const docRef = collection(db, "user");

  const querySnapshot1: any = await getDoc(doc(docRef, userId));

  const docRef2 = doc(docRef, userId);
  const docRef3 = collection(docRef2, "MyGlass");

  const querySnapshot2: any = await getDoc(doc(docRef3, "Me"));
  const querySnapshot3: any = await getDoc(doc(docRef3, "tCapsuleColors"));
  let colorArr;

  // if (querySnapshot3.data()) {
  //   colorArr = Object.values(querySnapshot3.data());
  //   console.log(colorArr);
  // }

  return {
    name: querySnapshot1.data().userName,
    capsuleColorDB: Object.values(querySnapshot3.data()),
    color: querySnapshot2.data().glassColor,
    openDate: querySnapshot2.data().openDate,
  };
};
