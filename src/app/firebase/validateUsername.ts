import { collection, getDocs, query, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import firebase_app from "./config";

const db = getFirestore(firebase_app);

// Regex for valid usernames: letters, numbers, underscores, hyphens only
const USERNAME_REGEX = /^[a-zA-Z0-9_-]+$/;
const MIN_LENGTH = 3;
const MAX_LENGTH = 30;

export type UsernameValidationResult = {
  isValid: boolean;
  error?: string;
  isAvailable?: boolean;
};

/**
 * Validates username format (local validation only)
 */
export const validateUsernameFormat = (username: string): UsernameValidationResult => {
  if (!username) {
    return { isValid: false, error: "Username is required" };
  }

  if (username.length < MIN_LENGTH) {
    return { isValid: false, error: `Username must be at least ${MIN_LENGTH} characters` };
  }

  if (username.length > MAX_LENGTH) {
    return { isValid: false, error: `Username must be less than ${MAX_LENGTH} characters` };
  }

  if (!USERNAME_REGEX.test(username)) {
    return { 
      isValid: false, 
      error: "Username can only contain letters, numbers, underscores, and hyphens" 
    };
  }

  return { isValid: true };
};

/**
 * Checks if a username is available (not already taken)
 */
export const checkUsernameAvailability = async (
  username: string,
  currentUserId?: string // Optional: to ignore current user's username when updating
): Promise<UsernameValidationResult> => {
  try {
    const formatValidation = validateUsernameFormat(username);
    if (!formatValidation.isValid) {
      return formatValidation;
    }

    const usersRef = collection(db, "users");
    const usernameQuery = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(usernameQuery);
    
    // If querySnapshot is empty or contains only the current user, username is available
    if (querySnapshot.empty) {
      return { isValid: true, isAvailable: true };
    }
    
    // If updating, check if the username belongs to the current user
    if (currentUserId) {
      const docs = querySnapshot.docs;
      if (docs.length === 1 && docs[0].id === currentUserId) {
        return { isValid: true, isAvailable: true };
      }
    }
    
    return { isValid: false, error: "Username is already taken", isAvailable: false };
  } catch (error) {
    console.error("Error checking username availability:", error);
    return { isValid: false, error: "Failed to check username availability" };
  }
};

/**
 * Comprehensive username validation (format + availability)
 */
export const validateUsername = async (
  username: string,
  currentUserId?: string
): Promise<UsernameValidationResult> => {
  const formatValidation = validateUsernameFormat(username);
  if (!formatValidation.isValid) {
    return formatValidation;
  }
  
  return await checkUsernameAvailability(username, currentUserId);
};

export default validateUsername; 