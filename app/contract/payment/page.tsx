"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/components/ui/toast";

declare global {
  interface Window {
    PaystackPop: {
      setup: (options: {
        key: string;
        email: string;
        amount: number;
        currency: string;
        ref: string;
        metadata?: {
          custom_fields: Array<{
            display_name: string;
            variable_name: string;
            value: string;
          }>;
        };
        callback: (response: { reference: string }) => void;
        onClose: () => void;
      }) => {
        openIframe: () => void;
      };
    };
  }
}

function ContractPaymentForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [services, setServices] = useState<string[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Get data from URL search params or sessionStorage
    const servicesParam = searchParams.get("services");
    const totalParam = searchParams.get("total");

    if (servicesParam && totalParam) {
      try {
        // Services can be comma-separated string or JSON array
        let parsedServices: string[] = [];
        try {
          parsedServices = JSON.parse(decodeURIComponent(servicesParam));
        } catch {
          // If not JSON, treat as comma-separated string
          parsedServices = decodeURIComponent(servicesParam).split(",").map(s => s.trim());
        }
        setServices(parsedServices);
        setTotal(parseFloat(totalParam));
      } catch (e) {
        console.error("Error parsing services data:", e);
      }
    } else {
      // Fallback to sessionStorage
      const storedData = sessionStorage.getItem("customPlanData");
      if (storedData) {
        try {
          const data = JSON.parse(storedData);
          const serviceNames = (data.services || []).map((s: { name: string }) => s.name);
          setServices(serviceNames);
          setTotal(data.total || 0);
        } catch (e) {
          console.error("Error parsing stored data:", e);
        }
      }
    }
  }, [searchParams]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form fields
    if (!formData.businessName || !formData.email || !formData.phone) {
      addToast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "error",
      });
      return;
    }

    if (total === 0 || services.length === 0) {
      addToast({
        title: "Error",
        description: "No services selected. Please go back and select services.",
        variant: "error",
      });
      return;
    }

    setLoading(true);

    try {
      // 1. First save contract record as 'pending'
      const paymentRef = `HOOOOM-${Date.now()}`;
      const saveRes = await fetch("/api/save-contract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "payment",
          business_name: formData.businessName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          selected_services: services,
          total_amount: total,
          payment_reference: paymentRef,
          payment_status: "pending",
        }),
      });

      if (!saveRes.ok) {
        const error = await saveRes.json();
        throw new Error(error.error || "Failed to save contract");
      }

      // 2. Wait for Paystack to be available (poll with timeout)
      let attempts = 0;
      const maxAttempts = 10;
      while (typeof window === "undefined" || !window.PaystackPop) {
        if (attempts >= maxAttempts) {
          throw new Error("Paystack script not loaded. Please refresh the page.");
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
        attempts++;
      }

      const paystackKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
      if (!paystackKey) {
        throw new Error("Paystack public key not configured");
      }

      // 3. Open Paystack popup
      const handler = window.PaystackPop.setup({
        key: paystackKey,
        email: formData.email,
        amount: total * 100, // convert to kobo
        currency: "NGN",
        ref: paymentRef,
        metadata: {
          custom_fields: [
            {
              display_name: "Business Name",
              variable_name: "business_name",
              value: formData.businessName,
            },
            {
              display_name: "Services",
              variable_name: "services",
              value: services.join(", "),
            },
          ],
        },
        callback: function (response: { reference: string }) {
          // Handle payment verification asynchronously
          (async () => {
            try {
              const verifyRes = await fetch("/api/verify-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reference: response.reference }),
              });

              if (verifyRes.ok) {
                addToast({
                  title: "Payment Successful!",
                  description: "Your payment has been confirmed.",
                  variant: "success",
                });
                router.push(`/success?ref=${response.reference}`);
              } else {
                const error = await verifyRes.json();
                addToast({
                  title: "Verification Error",
                  description: error.error || "Payment verification failed.",
                  variant: "error",
                });
              }
            } catch (error) {
              addToast({
                title: "Error",
                description: "Failed to verify payment. Please contact support.",
                variant: "error",
              });
            }
          })();
        },
        onClose: function () {
          setLoading(false);
          addToast({
            title: "Payment Cancelled",
            description: "You closed the payment window.",
            variant: "warning",
          });
        },
      });

      handler.openIframe();
    } catch (error: any) {
      setLoading(false);
      addToast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "error",
      });
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
          <form onSubmit={handlePayment} className="space-y-6">
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

            {/* Bottom Row - Back and Continue */}
            <div className="flex items-center justify-between pt-4">
              <Link
                href="/custom-plan"
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
                {loading ? "Processing..." : "Continue to payment"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default function ContractPaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-24 pb-16 bg-[#EFF4F5] flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    }>
      <ContractPaymentForm />
    </Suspense>
  );
}
