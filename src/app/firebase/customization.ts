import { getFirestore, doc, getDoc, updateDoc, collection, query, where, getDocs, limit } from 'firebase/firestore';
import firebase_app from './config';
import { CustomizationSettings, DEFAULT_CUSTOMIZATION } from '../types/customization';

const db = getFirestore(firebase_app);

/**
 * Fetches customization settings for a user
 * @param userId The user ID to fetch settings for
 * @returns The user's customization settings or default settings if not found
 */
export async function getUserCustomizationSettings(userId: string): Promise<CustomizationSettings> {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDocSnap = await getDoc(userDocRef);
    
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      
      // If user has customization settings, return them
      if (userData.customization) {
        return {
          ...DEFAULT_CUSTOMIZATION, // Use defaults for any missing properties
          ...userData.customization,
        };
      }
    }
    
    // Return default settings if user doesn't exist or has no customization
    return DEFAULT_CUSTOMIZATION;
    
  } catch (error) {
    console.error('Error fetching user customization settings:', error);
    return DEFAULT_CUSTOMIZATION;
  }
}

/**
 * Saves customization settings for a user
 * @param userId The user ID to save settings for
 * @param settings The customization settings to save
 * @returns True if successful, False if failed
 */
export async function saveUserCustomizationSettings(
  userId: string, 
  settings: CustomizationSettings
): Promise<boolean> {
  try {
    const userDocRef = doc(db, 'users', userId);
    
    // Create a clean copy of settings, removing any top-level undefined properties.
    // This ensures that Firestore correctly removes fields that are meant to be unset.
    const cleanedSettings: { [key: string]: any } = {};
    for (const key in settings) {
      if (Object.prototype.hasOwnProperty.call(settings, key) && settings[key as keyof CustomizationSettings] !== undefined) {
        cleanedSettings[key] = settings[key as keyof CustomizationSettings];
      }
    }
    
    // Update the customization field in the user document with the cleaned settings
    await updateDoc(userDocRef, {
      customization: cleanedSettings,
      lastUpdated: new Date()
    });
    
    return true;
  } catch (error) {
    console.error('Error saving user customization settings:', error);
    return false;
  }
}

/**
 * Fetches customization settings for a user by username
 * @param username The username to fetch settings for
 * @returns The user's customization settings or default settings if not found
 */
export async function getCustomizationSettingsByUsername(username: string): Promise<CustomizationSettings> {
  try {
    // First, get user document by username
    const usersCollection = collection(db, 'users');
    const userQuery = query(usersCollection, where('username', '==', username), limit(1));
    const querySnapshot = await getDocs(userQuery);
    
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      
      // If user has customization settings, return them
      if (userData.customization) {
        return {
          ...DEFAULT_CUSTOMIZATION, // Use defaults for any missing properties
          ...userData.customization,
        };
      }
    }
    
    // Return default settings if user doesn't exist or has no customization
    return DEFAULT_CUSTOMIZATION;
    
  } catch (error) {
    console.error('Error fetching customization settings by username:', error);
    return DEFAULT_CUSTOMIZATION;
  }
} 