"use client";

import { useEffect, useState, useRef } from "react";

const integrations = [
  { name: "SBI Bank", status: "Connected" },
  { name: "HDFC Bank", status: "Connected" },
  { name: "ICICI Bank", status: "Connected" },
  { name: "Razorpay", status: "Connected" },
  { name: "SAP ERP", status: "Connected" },
  { name: "Oracle Financials", status: "Connected" },
  { name: "Internal Ledger", status: "Connected" },
  { name: "Reconciliation Engine", status: "Connected" },
];

export function InfrastructureSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIntegration, setActiveIntegration] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIntegration((prev) => (prev + 1) % integrations.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Enterprise Integration
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              Connect.
              <br />
              Observe.
              <br />
              Prove.
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              Zord integrates with the financial systems you already operate, continuously observing every payment event to generate complete financial proof without changing existing workflows.
            </p>

            {/* Enterprise Capabilities */}
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-sm font-mono text-foreground mb-2">Non-Custodial</div>
                <div className="text-xs text-muted-foreground">Architecture</div>
              </div>
              <div>
                <div className="text-sm font-mono text-foreground mb-2">Real-Time</div>
                <div className="text-xs text-muted-foreground">Visibility</div>
              </div>
              <div>
                <div className="text-sm font-mono text-foreground mb-2">Financial</div>
                <div className="text-xs text-muted-foreground">Proof</div>
              </div>
            </div>
          </div>

          {/* Right: Location list */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="border border-foreground/10">
              {/* Header */}
              <div className="px-6 py-4 border-b border-foreground/10 flex items-center justify-between">
                <span className="text-sm font-mono text-muted-foreground">Enterprise Connections</span>
                <span className="flex items-center gap-2 text-xs font-mono text-green-600">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  All Connected
                </span>
              </div>

              {/* Integrations */}
              <div>
                {integrations.map((integration, index) => (
                  <div
                    key={integration.name}
                    className={`px-6 py-5 border-b border-foreground/5 last:border-b-0 flex items-center justify-between transition-all duration-300 ${
                      activeIntegration === index ? "bg-foreground/[0.02]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span 
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          activeIntegration === index ? "bg-green-500" : "bg-green-500/30"
                        }`}
                      />
                      <div className="font-medium text-sm">{integration.name}</div>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">{integration.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
