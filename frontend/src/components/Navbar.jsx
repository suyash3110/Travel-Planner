import { FaPlaneDeparture } from "react-icons/fa";
import { motion } from "framer-motion";

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className="sticky top-5 z-50"
    >
      <div className="max-w-7xl mx-auto px-8">

        <div className="glass rounded-2xl px-8 py-4 flex justify-between items-center">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">

              <FaPlaneDeparture size={22} />

            </div>

            <div>

              <h1 className="text-2xl font-bold">

                TravelAI

              </h1>

              <p className="text-xs text-slate-400">

                AI Powered Planner

              </p>

            </div>

          </div>

          <div className="hidden lg:flex gap-10 text-slate-300">

            <a href="#">Features</a>

            <a href="#">Planner</a>

            <a href="#">Preview</a>

            <a href="#">About</a>

          </div>

          <button className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">

            Get Started

          </button>

        </div>

      </div>
    </motion.nav>
  );
}

export default Navbar;