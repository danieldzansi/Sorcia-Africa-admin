import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  PackageSearch,
  FileText,
  CheckCircle2,
  DollarSign,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { api } from "../lib/api";

const revenueData = [
  { month: "Jul", revenue: 4200 },
  { month: "Aug", revenue: 5800 },
  { month: "Sep", revenue: 4900 },
  { month: "Oct", revenue: 7200 },
  { month: "Nov", revenue: 6800 },
  { month: "Dec", revenue: 8500 },
  { month: "Jan", revenue: 9200 },
  { month: "Feb", revenue: 11000 },
  { month: "Mar", revenue: 10500 },
];

const PIE_COLORS = ["#FF581A", "#003C56", "#ff8040", "#006591"];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Dashboard() {
  const [requests, setRequests] = useState([]);
  const [quotations, setQuotations] = useState([]);

  useEffect(() => {
    api.getRequests().then((d) => setRequests(d.allrequests || []));
    api.listQuotations().then((d) => setQuotations(d.quotations || []));
  }, []);

  const approvedQuotes = quotations.filter((q) => q.status === "approved");
  const sentQuotes = quotations.filter((q) => q.status === "sent");
  const totalRevenue = approvedQuotes.reduce(
    (sum, q) => sum + (q.total || 0),
    0,
  );

  const statusData = [
    { name: "New Requests", value: requests.length },
    { name: "Quotes Sent", value: sentQuotes.length },
    { name: "Approved", value: approvedQuotes.length },
    { name: "Pending", value: sentQuotes.length },
  ];

  const kpis = [
    {
      label: "Total Requests",
      value: requests.length,
      icon: PackageSearch,
      change: "+12%",
      up: true,
      color: "from-accent-500/10 to-transparent",
      iconColor: "text-accent-400",
      borderColor: "border-accent-500/10",
    },
    {
      label: "Quotes Sent",
      value: quotations.length,
      icon: FileText,
      change: "+8%",
      up: true,
      color: "from-dark-500/10 to-transparent",
      iconColor: "text-dark-300",
      borderColor: "border-dark-500/10",
    },
    {
      label: "Approved Quotes",
      value: approvedQuotes.length,
      icon: CheckCircle2,
      change: "+24%",
      up: true,
      color: "from-emerald-500/10 to-transparent",
      iconColor: "text-emerald-400",
      borderColor: "border-emerald-500/10",
    },
    {
      label: "Revenue",
      value: `GHS ${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: "+18%",
      up: true,
      color: "from-accent-400/10 to-transparent",
      iconColor: "text-accent-300",
      borderColor: "border-accent-400/10",
    },
    {
      label: "Pending",
      value: sentQuotes.length,
      icon: Clock,
      change: "-5%",
      up: false,
      color: "from-rose-500/10 to-transparent",
      iconColor: "text-rose-400",
      borderColor: "border-rose-500/10",
    },
  ];

  const recentActivity = [
    ...requests
      .slice(-5)
      .reverse()
      .map((r) => ({
        type: "request",
        label: `New request from ${r.fullName}`,
        time: new Date(r.createdAt).toLocaleDateString(),
        icon: PackageSearch,
        color: "text-accent-400 bg-accent-500/10",
      })),
    ...quotations
      .slice(-3)
      .reverse()
      .map((q) => ({
        type: "quote",
        label: `Quotation ${q.status} — GHS ${q.total?.toLocaleString()}`,
        time: new Date(q.createdAt).toLocaleDateString(),
        icon: FileText,
        color:
          q.status === "approved"
            ? "text-emerald-400 bg-emerald-500/10"
            : "text-accent-300 bg-accent-500/10",
      })),
  ].slice(0, 8);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-dark-400 text-sm mt-1">
          Welcome back. Here's what's happening today.
        </p>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        variants={item}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
      >
        {kpis.map((kpi, i) => (
          <div key={i} className={`kpi-card ${kpi.borderColor}`}>
            <div
              className={`absolute inset-0 bg-gradient-to-br ${kpi.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
            />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-10 h-10 rounded-xl ${kpi.iconColor} bg-dark-700/50 flex items-center justify-center`}
                >
                  <kpi.icon className="w-5 h-5" />
                </div>
                <span
                  className={`flex items-center gap-0.5 text-xs font-medium ${kpi.up ? "text-emerald-400" : "text-rose-400"}`}
                >
                  {kpi.up ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {kpi.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-white">{kpi.value}</p>
              <p className="text-xs text-dark-400 mt-1">{kpi.label}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div variants={item} className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-white">
                Revenue Overview
              </h3>
              <p className="text-xs text-dark-400 mt-0.5">
                Monthly revenue trend
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              +18%
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF581A" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#FF581A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#002d41" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#006591", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#006591", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#002d41",
                    border: "1px solid #003C56",
                    borderRadius: "12px",
                    color: "#e6f0f4",
                    fontSize: "13px",
                  }}
                  formatter={(value) => [
                    `GHS ${value.toLocaleString()}`,
                    "Revenue",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#FF581A"
                  strokeWidth={2.5}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Status Pie Chart */}
        <motion.div variants={item} className="glass-card p-6">
          <h3 className="text-base font-semibold text-white mb-1">
            Request Status
          </h3>
          <p className="text-xs text-dark-400 mb-4">Distribution overview</p>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {statusData.map((_, index) => (
                    <Cell key={index} fill={PIE_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#002d41",
                    border: "1px solid #003C56",
                    borderRadius: "12px",
                    color: "#e6f0f4",
                    fontSize: "13px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {statusData.map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: PIE_COLORS[i] }}
                  />
                  <span className="text-dark-400">{s.name}</span>
                </div>
                <span className="text-dark-200 font-medium">{s.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div variants={item} className="glass-card p-6">
        <h3 className="text-base font-semibold text-white mb-4">
          Recent Activity
        </h3>
        <div className="space-y-3">
          {recentActivity.length > 0 ? (
            recentActivity.map((act, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-dark-800/40 transition-colors"
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${act.color}`}
                >
                  <act.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-dark-200 truncate">{act.label}</p>
                  <p className="text-xs text-dark-500">{act.time}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-dark-500 text-center py-8">
              No recent activity
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
