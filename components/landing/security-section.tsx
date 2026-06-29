"use client";

import { useEffect, useState, useRef } from "react";
import { Shield, Lock, Eye, FileCheck } from "lucide-react";

const complianceFeatures = [
  {
    icon: Shield,
    title: "Privacy by Design",
    description: "Designed with data governance principles aligned with India's Digital Personal Data Protection Act (DPDP) and enterprise privacy requirements.",
  },
  {
    icon: FileCheck,
    title: "Operational Auditability",
    description: "Every payment event is preserved as an immutable operational history, enabling complete payment lineage, investigations and audit readiness.",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "AES-256 encryption at rest, TLS 1.3 encryption in transit, role-based access controls and secure operational governance built into the platform architecture.",
  },
  {
    icon: Eye,
    title: "Regulatory-Ready Infrastructure",
    description: "Designed to integrate into enterprise environments operating under RBI guidance, ISO/IEC 27001 governance practices and modern financial compliance programs.",
  },
];

const complianceBadges = ["DPDP Ready", "ISO 27001 Aligned", "ISO 20022 Ready", "RBI-Aware", "Audit Ready", "Non-Custodial"];

export function SecuritySection() {
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
    <section id="compliance" ref={sectionRef} className="relative py-24 lg:py-32 bg-[linear-gradient(180deg,rgba(239,247,255,0.82)_0%,rgba(255,255,255,0.96)_100%)] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Enterprise Compliance
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              Compliance
              <br />
              Without
              <br />
              Compromise.
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              Built for organizations operating in regulated environments where privacy, governance, auditability and operational accountability are business requirements—not optional features.
            </p>

            {/* Compliance Badges */}
            <div className="flex flex-wrap gap-3">
              {complianceBadges.map((badge, index) => (
                <span
                  key={badge}
                  className={`px-4 py-2 border border-primary/10 bg-white/65 text-sm font-mono shadow-[0_10px_30px_rgba(15,71,150,0.05)] transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 50 + 200}ms` }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Features */}
          <div className="grid gap-6">
            {complianceFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className={`p-6 border border-primary/10 bg-white/72 shadow-[0_16px_52px_rgba(15,71,150,0.07)] hover:border-primary/25 transition-all duration-500 group ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 flex items-center justify-center border border-primary/15 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1 group-hover:translate-x-1 transition-transform duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Disclaimer */}
            <p className="text-sm text-muted-foreground mt-4">
              Designed to support enterprise governance, audit and regulatory workflows. Specific compliance obligations remain the responsibility of the deploying organization.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
