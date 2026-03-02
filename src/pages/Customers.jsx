import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Mail, Phone } from "lucide-react";
import { api } from "../lib/api";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getRequests().then((data) => {
      // Deduplicate by email
      const map = new Map();
      (data.allrequests || []).forEach((r) => {
        if (!map.has(r.email)) {
          map.set(r.email, { ...r, requestCount: 1 });
        } else {
          map.get(r.email).requestCount++;
        }
      });
      setCustomers(Array.from(map.values()));
      setLoading(false);
    });
  }, []);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-white">Customers</h1>
        <p className="text-dark-400 text-sm mt-1">
          {customers.length} unique customers
        </p>
      </motion.div>

      <motion.div
        variants={item}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {loading ? (
          <div className="col-span-full flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-accent-500/30 border-t-accent-500 rounded-full animate-spin" />
          </div>
        ) : customers.length === 0 ? (
          <div className="col-span-full glass-card p-16 text-center">
            <Users className="w-12 h-12 text-dark-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-dark-300">
              No customers yet
            </h3>
          </div>
        ) : (
          customers.map((c, i) => (
            <motion.div
              key={c.email}
              variants={item}
              className="glass-card-hover p-5"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center text-white text-sm font-bold">
                  {c.fullName?.charAt(0)?.toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white truncate">
                    {c.fullName}
                  </p>
                  <p className="text-xs text-dark-400">
                    {c.requestCount} request{c.requestCount > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-dark-400">
                  <Mail className="w-3.5 h-3.5" />
                  <span className="truncate">{c.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-dark-400">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{c.phone}</span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
}
