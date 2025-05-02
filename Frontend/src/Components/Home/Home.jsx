import React from "react";
import { BackgroundBeams } from "../ui/background-beams";
import { Spotlight } from "../ui/spotlight-new";
import ollama from "../../assets/ollama.png"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function Home() {
  return (
    <div className="h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <img src={ollama} className="z-20 w-35 h-35" />
      <div className="z-20 max-w-2xl mx-auto p-4">
        <Spotlight />
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-white">
          Briefly AI
        </h1>
        <p className="mt-4 font-bold text-base text-white max-w-lg text-center mx-auto">
          Powered by the GEMMA3 model, our platform allows you to interact with PDF documents through seamless conversations. Easily search, ask questions, and extract key insights from your PDFs, transforming the way you engage with your content
        </p>
      </div>
      <Link to="http://localhost:5173/login" className="z-20">
        <Button variant="secondary" className="w-20 h-20 mt-5 rounded-xl cursor-pointer">
          <ArrowRight className="size-6" />
        </Button>
      </Link>
      <BackgroundBeams />
    </div>
  );
}
