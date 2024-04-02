// signout.ts
import { getAuth, signOut as firebaseSignOut } from "firebase/auth";
import firebase_app from "./config"; // Adjust the import path if necessary

const auth = getAuth(firebase_app);

const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};

export default signOut;
