import * as React from "react";

"use-client"

interface FeatureItemProps {
  imageSrc: string;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ imageSrc, title, description }) => (
  <div className="group flex flex-col p-6 rounded-2xl border border-gray-300 mt-12">
    <div className="flex gap-5">
      <img src={imageSrc} alt="" className="shrink-0 my-auto border-indigo-400 border-solid aspect-[0.96] border-[3px] stroke-[3px] stroke-indigo-400 w-[26px]" />
      <div className="flex flex-col flex-grow">
        <h3 className="text-2xl text-black font-[590]">{title}</h3>
        <p className="mt-6 text-xl text-zinc-900 text-opacity-80">{description}</p>
      </div>
    </div>
  </div>
);


const Benefits: React.FC = () => {
  const features: FeatureItemProps[] = [
    {
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/80c713c3986bf833ac90010a6a28b3903a2769b329bfce6017d076efd07d03c4?apiKey=9805453a66104d21b27b8e64011dcf8d&",
      title: "Easy to Set Up",
      description: "Simply sign in to your social and we do the heavy lifting data import and resume creation",
    },
    {
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/80c713c3986bf833ac90010a6a28b3903a2769b329bfce6017d076efd07d03c4?apiKey=9805453a66104d21b27b8e64011dcf8d&",
      title: "Quick to Share",
      description: "Copy the link, download a pdf copy, and have your contact methods easily accessible",
    },
    {
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/a502a8b9ac7ba5fa8ab8557ca159d5c67a84a8535e6990481f2fb08ac34661b0?apiKey=9805453a66104d21b27b8e64011dcf8d&",
      title: "Viral Visibility",
      description:
        "With your own custom link and downloadable resume, you are set to stand out to brands and creators alike",
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex justify-center px-5 py-2.5 max-w-full text-base whitespace-nowrap border border-violet-200 border-solid bg-violet-200 bg-opacity-30 rounded-[100px] text-zinc-900 w-[121px]">
        <div className="flex gap-2 py-0.5">
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/705527395224607a92b4d2ce8a902917a1bb7ff8f9d148d24c8c511377f3d364?apiKey=9805453a66104d21b27b8e64011dcf8d&" alt="" className="shrink-0 w-4 aspect-square" />
          <div className="my-auto">Resume</div>
        </div>
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
