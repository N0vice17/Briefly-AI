import React from "react";
import { BackgroundBeams } from "../ui/background-beams";
import { Spotlight } from "../ui/spotlight-new";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ollama from "../../assets/ollama.png"


export default function Home() {
  return (
    <div
      className="h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        <Avatar className="z-20">
          <AvatarImage src={ollama} />
        </Avatar>
      <div className="max-w-2xl mx-auto p-4">
        <Spotlight />
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Briefly AI
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          Powered by the GEMMA3 model, our platform allows you to interact with PDF documents through seamless conversations. Easily search, ask questions, and extract key insights from your PDFs, transforming the way you engage with your content
        </p>
      </div>
      <BackgroundBeams />
    </div>
  );
}
