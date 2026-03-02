import { useState, useEffect } from "react";
import { X, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../lib/api";

export default function CreateQuoteModal({
  isOpen,
  onClose,
  prefillRequestId = "",
}) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    requestId: prefillRequestId,
    productCost: "",
    shippingCost: "",
    serviceFee: "",
  });

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      api
        .getRequests()
        .then((data) => {
          setRequests(data.allrequests || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
      setSuccess(false);
      setError("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (prefillRequestId) {
      setForm((f) => ({ ...f, requestId: prefillRequestId }));
    }
  }, [prefillRequestId]);

  const total =
    (parseInt(form.productCost) || 0) +
    (parseInt(form.shippingCost) || 0) +
    (parseInt(form.serviceFee) || 0);

  const selectedRequest = requests.find((r) => r.id === form.requestId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const result = await api.sendQuotation({
        requestId: form.requestId,
        productCost: parseInt(form.productCost),
        shippingCost: parseInt(form.shippingCost),
        serviceFee: parseInt(form.serviceFee),
      });
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          setForm({
            requestId: "",
            productCost: "",
            shippingCost: "",
            serviceFee: "",
          });
          setSuccess(false);
        }, 2000);
      } else {
        setError(result.message || "Failed to send quotation");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setSending(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg glass-card p-0 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-dark-700/50">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Create Quotation
              </h2>
              <p className="text-sm text-dark-400 mt-0.5">
                Send a price breakdown to the customer
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-dark-400 hover:text-white hover:bg-dark-700/50 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Select Request */}
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">
                Product Request
              </label>
              <select
                value={form.requestId}
                onChange={(e) =>
                  setForm({ ...form, requestId: e.target.value })
                }
                className="input-field w-full"
                required
              >
                <option value="">Select a request...</option>
                {requests.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.fullName} — {r.description?.slice(0, 40)}
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Request Info */}
            {selectedRequest && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-dark-800/40 rounded-xl p-4 border border-dark-700/30 space-y-1"
              >
                <p className="text-xs text-dark-400">
                  Customer:{" "}
                  <span className="text-dark-200">
                    {selectedRequest.fullName}
                  </span>
                </p>
                <p className="text-xs text-dark-400">
                  Email:{" "}
                  <span className="text-dark-200">{selectedRequest.email}</span>
                </p>
                <p className="text-xs text-dark-400">
                  Budget:{" "}
                  <span className="text-dark-200">
                    GHS {selectedRequest.budget?.toLocaleString()}
                  </span>
                </p>
                <p className="text-xs text-dark-400">
                  Qty:{" "}
                  <span className="text-dark-200">
                    {selectedRequest.quantity}
                  </span>{" "}
                  • Colour:{" "}
                  <span className="text-dark-200">
                    {selectedRequest.colour}
                  </span>
                </p>
              </motion.div>
            )}

            {/* Cost Fields */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-dark-400 mb-1.5">
                  Product Cost
                </label>
                <input
                  type="number"
                  value={form.productCost}
                  onChange={(e) =>
                    setForm({ ...form, productCost: e.target.value })
                  }
                  className="input-field w-full text-sm"
                  placeholder="0"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-dark-400 mb-1.5">
                  Shipping Cost
                </label>
                <input
                  type="number"
                  value={form.shippingCost}
                  onChange={(e) =>
                    setForm({ ...form, shippingCost: e.target.value })
                  }
                  className="input-field w-full text-sm"
                  placeholder="0"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-dark-400 mb-1.5">
                  Service Fee
                </label>
                <input
                  type="number"
                  value={form.serviceFee}
                  onChange={(e) =>
                    setForm({ ...form, serviceFee: e.target.value })
                  }
                  className="input-field w-full text-sm"
                  placeholder="0"
                  required
                />
              </div>
            </div>

            {/* Total */}
            <div className="bg-accent-500/5 border border-accent-500/20 rounded-xl p-4 flex items-center justify-between">
              <span className="text-sm font-medium text-dark-300">
                Total Quotation
              </span>
              <span className="text-2xl font-bold text-white">
                GHS {total.toLocaleString()}
              </span>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-sm text-emerald-400 text-center"
              >
                Quotation sent successfully! Email delivered.
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={sending || success}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {sending ? "Sending..." : success ? "Sent!" : "Send Quotation"}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
