import { motion } from "framer-motion";

const stats = [
  {
    number: "1500+",
    label: "Trips Generated",
  },
  {
    number: "98%",
    label: "AI Accuracy",
  },
  {
    number: "24/7",
    label: "Availability",
  },
  {
    number: "40+",
    label: "Destinations",
  },
];

function Stats() {
  return (
    <section className="max-w-7xl mx-auto py-24 px-5">

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

        {stats.map((item, index) => (

          <motion.div

            key={index}

            whileHover={{ y: -10 }}

            className="glass rounded-3xl text-center p-8"

          >

            <h2 className="text-5xl font-bold text-cyan-400">

              {item.number}

            </h2>

            <p className="mt-4 text-slate-300">

              {item.label}

            </p>

          </motion.div>

        ))}

      </div>

    </section>
  );
}

export default Stats;