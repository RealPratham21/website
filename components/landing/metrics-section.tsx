"use client";

import { useEffect, useState, useRef } from "react";

function AnimatedCounter({ end, suffix = "", prefix = "", isPercentage = false, isLive = false }: { end: number; suffix?: string; prefix?: string; isPercentage?: boolean; isLive?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, hasAnimated]);

  // Subtle continuous animation for live dashboard effect
  useEffect(() => {
    if (!hasAnimated || !isLive) return;

    const liveInterval = setInterval(() => {
      if (isPercentage) {
        // Fluctuate percentage slightly
        setCount((prev) => {
          const variation = Math.random() * 0.4 - 0.2;
          const newVal = Math.max(end - 0.3, Math.min(end, prev + variation));
          return Math.floor(newVal * 10) / 10;
        });
      } else if (suffix === "M") {
        // Increment cost saved gradually
        setCount((prev) => Math.min(end, prev + Math.random() * 0.01));
      } else {
        // Increment occasionally
        if (Math.random() > 0.7) {
          setCount((prev) => Math.min(end, prev + Math.floor(Math.random() * 5)));
        }
      }
    }, 2000 + Math.random() * 3000);

    return () => clearInterval(liveInterval);
  }, [hasAnimated, isLive, end, isPercentage, suffix]);

  const displayValue = isPercentage ? count.toFixed(1) : isLive && suffix === "M" ? count.toFixed(1) : Math.floor(count);

  return (
    <div ref={ref} className="text-6xl lg:text-8xl font-display tracking-tight">
      {prefix}{typeof displayValue === 'string' ? displayValue : displayValue.toLocaleString()}{suffix}
    </div>
  );
}

const metrics = [
  { 
    value: 3.2, 
    suffix: "M", 
    prefix: "",
    label: "Payments Traced",
    isPercentage: false,
    isLive: true,
  },
  { 
    value: 96.8, 
    suffix: "%", 
    prefix: "",
    label: "Auto Reconciliation",
    isPercentage: true,
    isLive: true,
  },
  { 
    value: 18.4, 
    suffix: "M", 
    prefix: "₹",
    label: "Operational Cost Saved",
    isPercentage: false,
    isLive: true,
  },
  { 
    value: 4286, 
    suffix: "", 
    prefix: "",
    label: "Disputes Resolved",
    isPercentage: false,
    isLive: true,
  },
];

export function MetricsSection() {
  const [time, setTime] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="studio" ref={sectionRef} className="relative py-24 lg:py-32 border-y border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 lg:mb-24">
          <div>
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Enterprise Intelligence
            </span>
            <h2
              className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Operational Impact
              <br />
              You Can Measure.
            </h2>
          </div>
          <div className="flex items-center gap-4 font-mono text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Live Enterprise Metrics
            </span>
          </div>
        </div>
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/10">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`bg-background p-8 lg:p-12 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <AnimatedCounter 
                end={typeof metric.value === 'number' ? metric.value : 0} 
                suffix={metric.suffix} 
                prefix={metric.prefix}
                isPercentage={metric.isPercentage}
                isLive={metric.isLive}
              />
              <div className="mt-4 text-lg text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
