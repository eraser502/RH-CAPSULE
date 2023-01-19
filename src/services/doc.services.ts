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

  //   const querySnapshot1: any = await getDoc(doc(docRef3, "Me"));
  //   const querySnapshot2: any = await getDoc(doc(docRef3, "Capsules"));
  // console.log(querySnapshot.data())
  const querySnapshot = await getDocs(docRef3);

  let arr: any = [];
  let tmpObj: any = {};
  querySnapshot.forEach((doc) => {
    //console.log(doc.id, " => ", doc.data());
    tmpObj = doc.data();
    tmpObj.id = doc.id;
    arr = [...arr, tmpObj];
  });
  console.log(arr);
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
export const updateCapsuleDB = async (capsuleDB: any) => {
  const docRef = collection(db, "user");
  const docRef2 = doc(docRef, auth.currentUser?.uid);
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
  //   const querySnapshot2: any = await getDoc(doc(docRef3, "Capsules"));
  //   const querySnapshot3: any = await getDoc(doc(docRef3, "Me"));

  const querySnapshot2 = await getDocs(docRef3);

  let arr: any = [];
  let tmpObj: any = {};
  querySnapshot2.forEach((doc) => {
    //console.log(doc.id, " => ", doc.data());
    tmpObj = doc.data();
    tmpObj.id = doc.id;
    arr = [...arr, tmpObj];
  });
  console.log(arr);
  return {
    name: querySnapshot1.data().userName,
    capsuleDB: arr[0].capsuleDB,
    color: arr[1].glassColor,
  };

  //   return {
  //     name: querySnapshot1.data().userName,
  //     capsuleDB: querySnapshot2.data().capsuleDB,
  //   };
};

export const updateTodo = async () => {
  //서버의 todo db 값을 props값으로 바꿔줌
  const docRef = collection(db, "user");
  const docRef2 = doc(docRef, auth.currentUser?.uid);
  const docRef3 = collection(docRef2, "TODOLIST");
  await updateDoc(doc(docRef3, "TODO"), {});
};

export const deleteTDL = async () => {
  const docRef = collection(db, "user");
  const docRef2 = doc(docRef, auth.currentUser?.uid);
  const docRef3 = collection(docRef2, "plan");
  await deleteDoc(doc(docRef3));
};

//================================================================
export const setReceivedCapsules = async (obj: any) => {
  const docRef = collection(db, "user");
  const docRef2 = doc(docRef, auth.currentUser?.uid);
  const docRef3 = collection(docRef2, "ReceivedCapsules");

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

//Note DB
// export const getNote = async () => {
//     //todo 값을 db에서 받아옴
//     const docRef = collection(db, "user");
//     const docRef2 = doc(docRef, auth.currentUser?.uid)

//     const docRef3 = collection(docRef2, "NoteDir");
//     //const docRef4 = doc(docRef3, date);

//     const querySnapshot = await getDoc(doc(docRef3,"Note"));
//     // let arr = [];
//     // querySnapshot.forEach((doc) => {
//     //     //console.log(doc.id, " => ", doc.data());
//     //     arr[doc.id] = doc.data();
//     // });
//     return querySnapshot.data().noteDB;
// }

// export const setNote = async () => {
//     //todo db를 서버에 생성
//     const docRef = collection(db, "user");
//     const docRef2 = doc(docRef, auth.currentUser?.uid)
//     const docRef3 = collection(docRef2, "NoteDir")

//     await setDoc(doc(docRef3, "Note"),
//         {
//             noteDB : []
//         }, { merge: true })
// }

// export const updateNote = async (NoteDB) => {
//     //서버의 todo db 값을 props값으로 바꿔줌
//     const docRef = collection(db, "user");
//     const docRef2 = doc(docRef, auth.currentUser?.uid);
//     const docRef3 = collection(docRef2, "NoteDir");
//     await updateDoc(doc(docRef3, "Note"), {
//         noteDB: NoteDB
//     });
// }

// export const deleteNote = async (kind) => {
//     const docRef = collection(db, "user");
//     const docRef2 = doc(docRef, auth.currentUser?.uid);
//     const docRef3 = collection(docRef2, "NoteDir");
//     await deleteDoc(doc(docRef3, kind));
// }
