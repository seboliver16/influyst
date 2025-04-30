import React, { useState } from 'react';
import { Partner } from '../user';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import firebase_app from '../firebase/config';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  savePartner: (partner: Partner) => void;
}

const PartnersModal: React.FC<Props> = ({ isOpen, onClose, savePartner }) => {
  const [partner, setPartner] = useState<Partner>({
    company: '',
    link: '',
    logoUrl: '',
    description: '',
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const handleSave = async () => {
    if (logoFile) {
      const storage = getStorage(firebase_app);
      const logoRef = ref(storage, `partnersLogos/${logoFile.name}`);
      await uploadBytes(logoRef, logoFile);
      const logoUrl = await getDownloadURL(logoRef);
      savePartner({ ...partner, logoUrl });
    } else {
      savePartner(partner);
    }
    onClose();
    setPartner({ company: '', link: '', logoUrl: '', description: '' });
    setLogoFile(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setLogoFile(event.target.files[0]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-1/4 mx-auto p-5 border shadow-lg rounded-md bg-white max-w-lg w-full">
        <h3 className="text-center text-lg text-gray-900">Add a New Partner</h3>
        <form className="space-y-5">
          <div>
            <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={partner.company}
              onChange={(e) => setPartner({ ...partner, company: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Company name"
              required
            />
          </div>
          <div>
            <label htmlFor="link" className="block mb-2 text-sm font-medium text-gray-900">
              Link
            </label>
            <input
              type="url"
              id="link"
              name="link"
              value={partner.link}
              onChange={(e) => setPartner({ ...partner, link: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="https://example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="logo" className="block mb-2 text-sm font-medium text-gray-900">
              Logo Image
            </label>
            <input
              type="file"
              id="logo"
              name="logo"
              onChange={handleFileChange}
              className="bg-gray-50 text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-gray-200 hover:file:bg-gray-300"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={partner.description}
              onChange={(e) => setPartner({ ...partner, description: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Describe the partnership"
              required
            ></textarea>
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              className="mt-3 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
              onClick={handleSave}
            >
              Add Partner
            </button>
            <button
              type="button"
              className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-lg text-sm px-5 py-2.5 focus:outline-none"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PartnersModal;
