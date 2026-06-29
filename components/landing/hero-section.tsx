"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatedSphere } from "./animated-sphere";

const words = ["Operate", "Scale", "Orchestrate", "Transform"];
const longestWord = words.reduce((longest, word) =>
  word.length > longest.length ? word : longest
);

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pb-32 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(238,247,255,0.9)_68%,rgba(255,255,255,0.96)_100%)]">
      {/* Animated sphere background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] opacity-40 pointer-events-none">
        <AnimatedSphere />
      </div>
      
      {/* Subtle grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-foreground/10"
            style={{
              top: `${12.5 * (i + 1)}%`,
              left: 0,
              right: 0,
            }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-foreground/10"
            style={{
              left: `${8.33 * (i + 1)}%`,
              top: 0,
              bottom: 0,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-32 lg:py-40">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left: Eyebrow and Headline */}
          <div className="lg:col-span-7">
            <div 
              className={`mb-8 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
                <span className="w-8 h-px bg-foreground/30" />
                AI Infrastructure for Regulated Enterprises
              </span>
            </div>
            
            {/* Main headline - 75% size */}
            <div className="mb-12">
              <h1 
                className={`text-[clamp(2.25rem,9vw,7.5rem)] font-display leading-[0.9] tracking-tight transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <span className="block">Infrastructure</span>
                <span className="block whitespace-nowrap">
                  to{" "}
                  <span className="relative inline-grid align-baseline">
                    <span className="invisible">
                      {longestWord}
                    </span>
                    <span 
                      key={wordIndex}
                      className="absolute inset-0 inline-flex text-primary [text-shadow:0_0_22px_rgba(47,91,255,0.22)]"
                    >
                      {words[wordIndex].split("").map((char, i) => (
                        <span
                          key={`${wordIndex}-${i}`}
                          className="inline-block animate-char-in bg-gradient-to-r from-primary via-cyan-600 to-blue-700 bg-clip-text text-transparent"
                          style={{
                            animationDelay: `${i * 50}ms`,
                          }}
                        >
                          {char}
                        </span>
                      ))}
                    </span>
                  </span>
                </span>
              </h1>
            </div>
          </div>
          
          {/* Right: CTAs */}
          <div className="lg:col-span-5 flex flex-col justify-end lg:items-end lg:pt-24">
            <div 
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-14 text-base rounded-full group shadow-[0_16px_40px_rgba(47,91,255,0.22)]"
              >
                Explore Zord
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 px-8 text-base rounded-full border-primary/25 bg-white/70 hover:bg-primary/5"
              >
                Request Demo
              </Button>
            </div>
          </div>
        </div>
        
      </div>
      
      {/* White background section for stats */}
      <div className="w-full bg-white/70 mt-40 lg:mt-52 py-12 backdrop-blur">
        {/* Stats marquee */}
        <div 
          className={`transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex gap-16 marquee whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-16">
                {[
                  { value: "20 days", label: "saved on builds", company: "NETFLIX" },
                  { value: "98%", label: "faster deployment", company: "STRIPE" },
                  { value: "300%", label: "throughput increase", company: "LINEAR" },
                  { value: "6x", label: "faster to ship", company: "NOTION" },
                ].map((stat) => (
                  <div key={`${stat.company}-${i}`} className="flex items-baseline gap-4">
                    <span className="text-4xl lg:text-5xl font-display">{stat.value}</span>
                    <span className="text-sm text-muted-foreground">
                      {stat.label}
                      <span className="block font-mono text-xs mt-1">{stat.company}</span>
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      
    </section>
  );
}
