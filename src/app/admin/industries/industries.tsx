import React, { useState } from 'react';
import firebase_app from '../../firebase/config'; // Ensure this path is correct
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { User, getAuth } from 'firebase/auth';
interface IndustriesProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}
const Industries: React.FC<IndustriesProps> = ({ setStep }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const auth = getAuth();
  const db = getFirestore();
  const currentUser = auth.currentUser;
  const handleAddTag = () => {
    if (input.trim() !== '' && tags.length < 3 && !tags.includes(input.trim()) && input.trim().length <= 20) {
      setTags([...tags, input.trim()]);
      setInput('');
    }
  };

  const handleDeleteTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddTag();
      event.preventDefault();
    }
  };

  const updateIndustriesInFirebase = async () => {
    var user = currentUser as User;
    const userDocRef = doc(db, 'users', user.uid);
    try {
      await updateDoc(userDocRef, {
        industries: tags
      });
      setStep(3);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center">
        <input
          className="border rounded p-2 flex-1"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type industry and press add or enter"
          maxLength={20}
        />
        <button
          className="ml-2 bg-indigo-500 text-white p-2 rounded hover:bg-indigo-700 disabled:opacity-50"
          onClick={handleAddTag}
          disabled={!input || tags.length >= 3}
        >
           add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div key={index} className="bg-blue-100 border rounded px-4 py-1 flex items-center">
            {tag}
            <button onClick={() => handleDeleteTag(index)} className="ml-2  hover:bg-grey-600 rounded-full p-1 text-white">
              x
            </button>
          </div>
        ))}
      </div>

      {tags.length > 0 && (
        <button
          className="w-full bg-indigo-600 hover:bg-ingifo-600 text-white py-2 px-4 rounded"
          onClick={updateIndustriesInFirebase}
        >
          Continue
        </button>
      )}
    </div>
  );
};

export default Industries;
