import firebase_app from "./config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  query,
  where,
  getDocs,
  updateDoc,
  collection,
  increment,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

async function signUp(
  username: string,
  email: string,
  password: string,
) {
  // Check if the username exists
  const usersRef = collection(db, "users");
  const usernameQuery = query(usersRef, where("username", "==", username));
  const usernameSnapshot = await getDocs(usernameQuery);
  if (!usernameSnapshot.empty) {
    return { error: { message: "Username already exists" } };
  }

  

  try {
    // Proceed with user creation
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    const uid = user.uid;

    // Set user document in Firestore
    await setDoc(doc(db, "users", uid), {
      id: uid,
      username: username,
      isSubscribed: false,
      email: email,
      dateJoined: serverTimestamp(),
      industries: [],
      bio: "",
      profilePicture: "",
      
    });


    return { result };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      error: {
        message: "Failed to sign up. Please check your details and try again.",
      },
    };
  }
}

export default signUp;
