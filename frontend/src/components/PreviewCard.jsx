import { FaCalendarAlt, FaCloudSun, FaSuitcaseRolling } from "react-icons/fa";
import { motion } from "framer-motion";

function PreviewCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="glass rounded-3xl p-8 shadow-2xl"
    >
      <h2 className="text-3xl font-bold mb-8">
        AI Trip Preview
      </h2>

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

          <h3 className="font-semibold mb-2">

            Estimated Budget

          </h3>

          <div className="text-4xl font-bold text-cyan-400">

            ₹18,500

          </div>

        </div>

      </div>
    </motion.div>
  );
}

export default PreviewCard;