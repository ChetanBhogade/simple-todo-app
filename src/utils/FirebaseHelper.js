import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";

export const addNewTask = async (data) => {
  if (!data) return;

  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      ...data,
      id: uuidv4(),
    });
    console.log("Document written with ID: ", docRef.id);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};

export const getAllTasks = async () => {
  const querySnapshot = await getDocs(collection(db, "tasks"));
  let tasksList = [];
  querySnapshot.forEach((doc) => {
    // console.log(`${doc.id} => `, doc);
    tasksList.push(doc.data());
  });
  return tasksList;
};

export const updateTask = async (taskId, toggleAction) => {
  if (!taskId) return;

  try {
    const docRefs = query(collection(db, "tasks"), where("id", "==", taskId));
    const docSnap = await getDocs(docRefs);

    // console.log("size: - ", docSnap.size);
    let documentId = "";
    if (docSnap.size === 1) {
      docSnap.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        documentId = doc.id;
      });
    } else {
      return false;
    }
    const documentRef = doc(db, "tasks", documentId);
    await setDoc(
      documentRef,
      {
        isCompleted: toggleAction,
      },
      { merge: true }
    );
    return true;
  } catch (error) {
    console.log("Error while setting document: - ", error);
    return false;
  }
};
