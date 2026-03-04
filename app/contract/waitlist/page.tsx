"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/components/ui/toast";

export default function ContractWaitlistPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/save-contract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "waitlist",
          business_name: formData.businessName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          selected_services: [],
          total_amount: 0,
          payment_reference: null,
          payment_status: "pending",
        }),
      });

      if (res.ok) {
        addToast({
          title: "Success!",
          description: "You've been added to the waitlist. We'll be in touch soon!",
          variant: "success",
        });
        // Reset form
        setFormData({
          businessName: "",
          email: "",
          phone: "",
          message: "",
        });
        // Navigate home after a short delay
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        const error = await res.json();
        addToast({
          title: "Error",
          description: error.error || "Failed to submit. Please try again.",
          variant: "error",
        });
      }
    } catch (error) {
      addToast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className="min-h-screen pt-24 pb-16 bg-[#EFF4F5]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)
        `,
        backgroundSize: "20px 20px",
      }}
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Contract Details
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            We&apos;ll send you a confirmation with your custom plan details and next steps.
          </p>
        </motion.div>

        {/* White Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-6 md:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Name */}
            <div>
              <label
                htmlFor="businessName"
                className="block text-sm font-bold text-gray-900 mb-2"
              >
                Business Name
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Enter business name here"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                required
              />
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-gray-900 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address here"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-bold text-gray-900 mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number here"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                required
              />
            </div>

            {/* Tell us about your business */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-bold text-gray-900 mb-2"
              >
                Tell us about your business
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type a message here"
                rows={6}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent resize-none"
                required
              />
            </div>

            {/* Bottom Row - Back and Submit */}
            <div className="flex items-center justify-between pt-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Back
              </Link>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="bg-[#4DC8C8] hover:bg-[#3db8b8] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold px-8 py-3 rounded-full transition-colors shadow-lg"
              >
                {loading ? "Submitting..." : "Submit & Join the waitlist"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
