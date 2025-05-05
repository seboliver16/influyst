import React, { useState, useEffect } from 'react';
import { doc, getFirestore, updateDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebase_app from '../firebase/config';
import { User, Partner } from '../user';
import PartnersModal from './partnersmodal';

const Partners: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [showAddPartnerModal, setShowAddPartnerModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const auth = getAuth(firebase_app);
  const db = getFirestore(firebase_app);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      const userDocRef = doc(db, 'users', user.uid);
      getDoc(userDocRef).then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data() as User;
          setPartners(userData.partners || []);
        }
        setIsLoading(false);
      }).catch(error => {
        console.error("Error fetching partners:", error);
        setIsLoading(false);
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
      <div className="flex justify-between items-center">
        <button
          onClick={() => setShowAddPartnerModal(true)}
          className="flex items-center mt-3 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Partner
        </button>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {partners?.length || 0} Partners
          </span>
        </div>
      </div>

      <PartnersModal
        isOpen={showAddPartnerModal}
        onClose={() => setShowAddPartnerModal(false)}
        savePartner={handleSavePartner}
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-32 mt-6">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
        </div>
      ) : partners.length === 0 ? (
        <div className="mt-6 p-8 bg-gray-50 rounded-lg border border-gray-200 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="text-gray-500 mb-4">No partners added yet.</p>
          <p className="text-gray-600">Showcase your collaborations by adding your partners and brand relationships.</p>
        </div>
      ) : (
        <div className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden border border-gray-200 transition-all hover:border-indigo-200 relative"
              >
                <div className="absolute top-2 right-2 z-10">
                  <button
                    className="bg-white bg-opacity-75 backdrop-blur-sm hover:bg-red-50 text-red-500 hover:text-red-600 p-1.5 rounded-full transition-colors border border-gray-200 hover:border-red-200"
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemovePartner(index);
                    }}
                    aria-label="Remove partner"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>

                <div className="p-6 flex flex-col items-center">
                  <div className="w-20 h-20 mb-4 rounded-lg overflow-hidden bg-gray-50 border border-gray-200 flex items-center justify-center">
                    {partner.logoUrl ? (
                      <img 
                        src={partner.logoUrl} 
                        alt={`${partner.company} logo`} 
                        className="w-full h-full object-contain p-2" 
                      />
                    ) : (
                      <span className="text-2xl font-bold text-gray-300">
                        {partner.company.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-800 text-center">{partner.company}</h3>
                  
                  {partner.description && (
                    <p className="mt-2 text-sm text-gray-600 text-center line-clamp-3">
                      {partner.description}
                    </p>
                  )}
                </div>

                <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-center">
                  <a
                    href={partner.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                    Visit Website
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Partners;
