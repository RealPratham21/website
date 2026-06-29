"use client";

import { useEffect, useState, useRef } from "react";

const capabilities = [
  { title: "Payment Traceability", subtitle: "End-to-end proof" },
  { title: "Auto Reconciliation", subtitle: "Reduced manual effort" },
  { title: "Dispute Resolution", subtitle: "Instant payment history" },
  { title: "Compliance", subtitle: "Audit-ready evidence" },
  { title: "Treasury Operations", subtitle: "Cash visibility" },
  { title: "Payment Operations", subtitle: "Real-time observability" },
  { title: "Enterprise Finance", subtitle: "Operational intelligence" },
  { title: "Smart Data Lakes", subtitle: "Structured financial data" },
  { title: "AI Orchestration", subtitle: "Action-oriented workflows" },
  { title: "Banks & PSPs", subtitle: "Works with existing infrastructure" },
  { title: "ERP Systems", subtitle: "SAP • Oracle • Tally" },
  { title: "Audit Teams", subtitle: "Complete payment lineage" },
];

export function IntegrationsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    <section
      id="solutions"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden scroll-mt-24 bg-[linear-gradient(180deg,rgba(12,54,106,0.12)_0%,rgba(181,216,255,0.98)_36%,rgba(99,166,255,0.38)_72%,rgba(5,26,54,0.18)_100%)]"
    >
      <div className="absolute inset-0 fintech-grid opacity-35 pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 lg:mb-24 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Enterprise Capabilities
            <span className="w-8 h-px bg-foreground/30" />
          </span>
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-6">
            Built for
            <br />
            Modern Enterprise Finance.
          </h2>
          <p className="text-xl text-muted-foreground">
            Purpose-built for payment operations, finance teams, banks, PSPs and enterprise workflows where every payment must be traceable, auditable and operationally visible.
          </p>
        </div>

      </div>
      
      {/* Full-width marquees outside container */}
      <div className="w-full mb-6">
        <div className="flex gap-6 marquee">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-6 shrink-0">
              {capabilities.map((capability) => (
                <div
                  key={`${capability.title}-${setIndex}`}
                  className="shrink-0 fintech-card px-8 py-6 border hover:border-primary/50 hover:bg-white/95 transition-all duration-300 group"
                >
                  <div className="text-lg font-medium group-hover:translate-x-1 transition-transform">
                    {capability.title}
                  </div>
                  <div className="text-sm text-muted-foreground">{capability.subtitle}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {/* Reverse marquee */}
      <div className="w-full">
        <div className="flex gap-6 marquee-reverse">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-6 shrink-0">
              {[...capabilities].reverse().map((capability) => (
                <div
                  key={`${capability.title}-reverse-${setIndex}`}
                  className="shrink-0 fintech-card px-8 py-6 border hover:border-primary/50 hover:bg-white/95 transition-all duration-300 group"
                >
                  <div className="text-lg font-medium group-hover:translate-x-1 transition-transform">
                    {capability.title}
                  </div>
                  <div className="text-sm text-muted-foreground">{capability.subtitle}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
