import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import traveler from "../assets/Traveling.png";

function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-8 pt-20 pb-32">

      <div className="grid lg:grid-cols-2 items-center gap-16">

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-5 py-2 mb-8">

            🚀 Powered by AI + AWS Bedrock

          </div>

          <h1 className="text-6xl lg:text-7xl font-black leading-tight">

            <TypeAnimation
              sequence={[
                "Plan Smarter.",
                1800,
                "Travel Better.",
                1800,
                "Explore More.",
                1800
              ]}
              repeat={Infinity}
            />

          </h1>

          <p className="mt-8 text-slate-300 text-xl leading-9 max-w-xl">

            Generate intelligent itineraries,
            optimize your travel budget,
            receive packing suggestions,
            and explore destinations using AI.

          </p>

          <div className="flex gap-5 mt-10">

            <button className="bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition">

              Generate Trip

            </button>

            <button className="glass px-8 py-4 rounded-xl">

              Live Demo

            </button>

          </div>

          <div className="mt-12 flex gap-4 flex-wrap">

            <div className="glass px-5 py-3 rounded-full">

              🤖 AI Itinerary

            </div>

            <div className="glass px-5 py-3 rounded-full">

              ☁ AWS Cloud

            </div>

            <div className="glass px-5 py-3 rounded-full">

              ⚡ Instant Planning

            </div>

          </div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative flex justify-center"
        >

          <div className="absolute w-96 h-96 bg-blue-600/30 blur-[140px] rounded-full"/>

          <img
            src={traveler}
            className="relative w-[430px] hover:scale-105 transition duration-500 drop-shadow-[0_0_90px_rgba(37,99,235,.6)]"
          />

        </motion.div>

      </div>

    </section>
  );
}

export default Hero;