import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db} from "../firebase";

export const getData = (uid:string) => {
  let data = localStorage.getItem(uid);
  if (data != null) {
    return true;
  } 
  return false
};

export const setData = (uid:string, isWrite: boolean) => {
  localStorage.setItem(uid, JSON.stringify(isWrite));
}

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
  return {
    capsuleDB: arr[0],
    glassSetting: arr[1],
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

  await setDoc(
    doc(docRef3, "Capsules"),
    {
      capsuleDB: [],
    },
    { merge: true }
  );
};
export const updateCapsuleDB = async (capsule: any, userPath: any, capsuleColorDB:any) => {
  const docRef = collection(db, "user");
  const docRef2 = doc(docRef, userPath);
  const docRef3 = collection(docRef2, "MyGlass");
  let idx = capsuleColorDB.length;
  // await updateDoc(doc(docRef3, "Capsules"), {
  //   capsuleDB: capsuleDB,
  // });
  await setDoc(
    doc(docRef3, "Capsules"),
    {
      [`capsule${idx}`]:capsule
    },
    { merge: true }
  );
  await updateDoc(
    doc(docRef3, "Me"),
    {
      capsuleColorDB:capsuleColorDB
    },
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
  let arr: any = [];
  let tmpObj: any = {};

  return{
    name: querySnapshot1.data().userName,
    capsuleColorDB: querySnapshot2.data().capsuleColorDB,
    color: querySnapshot2.data().glassColor,
    openDate:querySnapshot2.data().openDate,
  }
};
