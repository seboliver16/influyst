/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import signIn from "../firebase/signin";
import Link from "next/link";
import Image from "next/image";

const inputStyle = 'border rounded p-2 w-full';
const labelStyle = 'block mb-2 text-sm font-medium';
const errorStyle = 'text-red-500 text-xs mt-1';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleForm = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      setError('Error: Check Details or Verify Email');
    } else if (result?.user.emailVerified == false) {
    } else {
      console.log(result);
      router.push('/app/main');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Left Half: Sign-up Form */}
      <div className="absolute top-0 left-0 p-8 ">
        <div className="flex items-center">
          <Image src='/logo.svg' height={25} width={25} alt="Logo" />
          <h1 className="text-xl font-bold text-gray-800 ml-3">Influyst</h1>
        </div>
      </div>
      <div className="w-full md:w-1/2 p-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md">
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
            <form onSubmit={handleForm} className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="border rounded p-2 w-full"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="border rounded p-2 w-full"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className={errorStyle}>{error}</p>}
              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-800"
                >
                  Log In
                </button>
              </div>
            </form>
            <div className="flex flex-col items-start space-y-2">
              <div className="text-sm mt-4">
                <Link href="/forgotpass" className="font-medium hover:text-blue-600 mt-5 pt-5">
                  Forgot your password?
                </Link>
              </div>
              <div className="text-sm">
                Dont have an account?
                <Link href="/signup" className="font-medium text-sprout-green hover:text-blue-600 pl-1">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Right Half: Image */}
      <div className="hidden md:flex w-1/2 h-screen">
        <img
          src="/landingPage.png" // Path to your image in the public directory
          alt="Sign Up"
          className="object-cover w-full h-full rounded-r-lg" // Optional: Apply custom styling to the image
        />
      </div>
    </div>
  );
};

export default Page;
