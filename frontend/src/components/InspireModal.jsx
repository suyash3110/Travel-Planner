import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaMagic, FaPlaneDeparture } from "react-icons/fa";

function InspireModal({ isOpen, onClose }) {
  const [vibe, setVibe] = useState("Relaxing Beach");
  const [budget, setBudget] = useState("₹50000");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(null);

  const handleInspire = async () => {
    setIsLoading(true);
    setSuggestions(null);
    try {
      const response = await fetch("http://localhost:8000/api/inspire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ vibe, budget })
      });

      if (!response.ok) {
        throw new Error("Failed to get inspiration");
      }

      const data = await response.json();
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error(error);
      alert("Error getting inspiration. Ensure backend is running and AWS keys are set.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-3xl p-8 shadow-2xl relative"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-slate-400 hover:text-white transition"
          >
            <FaTimes size={24} />
          </button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 mb-4">
              <FaMagic size={32} />
            </div>
            <h2 className="text-3xl font-bold mb-2">Let AI Inspire You</h2>
            <p className="text-slate-400">Not sure where to go? Tell us your vibe and budget, and we'll handle the rest.</p>
          </div>

          {!suggestions ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">What's your vibe?</label>
                <input 
                  value={vibe}
                  onChange={(e) => setVibe(e.target.value)}
                  placeholder="e.g. Relaxing Beach, High Altitude Trek, Historic Cities"
                  className="w-full bg-slate-950 rounded-xl border border-slate-700 p-4 outline-none focus:border-cyan-500 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">What's your budget?</label>
                <select 
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-slate-950 rounded-xl border border-slate-700 p-4 outline-none focus:border-cyan-500 text-white"
                >
                  <option value="₹25000">₹25,000</option>
                  <option value="₹50000">₹50,000</option>
                  <option value="₹100000+">₹100,000+</option>
                </select>
              </div>
              <button 
                onClick={handleInspire}
                disabled={isLoading}
                className="w-full py-4 rounded-xl text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02] transition disabled:opacity-50"
              >
                {isLoading ? "Consulting AI..." : "Spin the Globe"}
              </button>
            </div>
          ) : (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              <h3 className="text-xl font-semibold mb-4 text-cyan-400">Top Destinations For You:</h3>
              {suggestions.map((dest, idx) => (
                <div key={idx} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition group cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-2xl font-bold group-hover:text-cyan-400 transition">{dest.name}</h4>
                    <span className="bg-slate-800 px-3 py-1 rounded-full text-xs text-slate-300">{dest.estimated_cost}</span>
                  </div>
                  <p className="text-slate-400 text-sm mb-4">{dest.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {dest.highlights.map((highlight, hIdx) => (
                      <span key={hIdx} className="bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded-md text-xs">
                        {highlight}
                      </span>
                    ))}
                  </div>
                  <button 
                    onClick={() => {
                      onClose();
                      // In a real app, this would pre-fill the PlannerForm and trigger a search
                      alert(`Selected ${dest.name}! You can now generate a detailed itinerary for this destination in the main planner.`);
                    }}
                    className="mt-4 flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    <FaPlaneDeparture /> Plan trip here
                  </button>
                </div>
              ))}
              <button onClick={() => setSuggestions(null)} className="w-full py-3 mt-4 text-slate-400 hover:text-white transition">
                Start Over
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default InspireModal;
