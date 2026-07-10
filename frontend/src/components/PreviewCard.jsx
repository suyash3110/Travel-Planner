import { FaCalendarAlt, FaCloudSun, FaSuitcaseRolling } from "react-icons/fa";
import { motion } from "framer-motion";
import MapRoute from "./MapRoute";

function PreviewCard({ data }) {
  if (!data || !data.itinerary) {
    // Default placeholder state if no data
    return (
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass rounded-3xl p-8 shadow-2xl"
      >
        <h2 className="text-3xl font-bold mb-8">AI Trip Preview</h2>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <FaCalendarAlt className="text-cyan-400" />
                <span className="font-semibold">Day 1</span>
              </div>
              <ul className="text-slate-300 space-y-2 ml-8">
                <li>✔ Check-in Hotel</li>
                <li>✔ Beach Visit</li>
                <li>✔ Sunset Point</li>
                <li>✔ Dinner Cruise</li>
              </ul>
            </div>
            <hr className="border-slate-700"/>
            <div className="flex items-center gap-3">
              <FaCloudSun className="text-yellow-400"/>
              <span>28°C • Sunny</span>
            </div>
            <div className="flex items-center gap-3">
              <FaSuitcaseRolling className="text-blue-400"/>
              <span>Pack sunglasses, sunscreen and flip-flops.</span>
            </div>
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Estimated Budget</h3>
              <div className="text-4xl font-bold text-cyan-400">₹18,500</div>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <MapRoute />
          </div>
        </div>
      </motion.div>
    );
  }

  // Render actual data from AI
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="glass rounded-3xl p-8 shadow-2xl"
    >
      <h2 className="text-3xl font-bold mb-8">Your Custom AI Itinerary</h2>
      
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-10 max-h-[800px] overflow-y-auto pr-4 custom-scrollbar">
          {data.itinerary.map((day, index) => (
            <div key={index} className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <FaCalendarAlt className="text-cyan-400" />
                  <span className="font-semibold text-xl">Day {day.day}</span>
                </div>
                <ul className="text-slate-300 space-y-2 ml-8">
                  {day.activities.map((activity, idx) => (
                    <li key={idx}>✔ {activity}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center gap-3 text-slate-300">
                <FaCloudSun className="text-yellow-400"/>
                <span>{day.weather_guess || "N/A"}</span>
              </div>
              
              <div className="flex items-center gap-3 text-slate-300">
                <FaSuitcaseRolling className="text-blue-400"/>
                <span>{day.packing_suggestions || "No specific suggestions."}</span>
              </div>
              
              {/* Show divider unless it's the last day */}
              {index < data.itinerary.length - 1 && (
                <hr className="border-slate-700"/>
              )}
            </div>
          ))}

          <div className="mt-10 pt-6 border-t border-slate-700">
            <h3 className="font-semibold mb-2 text-xl">Total Estimated Budget</h3>
            <div className="text-4xl font-bold text-cyan-400">
              {data.estimatedBudget}
            </div>
          </div>
        </div>

        {/* Map visualization on the right side */}
        <div className="hidden lg:block sticky top-0">
          <MapRoute destination={data.itinerary.length > 0 ? "Your Destination" : null} />
        </div>
      </div>
    </motion.div>
  );
}

export default PreviewCard;