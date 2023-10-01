import React from "react";
import { logo } from "../assets";
import Image from "next/image";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <Image src={logo} alt="logo" className="w-32 object-contain" />

        <button className="bg-black text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-900">
          github
        </button>
      </nav>
      <h1 className="head_text">
        Summarize Articles with <br className="max-md:hidden" />
        <span className="orange_gradient">AI</span>
      </h1>
      <h2 className="desc">
        Summarize your articles with our AI and get the best results
      </h2>
    </header>
  );
};

export default Hero;
