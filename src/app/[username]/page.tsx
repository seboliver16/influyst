import { getFirestore, collection, query, where, getDocs, doc, getDoc } from "firebase/firestore/lite";
import firebase_app from "../firebase/config";
import { User } from "../user";
import { CustomizationSettings, DEFAULT_CUSTOMIZATION } from "../types/customization";
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { UserProfileContent } from '../../components/UserProfileContent';

// Generate dynamic metadata for better SEO
export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
  const userData = await fetchUserData(params.username);
  if (!userData) return { title: 'Profile Not Found | Influyst' };
  
  const { user } = userData;
    return {
    title: `${user.name || user.username} | Influyst`,
    description: user.bio || `Check out ${user.name || user.username}'s profile on Influyst`,
    openGraph: {
      title: `${user.name || user.username} | Influyst`,
      description: user.bio || `Check out ${user.name || user.username}'s profile on Influyst`,
      images: user.profilePicture ? [user.profilePicture] : undefined,
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${user.name || user.username} | Influyst`,
      description: user.bio || `Check out ${user.name || user.username}'s profile on Influyst`,
      images: user.profilePicture ? [user.profilePicture] : undefined,
    }
  };
}

export default async function UserProfilePage({ params }: { params: { username: string } }) {
  const userData = await fetchUserData(params.username);

  if (!userData) {
    notFound();
  }

  const { user, customization } = userData;
  const customizationData = customization && typeof customization === 'object' ? customization : {};
  const effectiveCustomization = { ...DEFAULT_CUSTOMIZATION, ...customizationData };

  return (
      <UserProfileContent 
         user={user} 
         customization={effectiveCustomization} 
         // viewMode is not needed here as it's the actual public page
       />
  );
}

async function fetchUserData(username: string): Promise<{ user: User; customization: CustomizationSettings } | null> {
  try {
    const db = getFirestore(firebase_app);
    
    const usersCollection = collection(db, "users");
    const userQuery = query(usersCollection, where("username", "==", username));
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.empty) {
      console.log("No user found with the provided username:", username);
      return null;
    }

    const userDoc = querySnapshot.docs[0];
    const fetchedUserData = { id: userDoc.id, ...userDoc.data() } as User;

    // Fetch customization settings from the user document itself
    let fetchedCustomization: CustomizationSettings = DEFAULT_CUSTOMIZATION;
    if (fetchedUserData.customization && typeof fetchedUserData.customization === 'object') {
      // Merge with defaults to ensure all properties are present, 
      // and user's settings override defaults.
      fetchedCustomization = {
        ...DEFAULT_CUSTOMIZATION,
        ...fetchedUserData.customization,
      };
    } else {
      // If no customization field or it's not an object, stick to defaults.
      // This case should ideally not happen if saving always creates the field.
      console.log(`No customization field found for user ${fetchedUserData.id}, using defaults.`);
    }

    return { user: fetchedUserData, customization: fetchedCustomization };

  } catch (error) {
    console.error("Error fetching user data for profile page:", error);
    return null;
  }
}
