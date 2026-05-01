"use client";
import { useState } from "react";
import { getStrapiURL } from "../utils/api-helpers";

interface LeadFormProps {
  data: {
    id: string;
    title: string;
    description: string;
    location: string;
    submitButton: {
      text: string;
    };
  };
}

export default function LeadForm({ data }: LeadFormProps) {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = process.env.NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(getStrapiURL() + "/api/lead-form-submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: { email } }),
    });

    if (!res.ok) {
      setErrorMessage("Email failed to submit.");
      return;
    }
    setSuccessMessage("Email successfully submitted!");
    setEmail("");
  }

  return (
    <section className="section-padding bg-ami-navy text-white">
      <div className="container-ami">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{data.title}</h2>
            <p className="text-gray-400 leading-relaxed">{data.description}</p>
          </div>
          <div className="w-full lg:w-auto">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="px-4 py-2.5 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-gray-400 text-sm focus:outline-none focus:border-ami-teal-light min-w-[250px]"
              />
              <button type="submit" className="btn-primary bg-ami-red hover:bg-ami-red-dark whitespace-nowrap">
                {data.submitButton?.text || "Submit"}
              </button>
            </form>
            {successMessage && <p className="mt-2 text-sm text-green-400">{successMessage}</p>}
            {errorMessage && <p className="mt-2 text-sm text-red-400">{errorMessage}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
