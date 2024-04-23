"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./navbar-menu";
import { cn } from "../utils/cn";
import Image from "next/image";
import Link from "next/link";

export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn(
  "fixed top-10 inset-x-0 mx-auto max-w-2xl z-50  rounded-full p-2",
  className
)}

    >
      <div className="border border-gray-300 rounded-full">
      <Menu setActive={setActive} >
  <div className="flex flex-row space-x-3 items-center px-4 md:px-0 "> {/* Added padding for mobile */}
    <Image src='/logo.svg'height={25} width={25} alt="Logo" />
    {/* Displayed only on desktop screens */}
    <h1 className="font-bold text-xl">Influyst</h1> 
  </div>
  <div className="flex flex-row space-x-10 items-center">
    { /* Displayed only on desktop screens */}
    
<a href="/signin">
    <MenuItem setActive={setActive} active={active} item="Login" ></MenuItem></a>
    <button className="bg-brand-purple text-white px-5 py-2 rounded-full border-4 border-brand-purple-border hover:shadow-inner hover:bg-brand-purple-hover hover:border-brand-purple-hover-border transition ease-in-out shadow-sm ">
      <Link href="/signup">Join</Link>
    </button>
  </div>
</Menu>
</div>


    </div>
  );
}
