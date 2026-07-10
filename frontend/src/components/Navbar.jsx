import { FaPlaneDeparture, FaMagic } from "react-icons/fa";
import { motion } from "framer-motion";

function Navbar({ onInspireClick }) {
  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className="sticky top-5 z-50"
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="glass rounded-2xl px-8 py-4 flex justify-between items-center shadow-lg border border-white/10 bg-white/5 backdrop-blur-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
              <FaPlaneDeparture size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">TravelAI</h1>
              <p className="text-xs text-slate-400 font-medium">AI Powered Planner</p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-10 text-slate-300 font-medium">
            <button 
              onClick={onInspireClick}
              className="flex items-center gap-2 hover:text-cyan-400 transition cursor-pointer"
            >
              <FaMagic className="text-cyan-500" />
              Inspire Me
            </button>
            <a href="#" className="hover:text-white transition">Planner</a>
            <a href="#" className="hover:text-white transition">Preview</a>
            <a href="#" className="hover:text-white transition">About</a>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 rounded-xl font-semibold hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 transition-all text-white">
            Get Started
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;