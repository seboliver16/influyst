"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useIsMobile } from '../app/isMobile';

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  const isMobile = useIsMobile(); // Using the custom hook to determine if it's a mobile device

  // Conditionally applying motion components based on the isMobile flag
  const TextComponent = isMobile ? "p" : motion.p;
  const DivComponent = isMobile ? "div" : motion.div;

  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <TextComponent
        transition={!isMobile ? { duration: 0.3 } : {}}
        className="cursor-pointer hover:text-gray-900 text-gray-500 transition ease-in-out hover:opacity-[0.9] dark:text-white"
      >
        {item}
      </TextComponent>
      {active !== null && (
        <DivComponent
          initial={!isMobile ? { opacity: 0, scale: 0.85, y: 10 } : {}}
          animate={!isMobile ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={!isMobile ? transition : {}}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.7rem)] left-1/2 transform -translate-x-1/2"></div>
          )}
        </DivComponent>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative rounded-full boder border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex justify-between space-x-4 px-4 py-2 items-center shadow-sm"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black "
    >
      {children}
    </Link>
  );
};
