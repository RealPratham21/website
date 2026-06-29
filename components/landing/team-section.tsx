"use client";

import Image from "next/image";

const teamMembers = [
  {
    name: "Abhishek",
    role: "CEO & Founder",
    bio: "Founder-operator driving vision, execution, and client success from strategy to delivery.",
    image: "/abhishek shirsath.png.png",
  },
  {
    name: "Prathamesh Bhamare",
    role: "Machine Learning Engineer",
    bio: "Builds production-ready ML systems with a strong focus on real-world impact and performance.",
    image: "/prathamesh bhamare.png.png",
  },
  {
    name: "Sahil Kirad",
    role: "Full-Stack & Backend Developer",
    bio: "Delivers scalable backend systems and clean full-stack applications built to last.",
    image: "/sahil kirad.png.png",
  },
  {
    name: "Yashwanth Reddy",
    role: "Cloud & DevOps Engineer",
    bio: "Designs reliable cloud infrastructure and automates deployments for scale and stability.",
    image: "/yashwanth arumulla.png",
  },
  {
    name: "Swaroop Thakare",
    role: "AI & Development Engineer",
    bio: "Works at the intersection of AI and software engineering to build intelligent systems end-to-end.",
    image: "/swaroop thakare.png.png",
  },
  {
    name: "Yash Sarode",
    role: "Backend Engineer (Go & Systems)",
    bio: "Focused on high-performance backend services and systems-level engineering.",
    image: "/yash sarode.png.png",
  },
  {
    name: "Sudarshan Moger",
    role: "Backend & Data Infrastructure Engineer",
    bio: "Specialist in Kafka, databases, and data-heavy backend systems at scale.",
    image: "/sudarshan moger.png.png",
  },
  {
    name: "Yash Yavatkar",
    role: "Backend Engineer (Go & Distributed Systems)",
    bio: "Builds efficient backend services with an emphasis on scalability and reliability.",
    image: "/yash yavatkar.png.png",
  },
  {
    name: "Akshay Kale",
    role: "Backend Engineer (Java)",
    bio: "Experienced in building robust, enterprise-grade backend services using Java ecosystems.",
    image: "/akshay kale.png.png",
  },
];

export function TeamSection() {
  return (
    <section className="relative py-28 lg:py-36 border-t border-primary/10 bg-[linear-gradient(180deg,rgba(241,248,255,0.9)_0%,rgba(255,255,255,0.96)_100%)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-14 lg:mb-16">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Meet The Team
          </span>
          <div className="flex-1 h-px bg-foreground/10" />
        </div>

        <div className="max-w-3xl">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.02] text-foreground">
            The people building the systems behind Arealis.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            A tight engineering team across product, AI, backend, and infrastructure working together to ship reliable enterprise systems.
          </p>
        </div>
      </div>

      <div className="team-carousel">
        <div className="team-carousel-track">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="team-carousel-group">
              {teamMembers.map((member) => (
                <article
                  key={`${setIndex}-${member.name}`}
                  className={`team-card ${((setIndex * teamMembers.length) + teamMembers.indexOf(member)) % 2 === 0 ? "team-card-down" : "team-card-up"}`}
                >
                  <div className="team-card-inner">
                    <div className="team-card-face team-card-front">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="(min-width: 1024px) 18rem, 70vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                        <p className="font-display text-2xl leading-none">{member.name}</p>
                        <p className="mt-2 text-sm text-white/80">{member.role}</p>
                      </div>
                    </div>

                    <div className="team-card-face team-card-back">
                      <div className="h-full flex flex-col justify-between p-6 bg-white">
                        <div>
                          <span className="font-mono text-[11px] tracking-[0.24em] text-muted-foreground uppercase">
                            Team
                          </span>
                          <p className="mt-4 font-display text-3xl leading-none text-foreground">
                            {member.name}
                          </p>
                          <p className="mt-3 text-sm text-foreground/70">
                            {member.role}
                          </p>
                        </div>

                        <p className="text-base leading-relaxed text-muted-foreground">
                          {member.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
