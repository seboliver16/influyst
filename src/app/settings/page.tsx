"use client"

import React, { useState } from 'react';
import { getAuth, updatePassword, deleteUser, signOut, User } from 'firebase/auth';
import { deleteDoc, doc, getFirestore } from 'firebase/firestore';
import firebase_app from '../firebase/config';
import router, { useRouter } from 'next/navigation';

const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const auth = getAuth(firebase_app);
  const db = getFirestore(firebase_app);
  const router = useRouter();

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const user = auth.currentUser as User;
      await updatePassword(user, newPassword);
      alert('Password has been changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error) {
      alert('Failed to change password: ' + error);
    }
  };

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;
    
    if (!user) {
      alert('No user signed in.');
      return;
    }

    const confirmation = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmation) {
      return; // Stop the deletion process if the user cancels
    }

    try {
      // Delete user data from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await deleteDoc(userDocRef);

      // Delete the user from Firebase Auth
      await deleteUser(user);
      
      alert('Account has been deleted successfully!');
      // Sign out user and redirect to the sign-in page
      await signOut(auth);
      router.push('/signin');
    } catch (error) {
      console.error('Failed to delete account:', error);
      alert(`Failed to delete account: ${error || 'Unknown error'}`);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Logged out successfully!');
      // Redirect to login page or handle user interface cleanup
    } catch (error) {
      alert('Logout failed: ' + error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/logo.svg" alt="Influyst Logo" className="h-8 w-auto" />
            <span className="font-bold ml-2 text-xl">Influyst</span>
          </div>
          <nav>
            <a href="/dashboard" className="text-gray-800 hover:underline px-4">
              Dashboard
            </a>
            <a href="/signin" className="text-gray-800 hover:underline" onClick={handleLogout}>Logout</a>
          </nav>
         
        </div>
      </header>

      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Settings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Change Password</h2>
            <div className="mb-4">
              <label htmlFor="currentPassword" className="block text-gray-700 text-sm font-bold mb-2">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mb-2">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmNewPassword" className="block text-gray-700 text-sm font-bold mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Confirm your new password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                onClick={() => {
                  setCurrentPassword('');
                  setNewPassword('');
                  setConfirmNewPassword('');
                }}
              >
                Cancel
              </button>
              <button
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleChangePassword}
              >
                Change Password
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center">
  <div className="bg-white p-8 rounded-lg shadow-sm max-w-sm w-full">
    <div className="mb-4">
      <h2 className="text-lg font-semibold">Delete Your Account</h2>
      <p className="text-gray-700">This action cannot be undone.</p>
    </div>
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
      onClick={handleDeleteAccount}
    >
      Delete Account
    </button>
  </div>
</div>



        </div>
      </main>
    </div>
  );
};

export default Settings;
