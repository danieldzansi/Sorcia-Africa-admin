import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, CheckCircle2, Clock, Send } from "lucide-react";
import { api } from "../lib/api";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export default function Quotations() {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.listQuotations().then((data) => {
      setQuotations(data.quotations || []);
      setLoading(false);
    });
  }, []);

  const statusBadge = (status) => {
    switch (status) {
      case "approved":
        return "badge-success";
      case "sent":
        return "badge-info";
      case "rejected":
        return "badge-danger";
      default:
        return "badge-warning";
    }
  };

  const statusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="w-3.5 h-3.5" />;
      case "sent":
        return <Send className="w-3.5 h-3.5" />;
      default:
        return <Clock className="w-3.5 h-3.5" />;
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-white">Quotations</h1>
        <p className="text-dark-400 text-sm mt-1">
          {quotations.length} quotations sent
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={item}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {[
          {
            label: "Total Sent",
            value: quotations.length,
            icon: FileText,
            color: "text-blue-400 bg-blue-500/10",
          },
          {
            label: "Approved",
            value: quotations.filter((q) => q.status === "approved").length,
            icon: CheckCircle2,
            color: "text-emerald-400 bg-emerald-500/10",
          },
          {
            label: "Pending",
            value: quotations.filter((q) => q.status === "sent").length,
            icon: Clock,
            color: "text-amber-400 bg-amber-500/10",
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

      {/* Table */}
      <motion.div variants={item} className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-700/50">
                <th className="text-left text-xs font-medium text-dark-400 uppercase tracking-wider px-6 py-4">
                  ID
                </th>
                <th className="text-left text-xs font-medium text-dark-400 uppercase tracking-wider px-6 py-4">
                  Product Cost
                </th>
                <th className="text-left text-xs font-medium text-dark-400 uppercase tracking-wider px-6 py-4 hidden sm:table-cell">
                  Shipping
                </th>
                <th className="text-left text-xs font-medium text-dark-400 uppercase tracking-wider px-6 py-4 hidden sm:table-cell">
                  Service Fee
                </th>
                <th className="text-left text-xs font-medium text-dark-400 uppercase tracking-wider px-6 py-4">
                  Total
                </th>
                <th className="text-left text-xs font-medium text-dark-400 uppercase tracking-wider px-6 py-4">
                  Status
                </th>
                <th className="text-left text-xs font-medium text-dark-400 uppercase tracking-wider px-6 py-4 hidden lg:table-cell">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-16 text-dark-500">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-2 border-accent-500/30 border-t-accent-500 rounded-full animate-spin" />
                      <span className="text-sm">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : quotations.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-16 text-dark-500 text-sm"
                  >
                    No quotations yet
                  </td>
                </tr>
              ) : (
                quotations.map((q) => (
                  <motion.tr key={q.id} variants={item} className="table-row">
                    <td className="px-6 py-4">
                      <span className="text-xs text-dark-400 font-mono">
                        {q.id?.slice(0, 8)}...
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-dark-200 font-medium">
                      GHS {q.productCost?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-dark-300 hidden sm:table-cell">
                      GHS {q.shippingCost?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-dark-300 hidden sm:table-cell">
                      GHS {q.serviceFee?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-white font-semibold">
                      GHS {q.total?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`${statusBadge(q.status)} inline-flex items-center gap-1.5`}
                      >
                        {statusIcon(q.status)}
                        {q.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className="text-xs text-dark-500">
                        {new Date(q.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
