import firebase_app from "./config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

import { getFirestore, doc, updateDoc } from "firebase/firestore";

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

export default async function signIn(email: string, password: string) {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
    const uid = result.user.uid;
    
  } catch (e) {
    var errorMsg = e;
    console.log("Error signing in", errorMsg);    }

  return { result, error };
}
