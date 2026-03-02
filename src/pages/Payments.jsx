import { motion } from "framer-motion";
import { CreditCard, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function Payments() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-white">Payments</h1>
        <p className="text-dark-400 text-sm mt-1">
          Track and manage all customer payments
        </p>
      </motion.div>

      <motion.div
        variants={item}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {[
          {
            label: "Total Received",
            value: "GHS 0",
            icon: CreditCard,
            color: "text-emerald-400 bg-emerald-500/10",
          },
          {
            label: "Pending",
            value: "0",
            icon: Clock,
            color: "text-amber-400 bg-amber-500/10",
          },
          {
            label: "Failed",
            value: "0",
            icon: AlertCircle,
            color: "text-red-400 bg-red-500/10",
          },
        ].map((s, i) => (
          <div key={i} className="glass-card p-5 flex items-center gap-4">
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center ${s.color}`}
            >
              <s.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-dark-400">{s.label}</p>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div variants={item} className="glass-card p-16 text-center">
        <CreditCard className="w-12 h-12 text-dark-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-dark-300 mb-2">
          Payment integration coming soon
        </h3>
        <p className="text-sm text-dark-500 max-w-md mx-auto">
          Once customers approve quotations and make payments, all transactions
          will appear here with full tracking.
        </p>
      </motion.div>
    </motion.div>
  );
}
