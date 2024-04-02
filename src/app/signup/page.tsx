"use client";
import React from "react";
import { useRouter } from "next/navigation";
import signUp from "../firebase/signup";
import Link from "next/link"; // Import Link from Next.js for navigation
// import { Oval } from "react-loader-spinner";

const inputStyle = "border rounded p-2 w-full"; // Reuse the input style
const labelStyle = "block mb-2 text-sm font-medium"; // Reuse the label style
const errorStyle = "text-red-500 text-xs mt-1"; // Reuse the error message style

function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const { result, error } = await signUp(
      username,
      email,
      password,
    );

    if (error) {
      setErrorMsg(error.message); // Set the error message to display on the form
    } else {
      console.log(result);
      router.push("/verify");
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-main-background bg-cover"
      // style={{
      //   background:
      //     "linear-gradient(180deg, rgba(254, 248, 237, 1) 0%, rgba(255, 235, 210, 1) 100%)",
      // }}
    >
      <div
        className="max-w-md w-full space-y-8  p-8 md:p-14 bg-white rounded-xl shadow-lg z-10 m-4 border-8 "
        style={{ borderColor: "#E9D4FD" }}
      >
        <div className="flex flex-col items-start space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">Sign Up</h2>
          <h2 className="text-md text-gray-400">
            Create your Influyst Account
          </h2>
        </div>
        <form className="space-y-4" onSubmit={handleForm}>
          <div className="flex flex-col space-y-2">
            <div>
              <label htmlFor="username" className={labelStyle}>
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className={inputStyle}
                placeholder="Enter Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
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
                placeholder="example@mail.com"
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
                required
                className={inputStyle}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
          </div>

          {errorMsg && <p className={errorStyle}>{errorMsg}</p>}
         <div>
  <button
    type="submit"
    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-200 hover:shadow-[0_20px_5px_-10px_rgba(0,0,0,0.2)] hover:bg-purple-300 transition ease-linear focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400 my-10"
  >
    Create Account
  </button>
</div>

        </form>
        <div className="flex flex-col items-start space-y-2">
          <div className="text-sm">
            Already have an account?
            <Link
              href="/signin"
              className="font-medium text-sprout-green hover:text-purple-600 pl-1"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
