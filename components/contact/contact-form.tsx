"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

const referralOptions = [
  "Google Search",
  "LinkedIn",
  "Referral",
  "Investor or Partner",
  "Event or Showcase",
  "Other",
];

type Status = "idle" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || ""),
      referralSource: String(formData.get("referralSource") || ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Unable to submit the form.");
      }

      form.reset();
      setStatus("success");
    } catch (submitError) {
      setStatus("error");
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to submit the form."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative overflow-hidden border border-cyan-100/20 bg-[#071426]/95 p-6 text-white shadow-[0_34px_110px_rgba(3,15,36,0.34)] sm:p-8 lg:p-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,112,255,0.42),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(8,190,190,0.18),transparent_42%),linear-gradient(135deg,rgba(255,255,255,0.1),transparent_30%)]" />

      <div className="relative grid gap-8 md:grid-cols-2">
        <label className="grid gap-3">
          <span className="text-sm font-medium text-white/85">Name</span>
          <input
            name="name"
            required
            autoComplete="name"
            placeholder="Your full name"
            className="h-12 border-0 border-b border-white/20 bg-transparent px-0 text-base text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#5f8fff]"
          />
        </label>

        <label className="grid gap-3">
          <span className="text-sm font-medium text-white/85">Email</span>
          <input
            name="email"
            required
            type="email"
            autoComplete="email"
            placeholder="your.email@company.com"
            className="h-12 border-0 border-b border-white/20 bg-transparent px-0 text-base text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#5f8fff]"
          />
        </label>

        <label className="grid gap-3">
          <span className="text-sm font-medium text-white/85">Message</span>
          <textarea
            name="message"
            required
            rows={6}
            placeholder="Tell us about your data challenges, current pain points, and what you're hoping to achieve..."
            className="min-h-40 resize-none border-0 border-b border-white/20 bg-transparent px-0 py-3 text-base text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#5f8fff]"
          />
        </label>

        <label className="grid content-start gap-3">
          <span className="text-sm font-medium text-white/85">
            How did you hear about us?
          </span>
          <select
            name="referralSource"
            defaultValue=""
            className="h-14 border-0 border-b border-white/20 bg-[#0b1830] px-3 text-base text-white outline-none transition-colors focus:border-[#5f8fff]"
          >
            <option value="" disabled>
              Select an option
            </option>
            {referralOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="relative mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button
          type="submit"
          disabled={isSubmitting}
            className="h-14 rounded-full bg-[#2f5bff] px-8 text-base text-white shadow-[0_18px_48px_rgba(47,91,255,0.42)] hover:bg-[#244be0]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting
            </>
          ) : (
            <>
              Submit
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
        <button
          type="reset"
          className="text-sm font-medium text-white/70 underline underline-offset-4 transition-colors hover:text-white"
        >
          Clear form
        </button>
      </div>

      {status === "success" && (
        <div className="relative mt-6 flex items-center gap-3 border border-emerald-300/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
          <CheckCircle2 className="h-4 w-4" />
          Your message has been submitted successfully.
        </div>
      )}

      {status === "error" && (
        <div className="relative mt-6 border border-red-300/20 bg-red-400/10 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      )}
    </form>
  );
}
