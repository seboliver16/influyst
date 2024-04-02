import * as React from "react";
import { useState } from "react";
import { FaCopy } from "react-icons/fa";

interface PlatformProps {
  name: string;
}

const Platform: React.FC<PlatformProps> = ({ name }) => {
  return (
    <div className="flex flex-col flex-1 justify-center px-2.5 py-1.5 rounded-xl bg-zinc-900 bg-opacity-10">
      <div className="justify-center">{name}</div>
    </div>
  );
};

interface StatProps {
  title: string;
  value: string;
  date: string;
}

const Stat: React.FC<StatProps> = ({ title, value, date }) => {
  return (
    <div className="flex flex-col justify-center p-6 bg-white rounded-lg max-md:px-5 rounded-2xl border mb-4">
      <div className="flex flex-col">
        <div className="flex gap-5 justify-between px-px text-sm text-black text-opacity-80">
          <div>{title}</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/07007740db08c46c2c9f36bce7947b4936f2a0e7d0f13735f07d231f73dfed89?apiKey=9805453a66104d21b27b8e64011dcf8d&"
            alt="Information icon"
            className="shrink-0 self-start w-5 aspect-square stroke-[1px] stroke-indigo-400"
          />
        </div>
        <div className="flex flex-col mt-2">
          <div className="text-3xl font-semibold text-black">{value}</div>
          <div className="text-xs text-black text-opacity-50">{date}</div>
        </div>
      </div>
    </div>
  );
};

const stats = [
  {
    title: "Monthly Average Views",
    value: "5,000,000",
    date: "as of 4/02",
  },
  {
    title: "Active Followers",
    value: "84,000",
    date: "as of 4/02",
  },
  {
    title: "Audience Age",
    value: "18-36",
    date: "as of 4/02",
  },
];

const platforms = ["Tiktok", "Instagram", "DITL"];

const CopyIcon: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const url = "https://influyst.com/startupseb";
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000); // Reset copied state after 2 seconds
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex gap-2.5 justify-between px-3 py-1.5 mr-3 ml-3.5 text-xs text-black whitespace-nowrap rounded-xl bg-opacity-10 border-[2px] border-gray-300 max-w-[80%] max-md:mx-2.5">
        <div className="justify-center">https://influyst.com/startupseb</div>
        <button onClick={copyToClipboard} className="focus:outline-none">
          <FaCopy className="text-indigo-400 text-lg hover:text-indigo-600 transition duration-300 transform hover:scale-110" />
        </button>
      </div>
      {copied && (
        <div className="absolute bottom-5 bg-white rounded-lg border border-gray-300 p-3 shadow-xl text-indigo-400 z-50">
          Copied URL to clipboard
        </div>
      )}
    </div>
  );
};

function Preview() {
  return (
    <div className="flex flex-col grow px-12 pt-4 pb-16 rounded-2xl border border-gray-300 border-opacity-50 rounded-3xl max-md:px-5 max-md:mt-10 max-md:max-w-full max-sm:mb-11 px-10">
      <CopyIcon></CopyIcon>
      <div className="flex items-center justify-center flex-row pt-8 ">
  <img
    loading="lazy"
    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6c7533d2437a5f5e49b156a39044d1dacf7ce8c1d2d3154b91c8a4b4dcfa416e?apiKey=9805453a66104d21b27b8e64011dcf8d&"
    alt="Profile picture"
    className="w-[140px] aspect-[1.04]"
  />
  <div className="ml-4">
    <div className="font-bold text-xl">Startup Seb</div>
    <div className="text-opacity-80">influyst@gmail.com</div>
  </div>
</div>
    <div className="flex flex-row justify-center pt-10">
      <div className="flex flex-col">
        <div className="mr-4">Audience</div>
        <div className="flex gap-2">
          <Platform name="Finance" />
          <Platform name="Tech" />
          <Platform name="DIY" />
          <Platform name="StartUps" />
        </div>
      </div>
     
      </div>
      <div className=" h-px bg-violet-200 mt-10 mb-10" />
      <div className="bg-gray-200 rounded-full  w-full">
  <div className="grid grid-cols-3 gap-4 place-items-center">
    <div className="text-white bg-indigo-400 rounded-full px-9 py-3">
      Tiktok
    </div>
    <div className="text-black">Instagram</div>
    <div className="text-black">Pricing</div>
  </div>
</div>

      <div className="mt-5">
        <div className="flex flex-col px-6 mt-5 max-md:px-5">
          {stats.map((stat) => (
            <Stat key={stat.title} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Preview;
