/* eslint-disable @next/next/no-img-element */
"use client";
import React, {useState} from "react";
import { useRouter } from "next/navigation";
import signUp from "../firebase/signup";
import Link from "next/link"; // Import Link from Next.js for navigation
import Image from "next/image"

const inputStyle = "border rounded p-2 w-full"; // Reuse the input style
const labelStyle = "block mb-2 text-sm font-medium"; // Reuse the label style
const errorStyle = "text-red-500 text-xs mt-1"; // Reuse the error message style

function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
        const { result, error } = await signUp(
          username,
          email,
          password,
        );

        if (error) {
            setErrorMsg(error.message); // Set the error message to display on the form
        } else {
            console.log(result);
            // Navigate to the main page after successful sign up
            router.push('/admin'); // Replace '/' with the path to your main page if it's different
        }
    } catch (error) {
        // Handle any unexpected errors in the sign-up process
        console.log(error);
    }
    
    setLoading(false);
};


  const handleContinue = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log("Continuing...")
    // You could add more validation here if needed
    if (email && username) {
      setStep(step + 1);
    } else {
      setErrorMsg('Please fill out all fields.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Left Half: Logo and Sign-up Form */}
      {/* Logo */}
      <a href='/'>
      <div className="absolute top-0 left-0 p-8 flex items-center">
        <Image src='/logo.svg' height={25} width={25} alt="Logo" />
        <h1 className="text-xl font-bold text-gray-800 ml-3">Influyst</h1>
      </div>
      </a>
      
        <div className="w-full md:w-1/2 p-8">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md">
            <div className="p-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">
                {step === 1 ? 'Join Influyst' : 'Create Your Account'}
              </h2>
              <p className="text-gray-400 text-sm">
                {step === 1 ? 'Its free!' : 'Almost there...'}
              </p>
              </div>
              {step === 1 && (
              <form onSubmit={handleContinue} className="space-y-4">
                <div>
                  <label htmlFor="email" className={labelStyle}>
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className={inputStyle}
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="username" className={labelStyle}>
                    Username
                  </label>
                  <div className="flex items-center border rounded p-2">
                    <span className="text-gray-400 mr-1">influyst.com/</span>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      className={`w-full flex-grow focus:outline-none`}
                      placeholder="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <button
                    className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-800"
                    disabled={loading}
                  >
                    Continue
                  </button>
                </div>
                {errorMsg && <p className={errorStyle}>{errorMsg}</p>}
              </form>
            )}
            {step === 2 && (
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <label htmlFor="password" className={labelStyle}>
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className={inputStyle}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-800"
                    disabled={loading}
                  >
                    Create Account
                  </button>
                </div>
                {errorMsg && <p className={errorStyle}>{errorMsg}</p>}
              </form>
            )}
            <div className="mt-4 text-sm">
              Already have an account?{' '}
                <a href="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">Log In</a>
              
            </div>
            </div>
          </div>
        </div>
      
      {/* Right Half: Large Image */}
      <div className="hidden md:flex w-1/2 h-screen">
        <img
          src="/landingPage.png" // Path to your image in the public directory
          alt="Sign Up"
          className="object-cover w-full h-full"
        />
      </div>
      
    </div>
  );
};

export default Page;
