"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const footerNavItems = [
  { label: "Home", href: "/" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Custom Plan", href: "/#pricing" },
];

export function Footer() {
  return (
    <footer className="bg-[#0B1223] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo - Left */}
          <div>
            <Link href="/" className="text-2xl font-bold text-[#4ECDC4] flex items-center gap-1">
              <span className="text-teal-400">H</span>
              <span className="w-6 h-6 rounded-full bg-teal-400 flex items-center justify-center text-white text-xs font-bold">o</span>
              <span className="w-6 h-6 rounded-full bg-teal-400 flex items-center justify-center text-white text-xs font-bold">o</span>
              <span className="w-6 h-6 rounded-full bg-teal-400 flex items-center justify-center text-white text-xs font-bold">o</span>
              <span className="text-teal-400">M</span>
            </Link>
          </div>

          {/* Navigation Links - Center */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {footerNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA - Right */}
          <div className="flex items-center">
            <Link href="/contract/waitlist">
              <Button className="bg-teal-400 hover:bg-teal-500 text-white px-8 py-3 rounded-full font-medium transition-colors shadow-[4px_4px_8px_rgba(20,184,166,0.3),-4px_4px_8px_rgba(20,184,166,0.3),0_4px_8px_rgba(20,184,166,0.3)]">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Horizontal Line and Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-400 text-center">
            © 2026 HoooM. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
