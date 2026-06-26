"use client";

import { useEffect, useState } from "react";
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
  },
  {
    headline: "Recognized among 53,000+ teams at Google's Agentic AI Hackathon 2025 for building a city-scale agentic AI orchestration platform.",
    icon: Award,
    metric: "53,000+",
    metricLabel: "Teams",
    organization: "Google Agentic AI Hackathon 2025",
    initiative: "National Recognition",
    note: "",
  },
  {
    headline: "Selected among India's leading applied AI innovations at IIT Bombay's National Showcase during E-Summit.",
    icon: Building2,
    metric: "National",
    metricLabel: "Showcase",
    organization: "IIT Bombay",
    initiative: "Applied AI Innovation",
    note: "",
  },
  {
    headline: "Chosen as a high-potential AI startup through the Wadhwani Foundation Liftoff Program.",
    icon: Zap,
    metric: "Startup",
    metricLabel: "Recognition",
    organization: "Wadhwani Foundation",
    initiative: "Enterprise Innovation",
    note: "",
  },
  {
    headline: "Supported by AWS Founders Hub and Microsoft for Startups to build secure, scalable enterprise infrastructure.",
    icon: Cloud,
    metric: "Cloud",
    metricLabel: "Partners",
    organization: "AWS Founders Hub",
    initiative: "Microsoft for Startups",
    note: "",
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
    <section className="relative py-32 lg:py-40 border-t border-foreground/10 lg:pb-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Trusted & Recognized
          </span>
          <div className="flex-1 h-px bg-foreground/10" />
          <span className="font-mono text-xs text-muted-foreground">
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
              <p className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-foreground">
                {activeRecognition.headline}
              </p>
            </div>

            {/* Organization & Initiative */}
            <div
              className={`mt-12 flex items-center gap-6 transition-all duration-300 delay-100 ${
                isAnimating ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center">
                <IconComponent className="w-8 h-8 text-foreground" />
              </div>
              <div>
                <p className="text-lg font-medium text-foreground">{activeRecognition.organization}</p>
                <p className="text-muted-foreground">
                  {activeRecognition.initiative}
                </p>
              </div>
            </div>
          </div>

          {/* Metric Highlight */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <div
              className={`p-8 border border-foreground/10 transition-all duration-300 ${
                isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-4">
                Recognition
              </span>
              <p className="font-display text-3xl md:text-4xl text-foreground mb-2">
                {activeRecognition.metric}
              </p>
              <p className="text-muted-foreground text-sm">
                {activeRecognition.metricLabel}
              </p>
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
                      ? "w-8 bg-foreground"
                      : "w-2 bg-foreground/20 hover:bg-foreground/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Note for current slide */}
        {activeRecognition.note && (
          <div
            className={`mt-12 text-muted-foreground text-sm transition-all duration-300 delay-200 ${
              isAnimating ? "opacity-0" : "opacity-100"
            }`}
          >
            {activeRecognition.note}
          </div>
        )}

        {/* Recognition Partners Label */}
        <div className="mt-24 pt-12 border-t border-foreground/10">
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-8 text-center">
            Supported by leading organizations
          </p>
        </div>
      </div>
      
      {/* Full-width marquee outside container */}
      <div className="w-full">
        <div className="flex gap-16 items-center marquee">
          {[...Array(2)].map((_, setIdx) => (
            <div key={setIdx} className="flex gap-16 items-center shrink-0">
              {["Google", "IIT Bombay", "Wadhwani Foundation", "AWS", "Microsoft", "MIT Sloan", "London Business School", "Jay Shah"].map(
                (org) => (
                  <span
                    key={`${setIdx}-${org}`}
                    className="font-display text-xl md:text-2xl text-foreground/30 whitespace-nowrap hover:text-foreground transition-colors duration-300"
                  >
                    {org}
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
