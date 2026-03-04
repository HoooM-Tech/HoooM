"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

interface Contract {
  id: string;
  created_at: string;
  type: "waitlist" | "payment";
  business_name: string;
  email: string;
  phone: string;
  message: string | null;
  selected_services: string[];
  total_amount: number;
  payment_reference: string | null;
  payment_status: "pending" | "paid";
}

export default function AdminContractsPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [filter, setFilter] = useState<"all" | "waitlist" | "payment">("all");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContracts = async (isRefresh = false) => {
    if (!password && !isRefresh) {
      setError("Please enter password");
      return;
    }

    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const res = await fetch(`/api/contracts?password=${encodeURIComponent(password)}`);
      if (res.ok) {
        const { data } = await res.json();
        setContracts(data);
        setAuthed(true);
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Wrong password");
        setAuthed(false);
      }
    } catch (err) {
      setError("Failed to fetch contracts");
      setAuthed(false);
    } finally {
      if (isRefresh) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  const handleRefresh = () => {
    if (password) {
      fetchContracts(true);
    }
  };

  const filteredContracts =
    filter === "all"
      ? contracts
      : contracts.filter((c) => c.type === filter);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!authed) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-[#EFF4F5] flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Admin Dashboard
            </h1>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      fetchContracts();
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                  placeholder="Enter admin password"
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm">{error}</div>
              )}

              <button
                type="button"
                onClick={() => fetchContracts()}
                disabled={loading}
                className="w-full bg-teal-400 hover:bg-teal-500 disabled:bg-gray-400 text-white font-medium py-3 rounded-full transition-colors"
              >
                {loading ? "Loading..." : "Access Dashboard"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#EFF4F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-0">
              Contracts Dashboard
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filter === "all"
                      ? "bg-teal-400 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("waitlist")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filter === "waitlist"
                      ? "bg-teal-400 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Waitlist
                </button>
                <button
                  onClick={() => setFilter("payment")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filter === "payment"
                      ? "bg-teal-400 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Payment
                </button>
              </div>
              <motion.button
                onClick={handleRefresh}
                disabled={refreshing || !authed}
                whileHover={{ scale: refreshing ? 1 : 1.05 }}
                whileTap={{ scale: refreshing ? 1 : 0.95 }}
                className={`ml-2 p-2 rounded-full transition-colors ${
                  refreshing || !authed
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-teal-400 text-white hover:bg-teal-500"
                }`}
                title="Refresh contracts"
              >
                <motion.div
                  animate={{ rotate: refreshing ? 360 : 0 }}
                  transition={{
                    duration: refreshing ? 1 : 0,
                    repeat: refreshing ? Infinity : 0,
                    ease: "linear",
                  }}
                >
                  <RefreshCw className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">Type</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">Business</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">Phone</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">Services</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">Total</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">Ref</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredContracts.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                      No contracts found
                    </td>
                  </tr>
                ) : (
                  filteredContracts.map((contract) => (
                    <tr key={contract.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {formatDate(contract.created_at)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            contract.type === "waitlist"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {contract.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {contract.business_name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {contract.email}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {contract.phone}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {contract.selected_services.length > 0
                          ? contract.selected_services.join(", ")
                          : "—"}
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                        {contract.total_amount > 0
                          ? `₦${formatPrice(contract.total_amount)}`
                          : "—"}
                      </td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-600">
                        {contract.payment_reference || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            contract.payment_status === "paid"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {contract.payment_status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-sm text-gray-600">
            Showing {filteredContracts.length} of {contracts.length} contracts
          </div>
        </div>
      </div>
    </div>
  );
}
