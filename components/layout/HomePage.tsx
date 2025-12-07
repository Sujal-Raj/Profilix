import Link from "next/link";
// import { cn } from "@/lib/utils"
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text"
import { MoveRight } from "lucide-react";
import { WordRotate } from "@/components/ui/word-rotate"
import { LightRays } from "../ui/light-rays";

export default function HomePage(){

    return (
        <section id="home" className="pt-38 sm:pt-28 pb-20 min-h-[80vh]  bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center ">
        <div className="group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800 inline-block mb-4">
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span>✨ Introducing Portfolio AI</span>
          <MoveRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedShinyText>
          </div>  
          
          {/* <h1 className="text-4xl sm:text-5xl md:text-8xl lg:text-7xl font-bold text-black dark:text-white mb-6 leading-tighter">
            Create Stunning Portfolio in Minutes
          </h1> */}
          <h1 className="text-3xl sm:text-4xl md:text-7xl lg:text-6xl font-bold text-black dark:text-white mb-6 leading-tighter">
            Transform Your Resume into a Stunning Portfolio
          </h1>
          
          {/* <p className="text-md md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            No design skills required. Just upload your work, customize your layout,
          </p>
          <p className="text-md md:text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-3xl mx-auto">
            and share your unique portfolio URL with potential clients.
          </p> */}

            <p className="text-md md:text-lg text-gray-600 dark:text-gray-400 leading-tight max-w-3xl mx-auto mb-1">
            Simply upload your resume and watch AI instantly create a professional,
          </p>
          <p className="text-md md:text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-3xl mx-auto">
            customizable portfolio website. No coding or design skills needed.
          </p>
          <p className="text-base text-gray-500 dark:text-gray-500 ">
            Perfect for 
            </p>
            <WordRotate
      className="text-4xl font-bold text-black dark:text-white mb-4"
      words={["Developer", "Designer","Professionals"]}
    />
          
          <div className="flex flex-row gap-4 justify-center">
            <Link href={"/create/portfolio"}>
  <button className="group relative bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-lg text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer flex items-center justify-center">
    <span className="relative z-10 flex items-center">
      Create Your Portfolio 
      <MoveRight className="ml-2 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
    </span>
    <div className="absolute inset-0 bg-gray-800 dark:bg-gray-200 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
  </button>
</Link>
            {/* <button className="bg-white dark:bg-gray-900 text-black dark:text-white px-8  py-3 rounded-lg text-base font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition border-2 border-gray-200 dark:border-gray-800">
              View Examples →
            </button> */}
          </div>
        </div>
      </div>
      <LightRays />
    </section>

    )
}



