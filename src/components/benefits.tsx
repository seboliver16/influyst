import * as React from "react";
import { FaBook, FaChartBar } from "react-icons/fa";

"use-client"

interface FeatureItemProps {
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ title, description }) => (
  <div className="group flex flex-col p-6 rounded-2xl border border-gray-300 mt-12 justify-center ">
  <div className="flex items-center gap-5">
    <FaChartBar size={60} className="text-indigo-400"/>
    <div className="flex flex-col">
      <h3 className="text-2xl text-black font-[590]">{title}</h3>
      <p className="mt-6 text-xl text-zinc-900 text-opacity-80">{description}</p>
    </div>
  </div>
</div>
);


const Benefits: React.FC = () => {
  const features: FeatureItemProps[] = [
    {
      
      title: "Easy to Set Up",
      description: "Simply sign in to your social and we do the heavy lifting data import and resume creation",
    },
    {
     
      title: "Quick to Share",
      description: "Copy the link, download a pdf copy, and have your contact methods easily accessible",
    },
    {
      
      title: "Viral Visibility",
      description:
        "With your own custom link and downloadable resume, you are set to stand out to brands and creators alike",
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center px-5 py-2.5 max-w-full text-base whitespace-nowrap border border-violet-200 bg-violet-200 bg-opacity-30 rounded-[100px] text-zinc-900 w-[121px]">
  <FaBook size={15} className="text-grey-100" />
  <span className="ml-2">Resume</span>
</div>
      <div className="flex flex-col mt-5 text-zinc-900">
        <h1 className="text-4xl font-bold">Your Beautiful Creator Resume</h1>
        <p className="mt-1 text-xl">Inspire confidence in seconds </p>
      </div>
      {features.map((feature, index) => (
        <FeatureItem key={index} {...feature} />
      ))}
    </div>
  );
};

export default Benefits;
