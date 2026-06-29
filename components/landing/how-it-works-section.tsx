"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "I",
    title: "Connect Your Systems",
    description: "Connect banks, payment gateways, ERPs, ledgers, reconciliation engines and internal financial systems without changing your existing infrastructure.",
  },
  {
    number: "II",
    title: "Observe Every Event",
    description: "Zord continuously captures payment events, acknowledgements, routing decisions, settlements and reconciliation signals to build a complete payment timeline.",
  },
  {
    number: "III",
    title: "Generate Financial Proof",
    description: "Every transaction is transformed into a complete, explainable financial proof containing traceability, evidence and reconciliation intelligence for faster operations.",
  },
];

const timelineEvents = [
  { event: "Payment Initiated", detail: "Timestamp 14:03:21", icon: "↓" },
  { event: "Bank Acknowledged", detail: "Trace ID Linked", icon: "↓" },
  { event: "PSP Confirmed", detail: "Settlement Pending", icon: "↓" },
  { event: "Settlement Received", detail: "Ledger Updated", icon: "↓" },
  { event: "Reconciliation Complete", detail: "Status Verified", icon: "↓" },
  { event: "Financial Proof Generated", detail: "Ready", icon: "✓" },
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [timelineKey, setTimelineKey] = useState(0);
  const [animationProgress, setAnimationProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timelineInterval = setInterval(() => {
      setTimelineKey((prev) => prev + 1);
    }, timelineEvents.length * 1000 + 1000);
    return () => clearInterval(timelineInterval);
  }, []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setAnimationProgress((prev) => (prev + 1) % ((timelineEvents.length * 1000 + 1000) / 100));
    }, 100);
    return () => clearInterval(progressInterval);
  }, []);

  return (
    <section
      id="zord"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-foreground text-background overflow-hidden scroll-mt-24"
    >
      {/* Diagonal lines pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            currentColor 40px,
            currentColor 41px
          )`
        }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-background/50 mb-6">
            <span className="w-8 h-px bg-background/30" />
            How Zord Works
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Every Payment Tells a Story.
            <br />
            <span className="text-background/50">Zord Makes It Provable.</span>
          </h2>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Steps */}
          <div className="space-y-0">
            {steps.map((step, index) => (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStep(index)}
                className={`w-full text-left py-8 border-b border-background/10 transition-all duration-500 group ${
                  activeStep === index ? "opacity-100" : "opacity-40 hover:opacity-70"
                }`}
              >
                <div className="flex items-start gap-6">
                  <span className="font-display text-3xl text-background/30">{step.number}</span>
                  <div className="flex-1">
                    <h3 className="text-2xl lg:text-3xl font-display mb-3 group-hover:translate-x-2 transition-transform duration-300">
                      {step.title}
                    </h3>
                    <p className="text-background/60 leading-relaxed text-lg">
                      {step.description}
                    </p>
                    
                    {/* Progress indicator */}
                    {activeStep === index && (
                      <div className="mt-4 h-px bg-background/20 overflow-hidden">
                        <div 
                          className="h-full bg-background w-0"
                          style={{
                            animation: 'progress 5s linear forwards'
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Timeline display */}
          <div className="lg:sticky lg:top-32 self-start">
            <div className="border border-background/10 overflow-hidden">
              {/* Window header */}
              <div className="px-6 py-4 border-b border-background/10 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-background/20" />
                  <div className="w-3 h-3 rounded-full bg-background/20" />
                  <div className="w-3 h-3 rounded-full bg-background/20" />
                </div>
                <span className="text-xs font-mono text-background/40">payment_timeline.log</span>
              </div>

              {/* Timeline content */}
              <div className="p-8 font-mono text-sm min-h-[400px] space-y-6" key={timelineKey}>
                {timelineEvents.map((item, idx) => (
                  <div 
                    key={idx}
                    className="timeline-event-reveal space-y-2"
                    style={{ 
                      animationDelay: `${idx * 1000}ms`,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-background/40">{item.event}</span>
                      <span className="text-green-400">✓</span>
                    </div>
                    <div className="text-background/50 ml-0">
                      {item.detail}
                    </div>
                    {idx < timelineEvents.length - 1 && (
                      <div className="text-background/30 text-lg leading-none mt-3">
                        ↓
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Status */}
              <div className="px-6 py-4 border-t border-background/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-mono text-background/40">Live</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        
        .timeline-event-reveal {
          opacity: 0;
          transform: translateY(8px);
          animation: timelineReveal 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        
        @keyframes timelineReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
