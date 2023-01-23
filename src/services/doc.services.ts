import { UserCredential } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db, storage } from "../firebase";

export const getGlassSetting = async () => {
  //todo 값을 db에서 받아옴
  const docRef = collection(db, "user");
  const docRef2 = doc(docRef, auth.currentUser?.uid);
  const docRef3 = collection(docRef2, "MyGlass");

  const querySnapshot = await getDocs(docRef3);

  let arr: any = [];
  let tmpObj: any = {};
  querySnapshot.forEach((doc) => {
    tmpObj = doc.data();
    tmpObj.id = doc.id;
    arr = [...arr, tmpObj];
  });
  if (arr.length === 0) {
    return undefined;
  }
  return {
    capsuleDB: arr[0].capsuleDB,
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
export const updateCapsuleDB = async (capsuleDB: any, userPath:any) => {
  const docRef = collection(db, "user");
  const docRef2 = doc(docRef, userPath);
  const docRef3 = collection(docRef2, "MyGlass");

  await updateDoc(doc(docRef3, "Capsules"), {
    capsuleDB: capsuleDB,
  });
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

  const querySnapshot2 = await getDocs(docRef3);

  let arr: any = [];
  let tmpObj: any = {};
  querySnapshot2.forEach((doc) => {
    tmpObj = doc.data();
    tmpObj.id = doc.id;
    arr = [...arr, tmpObj];
  });
  return {
    name: querySnapshot1.data().userName,
    capsuleDB: arr[0].capsuleDB,
    color: arr[1].glassColor,
  };

};


