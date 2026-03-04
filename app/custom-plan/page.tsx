"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  selected: boolean;
}

const services: Service[] = [
  {
    id: "1",
    name: "Social Media Management",
    description: "Content creation & scheduling across platforms",
    price: 950000,
    selected: true,
  },
  {
    id: "2",
    name: "Content Strategy & Blogging",
    description: "Visual assets, banners & brand materials",
    price: 950000,
    selected: false,
  },
  {
    id: "3",
    name: "Paid Advertising (PPC)",
    description: "Google ads & meta ads management",
    price: 950000,
    selected: false,
  },
  {
    id: "4",
    name: "SEO Optimization",
    description: "On-page, technical & backlink strategy",
    price: 950000,
    selected: false,
  },
  {
    id: "5",
    name: "Email Marketing",
    description: "Campaign, automation & list management",
    price: 950000,
    selected: false,
  },
  {
    id: "6",
    name: "Brand & Creative Design",
    description: "Visual assets, banners & brand materials",
    price: 950000,
    selected: true,
  },
  {
    id: "7",
    name: "Analytics & Reporting",
    description: "Monthly dashboard & performance insights",
    price: 950000,
    selected: false,
  },
  {
    id: "8",
    name: "PR & Media Outreach",
    description: "Press releases & media placement",
    price: 950000,
    selected: true,
  },
];

export default function CustomPlanPage() {
  const router = useRouter();
  const [serviceList, setServiceList] = useState<Service[]>(services);

  const toggleService = (id: string) => {
    setServiceList((prev) =>
      prev.map((service) =>
        service.id === id ? { ...service, selected: !service.selected } : service
      )
    );
  };

  const selectedServices = serviceList.filter((s) => s.selected);
  const total = selectedServices.reduce((sum, service) => sum + service.price, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Build Your Custom Plan
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Select the services you need, Pricing is calculated in real time
          </p>
        </motion.div>

        {/* Two Column Grid */}
        <div className="grid lg:grid-cols-[1fr_600px] gap-8">
          {/* Left Column - Service Checklist */}
          <div className="space-y-4">
            {serviceList.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => toggleService(service.id)}
                className={`
                  relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-200
                  ${
                    service.selected
                      ? "bg-blue-50 border-orange-500 shadow-md"
                      : "bg-white border-gray-200 hover:border-gray-300"
                  }
                `}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {service.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-orange-500 font-bold text-lg">
                        ₦{formatPrice(service.price)}
                      </span>
                      <span className="text-gray-500 italic text-sm">
                        /Monthly
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div
                      className={`
                        w-6 h-6 rounded border-2 flex items-center justify-center transition-all
                        ${
                          service.selected
                            ? "bg-orange-500 border-orange-500"
                            : "border-gray-300 bg-white"
                        }
                      `}
                    >
                      {service.selected && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column - Sticky Summary Card */}
          <div className="lg:sticky lg:top-24 h-fit">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#E07B2A] rounded-lg p-6 shadow-xl relative overflow-hidden"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                backgroundSize: "20px 20px",
              }}
            >
              <h2 className="text-white font-bold text-xl mb-6">Service List</h2>

              <div className="space-y-3 mb-6 max-h-[400px] overflow-y-auto">
                {selectedServices.length === 0 ? (
                  <p className="text-white/80 text-sm">No services selected</p>
                ) : (
                  selectedServices.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between pb-3 border-b border-white/20 last:border-0"
                    >
                      <span className="text-white text-sm flex-1">
                        {service.name}
                      </span>
                      <span className="text-white font-semibold text-sm ml-4">
                        ₦{formatPrice(service.price)}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <div className="flex items-center justify-between mb-6 pt-4 border-t border-white/30">
                <span className="text-white font-bold text-lg">Monthly Total</span>
                <motion.span
                  key={total}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className="text-white font-bold text-2xl"
                >
                  ₦{formatPrice(total)}
                </motion.span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  // Store selected services and total in sessionStorage
                  const selectedServicesData = selectedServices.map((s) => ({
                    id: s.id,
                    name: s.name,
                    price: s.price,
                  }));
                  sessionStorage.setItem(
                    "customPlanData",
                    JSON.stringify({
                      services: selectedServicesData,
                      total: total,
                    })
                  );
                  // Navigate to payment page with query params
                  // Pass services as comma-separated string
                  const servicesNames = selectedServices.map((s) => s.name).join(",");
                  router.push(
                    `/contract/payment?services=${encodeURIComponent(servicesNames)}&total=${total}`
                  );
                }}
                disabled={selectedServices.length === 0}
                className="w-full bg-teal-400 hover:bg-teal-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-4 rounded-full transition-colors shadow-lg"
              >
                Pay ₦{formatPrice(total)}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
