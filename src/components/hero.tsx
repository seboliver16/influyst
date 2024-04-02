import React from "react";
import { Boxes } from "./background-boxes";
import Navbar from "./navbar";
import { Spotlight } from "./Spotlight";
import Link from "next/link";
import Benefits from "./benefits";
import Preview from "./preview";

const HeroSection: React.FC = () => {
  return (
    <>
      <div className="h-screen relative w-full overflow-hidden bg-white flex flex-col items-center justify-center rounded-lg">
        <Navbar className="top-8" />
        {/* <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="purple" /> */}
        <div className="absolute inset-0 w-full h-full bg-white z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <Boxes className="" />
        <div className="mt-20 z-20 flex flex-col justify-center items-center text-center"> {/* Added text-center */}
          <h1 className="md:text-7xl text-6xl text-gray-900 relative z-20 font-medium pb-4">
            Monetize your social media
          </h1>
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4"> {/* Changed flex-row to flex-col and added space-y-4 for mobile */}
            <h1 className="md:text-7xl text-6xl text-gray-900 relative z-20 font-medium">
              presence in
            </h1>
            <span className="md:text-7xl text-6xl text-brand-purple relative z-20 font-extrabold">
              seconds.
            </span>
          </div>
          <p className="max-w mt-8 mb-4 text-2xl text-center mt-6 text-gray-400 relative z-20">
            Influyst easily unlocks the full value and reach of creators
          </p>
          <div>
            <button className="z-20 py-4 px-8 bg-brand-purple border-6 border-brand-purple-border text-white rounded-full shadow-md hover:shadow-inner font-regular hover:bg-brand-purple-hover hover:border-brand-purple-hover-border transition ease-in-out mt-8">
              <Link href="/signup">Create Your Influencer Resume</Link>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:justify-around px-6 mt-8">
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <Benefits />
        </div>
        <div className="w-full md:w-1/3">
          <Preview />
        </div>
      </div>
    </>
  );
};

export default HeroSection;