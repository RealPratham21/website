"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Users, Award, Building2, Zap, Cloud } from "lucide-react";

const recognitions = [
  {
    headline: "ForesightFlow is helping transform retail intelligence at enterprise scale.",
    icon: Users,
    metric: "10,000+",
    metricLabel: "Enterprise Users",
    organization: "Jay Shah Consultancy",
    initiative: "ForesightFlow Retail AI Platform",
    note: "Research supported by comparative studies from MIT Sloan and London Business School.",
    image: "/ff.png",
    imageAlt: "ForesightFlow recognition visual",
  },
  {
    headline: "Recognized among 53,000+ teams at Google's Agentic AI Hackathon 2025 for building a city-scale agentic AI orchestration platform.",
    icon: Award,
    metric: "53,000+",
    metricLabel: "Teams",
    organization: "Google Agentic AI Hackathon 2025",
    initiative: "National Recognition",
    note: "",
    image: "/google%20hackthon.jpeg",
    imageAlt: "Google Agentic AI Hackathon recognition visual",
  },
  {
    headline: "Selected among India's leading applied AI innovations at IIT Bombay's National Showcase during E-Summit.",
    icon: Building2,
    metric: "National",
    metricLabel: "Showcase",
    organization: "IIT Bombay",
    initiative: "Applied AI Innovation",
    note: "",
    image: "/iit-bombay-showcase.png",
    imageAlt: "IIT Bombay showcase recognition visual",
  },
  {
    headline: "Chosen as a high-potential AI startup through the Wadhwani Foundation Liftoff Program.",
    icon: Zap,
    metric: "Startup",
    metricLabel: "Recognition",
    organization: "Wadhwani Foundation",
    initiative: "Enterprise Innovation",
    note: "",
    image: "/wadhwani_Foundation.png",
    imageAlt: "Wadhwani Foundation recognition visual",
  },
  {
    headline: "Supported by AWS Founders Hub and Microsoft for Startups to build secure, scalable enterprise infrastructure.",
    icon: Cloud,
    metric: "Cloud",
    metricLabel: "Partners",
    organization: "AWS Founders Hub",
    initiative: "Microsoft for Startups",
    note: "",
    image: "/microsoft%20hub.png",
    imageAlt: "Microsoft for Startups and AWS Founders Hub recognition visual",
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % recognitions.length);
        setIsAnimating(false);
      }, 300);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const activeRecognition = recognitions[activeIndex];
  const IconComponent = activeRecognition.icon;

  return (
    <section id="about" className="relative py-32 lg:py-40 border-t border-cyan-200/20 fintech-navy-surface text-white lg:pb-14 scroll-mt-24">
      {/* Recognition Partners Label */}
      <div className="mb-20">
        <p className="font-mono text-xs tracking-widest text-cyan-100/58 uppercase mb-8 text-center">
          Supported by leading organizations
        </p>

        {/* Full-width marquee outside container */}
        <div className="w-full">
          <div className="flex gap-16 items-center marquee">
            {[...Array(2)].map((_, setIdx) => (
              <div key={setIdx} className="flex gap-16 items-center shrink-0">
                {["Google", "IIT Bombay", "Wadhwani Foundation", "AWS", "Microsoft", "MIT Sloan", "London Business School", "Jay Shah"].map(
                  (org) => (
                    <span
                      key={`${setIdx}-${org}`}
                      className="font-display text-xl md:text-2xl text-white/30 whitespace-nowrap hover:text-white transition-colors duration-300"
                    >
                      {org}
                    </span>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs tracking-widest text-cyan-100/58 uppercase">
            Trusted & Recognized
          </span>
          <div className="flex-1 h-px bg-cyan-100/18" />
          <span className="font-mono text-xs text-cyan-100/58">
            {String(activeIndex + 1).padStart(2, "0")} / {String(recognitions.length).padStart(2, "0")}
          </span>
        </div>

        {/* Main Headline */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-8">
            <div
              className={`transition-all duration-300 ${
                isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              }`}
            >
              <p className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-white">
                {activeRecognition.headline}
              </p>
            </div>

            {/* Organization & Initiative */}
            <div
              className={`mt-12 flex items-center gap-6 transition-all duration-300 delay-100 ${
                isAnimating ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-white/10 border border-cyan-100/20 flex items-center justify-center">
                <IconComponent className="w-8 h-8 text-cyan-100" />
              </div>
              <div>
                <p className="text-lg font-medium text-white">{activeRecognition.organization}</p>
                <p className="text-cyan-100/62">
                  {activeRecognition.initiative}
                </p>
              </div>
            </div>
          </div>

          {/* Recognition Image */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <div
              className={`relative aspect-[4/3] overflow-hidden border border-cyan-100/20 bg-gradient-to-br from-white to-cyan-100/80 shadow-[0_28px_90px_rgba(0,0,0,0.28)] transition-all duration-300 ${
                isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(208,236,255,0.95),transparent_55%)] pointer-events-none" />
              <div className="relative h-full w-full p-6">
                <Image
                  key={activeRecognition.image}
                  src={activeRecognition.image}
                  alt={activeRecognition.imageAlt}
                  fill
                  className="object-contain"
                  sizes="(min-width: 1024px) 28rem, 100vw"
                />
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex gap-2 mt-8">
              {recognitions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsAnimating(true);
                    setTimeout(() => {
                      setActiveIndex(idx);
                      setIsAnimating(false);
                    }, 300);
                  }}
                  className={`h-2 transition-all duration-300 ${
                    idx === activeIndex
                      ? "w-8 bg-cyan-200"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Note for current slide */}
        {activeRecognition.note && (
          <div
            className={`mt-12 text-cyan-100/58 text-sm transition-all duration-300 delay-200 ${
              isAnimating ? "opacity-0" : "opacity-100"
            }`}
          >
            {activeRecognition.note}
          </div>
        )}

      </div>
    </section>
  );
}
