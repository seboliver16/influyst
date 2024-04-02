"use client";
import React from "react";
import { useRouter } from "next/navigation";
import signIn from "../firebase/signin";
import Link from "next/link";
import Image from "next/image";

const inputStyle = "border rounded p-2 w-full";
const labelStyle = "block mb-2 text-sm font-medium";
const errorStyle = "text-red-500 text-xs mt-1";

function Page() {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showVerifyButton, setShowVerifyButton] = React.useState(false);
  const router = useRouter();

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      setError("Error: Check Details or Verify Email");
    } else if (result?.user.emailVerified == false) {
      router.push("/verify");
    } else {
      console.log(result);
      router.push("/app/main");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div
        className="max-w-md w-full space-y-8 p-8 md:p-14 bg-white rounded-xl shadow-lg z-10 m-4 border-8 border-blue-500"
       style={{ borderColor: "#B3E5FC" }}



      >
        <div className="flex flex-col items-start space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">Log In</h2>
          <h2 className="text-md text-gray-400">
            Login to your Influyst Account
          </h2>
        </div>
        <form className="space-y-4" onSubmit={handleForm}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="flex flex-col space-y-2">
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className={labelStyle}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={inputStyle}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          
 <div>
  <button
    type="submit"
    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-200 hover:shadow-[0_20px_5px_-10px_rgba(0,0,0,0.2)] hover:bg-blue-300 transition ease-linear focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 my-10"
  >
    Log In
  </button>
</div>


        </form>
        <div className="flex flex-col items-start space-y-2">
          <div className="text-sm">
            <Link
              href="/forgotpass"
              className="font-medium text-sprout-green hover:text-blue-600"
            >
              Forgot your password?
            </Link>
          </div>
          <div className="text-sm">
            Dont have an account?
            <Link
              href="/signup"
              className="font-medium text-sprout-green hover:text-blue-600 pl-1"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
