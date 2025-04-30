import React, { useState, useEffect } from 'react';
import { doc, getFirestore, updateDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebase_app from '../firebase/config';
import { User, Partner } from '../user';
import PartnersModal from './partnersmodal';

const Partners: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [showAddPartnerModal, setShowAddPartnerModal] = useState(false);

  const auth = getAuth(firebase_app);
  const db = getFirestore(firebase_app);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      getDoc(userDocRef).then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data() as User;
          setPartners(userData.partners || []);
        }
      });
    }
  }, [user, db]);

  const handleRemovePartner = async (index: number) => {
    if (!user) return;

    const newPartners = [...partners];
    newPartners.splice(index, 1);

    try {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        partners: newPartners,
      });
      setPartners(newPartners);
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const handleSavePartner = async (newPartner: Partner) => {
    if (!user) return;

    const updatedPartners = [...partners, newPartner];

    try {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        partners: updatedPartners,
      });
      setPartners(updatedPartners);
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  

  return (
    <div>
      <button
        onClick={() => setShowAddPartnerModal(true)}
        className="mt-3 bg-indigo-500 text-white px-4 p-2 rounded hover:bg-indigo-600"
      >
        Add Partner
      </button>

      <PartnersModal
        isOpen={showAddPartnerModal}
        onClose={() => setShowAddPartnerModal(false)}
        savePartner={handleSavePartner}
      />

      <div className="mt-4">
        {partners.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="w-full max-w-xs mx-auto block p-4 border hover:shadow-lg transition-shadow relative bg-white rounded-md"
              >
                <button
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 rounded hover:bg-red-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemovePartner(index);
                  }}
                >
                  &times;
                </button>
                <a
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center"
                >
                  <img
                    src={partner.logoUrl}
                    alt={`${partner.company} logo`}
                    className="h-24 w-24 object-cover mb-2 rounded-md"
                  />
                  <p className="text-lg font-bold">{partner.company}</p>
                  {partner.description && (
                    <p className="text-sm italic text-gray-600 text-center">
                      {partner.description}
                    </p>
                  )}
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p>No partners added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Partners;
