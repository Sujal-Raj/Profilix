"use client"

import React, { useState } from 'react';
import { Github, Linkedin, Twitter, Instagram, Mail, ArrowUp } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(true);

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/Sujal-Raj/portfilio-generator' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/sujalraj1/' },
    // { icon: Twitter, label: 'Twitter', href: '#' },
    // { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Mail, label: 'Email', href: 'mailto:developersujal4@gmail.com' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-black dark:bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-black dark:bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main content */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-3 tracking-tight">
            Ready to Create Your Portfolio?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who trust our platform to showcase their best work.
          </p>
          <Link href={"/create/portfolio"}>
          <button className="group relative bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-lg text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer">
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-gray-800 dark:bg-gray-200 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
          </button>
          </Link>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent my-12" />

        {/* Social links and bottom content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Social icons */}
          <div className="flex gap-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  onMouseEnter={() => setHoveredIcon(index)}
                  onMouseLeave={() => setHoveredIcon(null)}
                  className="group relative p-3 rounded-full border-2 border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all duration-300 hover:scale-110 hover:rotate-12"
                >
                  <Icon 
                    size={20} 
                    className="text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-300" 
                  />
                  {hoveredIcon === index && (
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black text-xs px-3 py-1 rounded whitespace-nowrap opacity-0 animate-fadeIn">
                      {social.label}
                    </span>
                  )}
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2026 Profilix. All rights reserved.
            </p>
          </div>

          {/* Scroll to top button */}
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="group p-3 rounded-full border-2 border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white hover:bg-black dark:hover:bg-white transition-all duration-300 hover:scale-110"
              aria-label="Scroll to top"
            >
              <ArrowUp 
                size={20} 
                className="text-gray-600 dark:text-gray-400 group-hover:text-white dark:group-hover:text-black duration-300 group-hover:-translate-y-1 transform transition-transform" 
              />
            </button>
          )}
        </div>

        {/* Additional links */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href={"/privacy-policy"} className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300 relative group">
              Privacy Policy
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black dark:bg-white group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="/terms-of-service" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300 relative group">
              Terms of Service
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black dark:bg-white group-hover:w-full transition-all duration-300" />
            </Link>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300 relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black dark:bg-white group-hover:w-full transition-all duration-300" />
            </a>
          </div>
        </div>
      </div>

          <section>
          <div className={`relative w-full py-4 !pb-0 sm:py-6 md:py-8 lg:py-10 overflow-hidden `}>
      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none" />
      
      <h2 className="uppercase text-2xl sm:text-3xl md:text-4xl lg:text-[6rem] xl:text-[8rem] 2xl:text-[10rem] text-center tracking-tighter text-gray-900 dark:text-gray-100 opacity-5 dark:opacity-10 select-none pointer-events-none whitespace-nowrap font-semibold">
        Profilix
      </h2>
    </div>
    </section>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </footer>
  );
}