"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import firebase_app from "../firebase/config";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setError(""); // Reset error message
  };

  const resendVerificationEmail = async () => {
    const db = getFirestore();
    const auth = getAuth();
    const usersRef = collection(db, "users2");
    const q = query(usersRef, where("email", "==", email));

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setError("No user found with this email.");
        return;
      }
      const user = auth.currentUser;
      if (user && user.email === email && !user.emailVerified) {
        await sendEmailVerification(user);
        alert("Verification email sent. Please check your inbox.");
      } else {
        setError("This account is already verified.");
      }
    } catch (error) {
      console.error(
        "Error checking user or resending verification email:",
        error
      );
      setError("Failed to resend verification email. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-main-background bg-cover">
      <div
        className="max-w-md w-full space-y-8 p-8 md:p-14 bg-white rounded-xl shadow-lg z-10 m-4 border-8 border-orange-500"
        style={{ borderColor: "rgba(255, 165, 0, 0.2)" }}
      >
        <div className="flex flex-col items-start space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">
            Verify Your Email
          </h2>
          <p className="text-md text-gray-400">
            Enter your email address to resend the verification email.
          </p>
          <input
            type="email"
            placeholder="Email address"
            className="border rounded p-2 w-full"
            value={email}
            onChange={handleInputChange}
          />
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        </div>
        <div className="mt-6">
          <button
            onClick={resendVerificationEmail}
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sprout-green hover:bg-lime-600 transition ease-linear focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Resend Verification Email
          </button>
        </div>
        <div className="mt-4">
          <Link
            href="/signin"
            className="font-medium text-sprout-green hover:text-lime-600"
          >
            Return to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
