import { UserCredential } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import { auth, db, storage } from "../firebase";

export const getGlassSetting = async () => {
    //todo 값을 db에서 받아옴
    const docRef = collection(db, "user");
    const docRef2 = doc(docRef, auth.currentUser?.uid)
    const docRef3 = collection(docRef2, "MyGlass")

    const querySnapshot = await getDoc(doc(docRef3,"Me"));
    // console.log(querySnapshot.data())
    return querySnapshot.data();
    
}

export const setMyCapsule = async (obj:any) => {
    const docRef = collection(db, "user");
    const docRef2 = doc(docRef, auth.currentUser?.uid)
    const docRef3 = collection(docRef2, "MyCapsule")

    await setDoc(doc(docRef3),
    {
        title:obj.title,
        content:obj.content,
        writer:obj.writer,
        createdAt:obj.createdAt
    }, { merge: true })
}
export const setGlassSetting = async (obj:any) => {
    const docRef = collection(db, "user");
    const docRef2 = doc(docRef, auth.currentUser?.uid)
    const docRef3 = collection(docRef2, "MyGlass")

    await setDoc(doc(docRef3, "Me"),
       obj
    , { merge: true })
}

export const updateTodo = async () => {
    //서버의 todo db 값을 props값으로 바꿔줌 
    const docRef = collection(db, "user");
    const docRef2 = doc(docRef, auth.currentUser?.uid);
    const docRef3 = collection(docRef2, "TODOLIST");
    await updateDoc(doc(docRef3, "TODO"), {
    });
}

export const deleteTDL = async () => {
    const docRef = collection(db, "user");
    const docRef2 = doc(docRef, auth.currentUser?.uid);
    const docRef3 = collection(docRef2, "plan");
    await deleteDoc(doc(docRef3));
}

//================================================================
export const setReceivedCapsules = async (obj:any) => {
    const docRef = collection(db, "user");
    const docRef2 = doc(docRef, auth.currentUser?.uid)
    const docRef3 = collection(docRef2, "ReceivedCapsules")

    await setDoc(doc(docRef3),
        {
            title:obj.title,
            content:obj.content,
            writer:obj.writer,
            createdAt:obj.createdAt
        }, { merge: true })
}

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