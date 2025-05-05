// ExampleModal.tsx

import React, { useState } from 'react';
import { ContentExample } from '../user';

interface ExampleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (example: ContentExample) => void;
}

const socialPlatforms = ['Instagram', 'YouTube', 'Twitter', 'TikTok', 'Facebook', 'LinkedIn'];

const ExampleModal: React.FC<ExampleModalProps> = ({ isOpen, onClose, onSave }) => {
  const [platform, setPlatform] = useState<'Instagram' | 'YouTube' | 'Twitter' | 'TikTok' | 'Facebook' | 'LinkedIn'>('Instagram');
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');

  const handleSave = () => {
    if (!url) {
      alert("Please enter a URL.");
      return;
    }
    if (!title) {
      alert("Please enter a title.");
      return;
    }
    onSave({ platform, url, title });
    onClose();
    setPlatform('Instagram'); // Reset platform to default after saving
    setUrl('');
    setTitle('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4  z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Add Content Example</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Summer Campaign 2023"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Platform</label>
          <select 
            value={platform} 
            onChange={(e) => setPlatform(e.target.value as any)} 
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {socialPlatforms.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">URL</label>
          <input 
            type="url" 
            value={url} 
            onChange={(e) => setUrl(e.target.value)} 
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="https://example.com"
          />
        </div>
        <div className="flex justify-between mt-4">
  <button
    className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded transition duration-300 ease-in-out"
    onClick={handleSave}
  >
    Add Example
  </button>
  <button
    className="text-gray-600 border border-gray-300 hover:bg-gray-100 py-2 px-4 rounded transition duration-300 ease-in-out"
    onClick={onClose}
  >
    Cancel
  </button>
</div>

      </div>
    </div>
  );
};

export default ExampleModal;
