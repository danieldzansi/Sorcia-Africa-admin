import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function Analytics() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-dark-400 text-sm mt-1">
          Business intelligence and insights
        </p>
      </motion.div>

      <motion.div variants={item} className="glass-card p-16 text-center">
        <BarChart3 className="w-12 h-12 text-dark-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-dark-300 mb-2">
          Analytics coming soon
        </h3>
        <p className="text-sm text-dark-500 max-w-md mx-auto">
          Detailed analytics with conversion rates, revenue trends, customer
          insights, and sourcing performance metrics will be available here.
        </p>
      </motion.div>
    </motion.div>
  );
}
