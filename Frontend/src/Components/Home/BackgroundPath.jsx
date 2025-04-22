import { motion } from "framer-motion";
import FloatingPaths from "./FloatingPaths";
import { Link } from "react-router-dom"

export default function BackgroundPaths({ title = "Breifly AI" }) {
  const words = title.split(" ");

  return (
    <>
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 flex">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>
        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter">
              {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                  {word.split("").map((letter, letterIndex) => (
                    <motion.span
                      key={`${wordIndex}-${letterIndex}`}
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: wordIndex * 0.1 + letterIndex * 0.03,
                        type: "spring",
                        stiffness: 150,
                        damping: 25,
                      }}
                      className="inline-block text-transparent bg-clip-text 
                      bg-gradient-to-r from-white to-white/80 
                      dark:from-neutral-900 dark:to-neutral-700/80"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              ))}
            </h1>

            <div
              className="inline-block group relative bg-gradient-to-b from-white/10 to-black/10 
              dark:from-black/10 dark:to-white/10 p-px rounded-2xl backdrop-blur-lg 
              overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Link to="/login">
                <button
                  className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md 
                bg-black/95 hover:bg-black/100 dark:bg-white/95 dark:hover:bg-white/100 
                text-white dark:text-black transition-all duration-300  cursor-pointer
                group-hover:-translate-y-0.5 border border-white/10 dark:border-black/10
                hover:shadow-md dark:hover:shadow-neutral-200/50"
                >
                  <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                    Get Started
                  </span>
                  <span
                    className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 
                  transition-all duration-300"
                  >
                    →
                  </span>
                </button>
              </Link>
            </div>
          </motion.div>
        </div >
      </div >
    </>
  );
}
