import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Eye, FileText, ExternalLink, X } from "lucide-react";
import { api } from "../lib/api";
import CreateQuoteModal from "../components/CreateQuoteModal";

export default function ProductRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState("");
  const [lightboxImg, setLightboxImg] = useState(null);

  useEffect(() => {
    api.getRequests().then((data) => {
      setRequests(data.allrequests || []);
      setLoading(false);
    });
  }, []);

  const filtered = requests.filter(
    (r) =>
      r.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      r.email?.toLowerCase().includes(search.toLowerCase()) ||
      r.description?.toLowerCase().includes(search.toLowerCase()),
  );

  const openQuoteFor = (id) => {
    setSelectedRequestId(id);
    setQuoteModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Product Requests</h1>
          <p className="text-dark-400 text-sm mt-1">
            {requests.length} total requests
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search requests..."
              className="input-field pl-9 pr-4 py-2 text-sm w-64"
            />
          </div>
          <button className="btn-ghost flex items-center gap-2 text-sm border border-dark-700/50">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-700/50">
                <th className="text-left text-xs font-medium text-dark-400 uppercase tracking-wider px-6 py-4">
                  Customer
                </th>
                <th className="text-left text-xs font-medium text-dark-400 uppercase tracking-wider px-6 py-4">
                  Product
                </th>
                <th className="text-left text-xs font-medium text-dark-400 uppercase tracking-wider px-6 py-4 hidden md:table-cell">
                  Image
                </th>
                <th className="text-left text-xs font-medium text-dark-400 uppercase tracking-wider px-6 py-4 hidden sm:table-cell">
                  Budget
                </th>
                <th className="text-left text-xs font-medium text-dark-400 uppercase tracking-wider px-6 py-4 hidden lg:table-cell">
                  Qty
                </th>
                <th className="text-left text-xs font-medium text-dark-400 uppercase tracking-wider px-6 py-4 hidden lg:table-cell">
                  Date
                </th>
                <th className="text-right text-xs font-medium text-dark-400 uppercase tracking-wider px-6 py-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-16 text-dark-500">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-2 border-accent-500/30 border-t-accent-500 rounded-full animate-spin" />
                      <span className="text-sm">Loading requests...</span>
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-16 text-dark-500 text-sm"
                  >
                    No requests found
                  </td>
                </tr>
              ) : (
                filtered.map((req) => {
                  const images = (() => {
                    try {
                      return JSON.parse(req.productImage);
                    } catch {
                      return [];
                    }
                  })();
                  return (
                    <tr key={req.id} className="table-row">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-dark-100">
                            {req.fullName}
                          </p>
                          <p className="text-xs text-dark-500">{req.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-dark-300 max-w-[200px] truncate">
                          {req.description}
                        </p>
                        <p className="text-xs text-dark-500">{req.colour}</p>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        {images[0] ? (
                          <img
                            src={images[0]}
                            alt=""
                            onClick={() => setLightboxImg(images[0])}
                            className="w-10 h-10 rounded-lg object-cover border border-dark-700/50 cursor-pointer hover:ring-2 hover:ring-accent-500/50 transition-all"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-dark-800 border border-dark-700/50 flex items-center justify-center">
                            <Eye className="w-4 h-4 text-dark-600" />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <span className="text-sm text-dark-200 font-medium">
                          GHS {req.budget?.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <span className="text-sm text-dark-300">
                          {req.quantity}
                        </span>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <span className="text-xs text-dark-500">
                          {new Date(req.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => openQuoteFor(req.id)}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-accent-400 hover:text-accent-300 hover:bg-accent-500/5 px-3 py-2 rounded-lg transition-all"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          Create Quote
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Image Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={lightboxImg}
              alt=""
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <CreateQuoteModal
        isOpen={quoteModalOpen}
        onClose={() => {
          setQuoteModalOpen(false);
          setSelectedRequestId("");
        }}
        prefillRequestId={selectedRequestId}
      />
    </div>
  );
}
