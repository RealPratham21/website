import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";
import { FooterSection } from "@/components/landing/footer-section";
import { Navigation } from "@/components/landing/navigation";

export const metadata: Metadata = {
  title: "Contact Arealis",
  description:
    "Reach out to Arealis for enterprise AI infrastructure, financial proof, and operational intelligence conversations.",
};

const contactCards = [
  {
    title: "Customer Support",
    icon: Phone,
    details: ["+91 7276105075", "Support@arealis.io"],
  },
  {
    title: "Nodal Officer",
    icon: Mail,
    details: ["Prathamesh Bhamare", "+91 7276105075", "Support@arealis.io"],
  },
  {
    title: "Registered Office",
    icon: MapPin,
    details: [
      "Arealis Technologies Ltd.",
      "Adarsh Colony, Sayyad, Ngr",
      "SNo74 Lane28 Hadapsar,",
      "Hadapsar, Pune City,",
      "Pune- 411028, Maharashtra,",
      "India",
    ],
  },
];

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground noise-overlay">
      <Navigation />

      <section className="relative overflow-hidden pt-32 lg:pt-40">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(204,228,255,1)_0%,rgba(237,247,255,0.96)_42%,rgba(118,179,255,0.72)_100%)]" />
        <div className="absolute inset-0 fintech-grid opacity-45" />
        <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_22%_0%,rgba(47,91,255,0.28),transparent_46%),radial-gradient(circle_at_82%_12%,rgba(8,190,190,0.22),transparent_38%)]" />
        <div className="absolute inset-x-0 top-28 h-56 bg-[radial-gradient(circle,rgba(14,165,233,0.18)_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-6 pb-24 lg:px-12 lg:pb-32">
          <div className="mx-auto max-w-4xl text-center">
            <span className="mb-6 inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
              <span className="h-px w-8 bg-primary/30" />
              Contact
              <span className="h-px w-8 bg-primary/30" />
            </span>
            <h1 className="font-display text-5xl tracking-tight text-foreground md:text-7xl lg:text-8xl">
              Let's clear the noise.
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-xl leading-relaxed text-muted-foreground">
              Tell us what you're working on, and where your data is holding
              you back. We'll help you turn the mess into momentum.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-6xl lg:mt-20">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-primary/20 bg-[linear-gradient(180deg,rgba(7,20,38,0.98)_0%,rgba(8,32,63,0.96)_48%,rgba(18,80,148,0.9)_100%)] py-24 text-white lg:py-32">
        <div className="absolute inset-0 fintech-grid opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(47,91,255,0.34),transparent_36%),radial-gradient(circle_at_82%_100%,rgba(14,165,233,0.2),transparent_34%)]" />
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <h2 className="font-display text-4xl tracking-tight md:text-6xl">
              Contact
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-cyan-100/66">
              Reach out, Connect, and Start your Path to home
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {contactCards.map((card) => (
              <article
                key={card.title}
                className="group min-h-64 border border-cyan-100/20 bg-white/[0.08] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-cyan-100/45 hover:bg-white/[0.12]"
              >
                <div className="mb-8 flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-200/14 text-cyan-100 transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <card.icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-2xl font-semibold tracking-tight text-cyan-100">
                    {card.title}
                  </h3>
                </div>
                <div className="space-y-3 text-base font-medium leading-relaxed text-white/74">
                  {card.details.map((detail) => (
                    <p key={detail}>{detail}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
