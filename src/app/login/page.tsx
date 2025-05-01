/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, Suspense } from "react";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import signIn from "../firebase/signin";
import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { useTheme } from "../context/themeContext";

function SigninForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const router = useRouter();
  const { isDarkMode } = useTheme();

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { result, error } = await signIn(email, password);

      if (error) {
        setError('Error: Check Details or Verify Email');
      } else if (result?.user.email?.length == 0) {
        setError('Email not verified');
      } else {
        router.push('/admin');
      }
    } catch (ex) {
      setError('An unexpected error occurred. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-gray-900 flex flex-col items-center justify-center">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient background base */}
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950"></div>
      
        {/* Animated gradient circles with pulse and motion */}
        <motion.div 
          className="absolute -top-[10%] right-[10%] w-[100%] h-[70%] rounded-full bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 filter blur-3xl"
          animate={{ 
            opacity: [0.4, 0.6, 0.4],
            scale: [1, 1.05, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        
        <motion.div 
          className="absolute top-[30%] -left-[10%] w-[90%] h-[60%] rounded-full bg-gradient-to-r from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 filter blur-3xl"
          animate={{ 
            opacity: [0.4, 0.6, 0.4],
            scale: [1, 1.05, 1],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Grid overlay with reduced opacity for subtle effect */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBmaWxsPSIjZjVmN2ZhIiBmaWxsLW9wYWNpdHk9Ii4wMSIvPjxwYXRoIGQ9Ik0wIDMwaDMwdjMwSDB6IiBmaWxsPSIjZjVmN2ZhIiBmaWxsLW9wYWNpdHk9Ii4wMSIvPjwvZz48L3N2Zz4=')] opacity-[0.02] dark:opacity-[0.03]"></div>
      </div>
      
      {/* Gradient border at top */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500/30 via-blue-500/50 to-purple-500/30 dark:from-purple-500/50 dark:via-blue-500/70 dark:to-purple-500/50"></div>
      
      {/* Logo */}
      <Link href="/" className="absolute top-6 left-6 flex items-center group">
        <Image src="/logo.svg" height={28} width={28} alt="Logo" className="transform transition-all duration-300 group-hover:scale-110" />
        <h1 className="text-xl font-bold text-gray-800 dark:text-white ml-3">Influyst</h1>
      </Link>

      <div className="container px-4 mx-auto z-10 relative">
        <div className="max-w-md w-full mx-auto">
          {/* Signin Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700"
          >
            <div className="p-8">
              {/* Floating badge */}
              <div className="flex items-center justify-center space-x-2 bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-full px-4 py-1.5 shadow-md mb-6 mx-auto w-fit">
                <Sparkles className="h-4 w-4 text-purple-500 dark:text-purple-400 flex-shrink-0" />
                <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  Welcome back!
                </span>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Sign In
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Continue your creator journey
                </p>
              </div>

              <form onSubmit={handleForm} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <div className={`
                    relative 
                    ${isInputFocused ? 'ring-2 ring-purple-200 dark:ring-purple-900/30' : ''} 
                    bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 overflow-hidden
                    transition-all duration-300
                  `}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full p-3 text-gray-800 dark:text-white focus:outline-none bg-transparent"
                      placeholder="youremail@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => setIsInputFocused(false)}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <div className={`
                    relative
                    ${isInputFocused ? 'ring-2 ring-purple-200 dark:ring-purple-900/30' : ''} 
                    bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 overflow-hidden
                    transition-all duration-300
                  `}>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="w-full p-3 text-gray-800 dark:text-white focus:outline-none bg-transparent"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => setIsInputFocused(false)}
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium rounded-xl transition-all duration-300 relative overflow-hidden"
                  disabled={loading}
                >
                  <span className="relative z-10">Sign In</span>
                  <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-white opacity-20 blur-lg"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500"></div>
                  </div>
                </button>

                <div className="flex flex-col items-center space-y-2 text-sm pt-2">
                  <Link href="/forgotpass" className="font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
                    Forgot your password?
                  </Link>
                  <div>
                    Don&apos;t have an account?
                    <Link href="/signup" className="font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors ml-1">
                      Sign Up
                    </Link>
                  </div>
                </div>
                
                {error && (
                  <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}

// Page component wrapped with Suspense
export default function Page() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div></div>}>
      <SigninForm />
    </Suspense>
  );
}
