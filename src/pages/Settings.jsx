import { motion } from "framer-motion";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
} from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function Settings() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-dark-400 text-sm mt-1">
          Manage your account and preferences
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[
          {
            icon: User,
            label: "Profile",
            desc: "Update your personal information and avatar",
          },
          {
            icon: Bell,
            label: "Notifications",
            desc: "Configure email and push notification preferences",
          },
          {
            icon: Shield,
            label: "Security",
            desc: "Two-factor authentication and password settings",
          },
          {
            icon: Palette,
            label: "Appearance",
            desc: "Theme, language, and display settings",
          },
        ].map((s, i) => (
          <motion.div
            key={i}
            variants={item}
            className="glass-card-hover p-6 cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-dark-700/50 flex items-center justify-center text-dark-300">
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">
                  {s.label}
                </h3>
                <p className="text-xs text-dark-400">{s.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
