"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import firebase_app from "../firebase/config";

const inputStyle = "border rounded p-2 w-full";
const labelStyle = "block mb-2 text-sm font-medium text-gray-900";
const buttonStyle =
  "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sprout-green hover:shadow-[0_20px_5px_-10px_rgba(0,0,0,0.2)] hover:bg-lime-600 transition ease-linear focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 my-10";
const errorStyle = "text-red-500 text-xs mt-1";

function Page() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const auth = getAuth(firebase_app);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Check your email for further instructions.");
    } catch (error) {
      setError("Failed to reset password. Make sure the email is correct.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      
    >
      <div
        className="max-w-md w-full space-y-8 p-8 md:p-14 bg-white rounded-xl shadow-md z-10 m-4 "
        style={{ borderColor: "rgba(255, 165, 0, 0.2)" }}
      >
        <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className={labelStyle}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={inputStyle}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {error && <p className={errorStyle}>{error}</p>}
          {message && <p className="text-indigo-500 text-xs mt-1">{message}</p>}
          <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-800">
            Reset Password
          </button>
        </form>
        <div className="flex flex-col items-start space-y-2">
          <a
            href="/signin"
            className="font-medium text-indigo-600 hover:text-indigo-600"
          >
            Back to Log In
          </a>
        </div>
      </div>
    </div>
  );
}

export default Page;
