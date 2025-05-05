/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import signUp from "../firebase/signup";
import validateUsername, { validateUsernameFormat } from "../firebase/validateUsername";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Sparkles, Loader2 } from "lucide-react";
import { useTheme } from "../context/themeContext";

// Import shadcn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [username, setUsername] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [validatingUsername, setValidatingUsername] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isDarkMode } = useTheme();

  // Extract username from URL parameters when component mounts
  useEffect(() => {
    const usernameParam = searchParams?.get('username');
    if (usernameParam) {
      setUsername(usernameParam);
      // Validate the passed username
      const formatResult = validateUsernameFormat(usernameParam);
      if (!formatResult.isValid) {
        setUsernameError(formatResult.error || "Invalid username");
      } else {
        checkUsername(usernameParam);
      }
    }
  }, [searchParams]);

  // Debounced username validation
  const checkUsername = async (value: string) => {
    if (!value) {
      setUsernameError("");
      return;
    }
    
    // First check format locally without API call
    const formatResult = validateUsernameFormat(value);
    if (!formatResult.isValid) {
      setUsernameError(formatResult.error || "Invalid username");
      return;
    }
    
    // Then check availability with API
    setValidatingUsername(true);
    try {
      const result = await validateUsername(value);
      if (!result.isValid) {
        setUsernameError(result.error || "Username is not available");
      } else {
        setUsernameError("");
      }
    } catch (error) {
      console.error("Error validating username:", error);
      setUsernameError("Error checking username");
    } finally {
      setValidatingUsername(false);
    }
  };

  // Handle username change with debounce
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    setUsernameError("");
    
    // Clear any existing timeout
    const timeoutId = setTimeout(() => {
      checkUsername(value);
    }, 500); // 500ms debounce
    
    return () => clearTimeout(timeoutId);
  };

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      // Final username validation before submitting
      const usernameValidation = await validateUsername(username);
      if (!usernameValidation.isValid) {
        setErrorMsg(usernameValidation.error || "Invalid username");
        setLoading(false);
        return;
      }

      const { result, error } = await signUp(
        username,
        email,
        password,
      );

      if (error) {
        setErrorMsg(error.message);
      } else {
        console.log(result);
        router.push('/admin');
      }
    } catch (error) {
      console.log(error);
      setErrorMsg("An unexpected error occurred");
    }
    
    setLoading(false);
  };

  const handleContinue = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    
    if (!email || !username) {
      setErrorMsg('Please fill out all fields.');
      return;
    }
    
    if (usernameError) {
      setErrorMsg('Please fix the username issues before continuing.');
      return;
    }
    
    // Final check for username validity
    setValidatingUsername(true);
    try {
      const result = await validateUsername(username);
      if (!result.isValid) {
        setUsernameError(result.error || "Username is not available");
        setErrorMsg('Please fix the username issues before continuing.');
        setValidatingUsername(false);
        return;
      }
      
      setStep(step + 1);
    } catch (error) {
      console.error("Error validating username:", error);
      setErrorMsg("Error checking username");
    } finally {
      setValidatingUsername(false);
    }
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
          {/* Signup Card */}
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
                  {step === 1 ? 'Almost there!' : 'One last step'}
                </span>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {step === 1 ? 'Join Influyst' : 'Create Your Account'}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {step === 1 ? 'Your creator journey starts here' : 'Secure your profile'}
                </p>
              </div>

              {errorMsg && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{errorMsg}</AlertDescription>
                </Alert>
              )}

              {step === 1 && (
                <form onSubmit={handleContinue} className="space-y-5">
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </Label>
                    <div className="mt-1.5">
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="youremail@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`
                          w-full p-3 rounded-xl 
                          ${isInputFocused ? 'ring-2 ring-purple-200 dark:ring-purple-900/30' : ''} 
                          bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600
                          text-gray-800 dark:text-white placeholder:text-gray-400
                          focus:outline-none focus:ring-2 focus:ring-purple-500/50
                          transition-all duration-300
                        `}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="username" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Username
                    </Label>
                    <div className="mt-1.5">
                      <div className={`
                        flex items-center relative
                        ${isInputFocused ? 'ring-2 ring-purple-200 dark:ring-purple-900/30' : ''} 
                        ${usernameError ? 'ring-2 ring-red-200 dark:ring-red-900/30 border-red-300 dark:border-red-700' : ''}
                        ${!usernameError && username && !validatingUsername ? 'ring-2 ring-green-200 dark:ring-green-900/30 border-green-300 dark:border-green-700' : ''}
                        bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600
                        transition-all duration-300
                      `}>
                        <span className="text-purple-600 dark:text-purple-400 font-medium pl-3">influyst.com/</span>
                        <Input
                          id="username"
                          type="text"
                          required
                          placeholder="username"
                          value={username}
                          onChange={handleUsernameChange}
                          className={`
                            flex-1 border-0 bg-transparent p-3
                            text-gray-800 dark:text-white placeholder:text-gray-400
                            focus:outline-none focus:ring-0
                          `}
                          onFocus={() => setIsInputFocused(true)}
                          onBlur={() => setIsInputFocused(false)}
                        />
                        {validatingUsername && (
                          <div className="absolute right-3 text-purple-500">
                            <Loader2 className="animate-spin h-5 w-5" />
                          </div>
                        )}
                        {!validatingUsername && username && !usernameError && (
                          <div className="absolute right-3 text-green-500">
                            <CheckCircle className="h-5 w-5" />
                          </div>
                        )}
                      </div>
                      {usernameError && (
                        <p className="mt-1.5 text-sm text-red-500">{usernameError}</p>
                      )}
                      {!usernameError && username && !validatingUsername && (
                        <p className="mt-1.5 text-sm text-green-500">Username is available</p>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={loading || validatingUsername || !!usernameError}
                    className="w-full py-6 px-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 
                    text-white font-medium rounded-xl transition-all duration-300 relative overflow-hidden h-auto"
                  >
                    {validatingUsername ? (
                      <span className="flex items-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Validating...
                      </span>
                    ) : (
                      <span className="relative z-10">Continue</span>
                    )}
                    <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-white opacity-20 blur-lg"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500"></div>
                    </div>
                  </Button>

                  <div className="text-center text-gray-500 dark:text-gray-400 mt-4">
                    Already have an account? <Link href="/login" className="text-purple-600 dark:text-purple-400 font-medium hover:underline">Sign in</Link>
                  </div>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handleSignUp} className="space-y-5">
                  <div className="mb-6 text-center">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 mb-3">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-medium text-purple-600 dark:text-purple-400">influyst.com/{username}</span> is all yours!
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Set Password
                    </Label>
                    <div className="mt-1.5">
                      <Input
                        id="password"
                        type="password"
                        required
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`
                          w-full p-3 rounded-xl 
                          ${isInputFocused ? 'ring-2 ring-purple-200 dark:ring-purple-900/30' : ''} 
                          bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600
                          text-gray-800 dark:text-white placeholder:text-gray-400
                          focus:outline-none focus:ring-2 focus:ring-purple-500/50
                          transition-all duration-300
                        `}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                      />
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full py-6 px-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 
                    text-white font-medium rounded-xl transition-all duration-300 relative overflow-hidden h-auto"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </span>
                    ) : (
                      <span className="relative z-10">Create Account</span>
                    )}
                    <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-white opacity-20 blur-lg"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500"></div>
                    </div>
                  </Button>

                  <div className="flex justify-center">
                    <button 
                      type="button" 
                      onClick={() => setStep(1)}
                      className="text-gray-500 dark:text-gray-400 text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      &larr; Go back
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.5; }
          100% { transform: scale(1.05); opacity: 0.8; }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupForm />
    </Suspense>
  );
}
