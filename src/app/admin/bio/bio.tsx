// Bio.tsx
import React, { useState } from 'react';
import { getFirestore, updateDoc, doc} from 'firebase/firestore';
import firebase_app from '../../firebase/config'; // Adjust the import based on your project structure
import { User, getAuth } from 'firebase/auth';

interface BioProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const Bio: React.FC<BioProps> = ({ setStep }) => {
  const [bio, setBio] = useState('');
  const db = getFirestore(firebase_app);
  const auth = getAuth();
  const currentUser = auth.currentUser as User;

  const handleBioChange = (event: { target: { value: string; }; }) => {
    setBio(event.target.value.slice(0, 500)); // Limit the characters to 500
  };

  const saveBioToFirebase = async () => {
    const userDocRef = doc(db, 'users', currentUser.uid);
    try {
      await updateDoc(userDocRef, {
        bio: bio
      });
      setStep(4); // Assuming the next step is 4 or adjust accordingly
    } catch (error) {
      console.error("Error updating bio: ", error);
    }
  };

  return (
    <div className="p-4">
      <textarea
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Enter your bio"
        value={bio}
        onChange={handleBioChange}
        rows={6}
      ></textarea>
      <button
        className="mt-4 bg-indigo-400 hover:bg-indigo-500 text-white py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        onClick={saveBioToFirebase}
      >
        Save Bio
      </button>
    </div>
  );
};

export default Bio;
