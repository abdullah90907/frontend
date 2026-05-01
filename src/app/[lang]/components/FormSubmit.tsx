"use client";
import { useState } from "react";
import { getStrapiURL } from "../utils/api-helpers";

export default function FormSubmit({
  placeholder,
  text,
}: {
  placeholder: string;
  text: string;
}) {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = process.env.NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function handleSubmit() {
    if (email === "") {
      setErrorMessage("Email cannot be blank.");
      return;
    }

    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email format.");
      return;
    }

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
    setErrorMessage("");
    setSuccessMessage("Email successfully submitted!");
    setEmail("");
  }

  return (
    <div className="flex flex-row items-center self-center justify-center flex-shrink-0 lg:justify-end">
      <div className="flex flex-col">
        <div className="flex flex-row">
          {successMessage ? (
            <p className="text-green-700 bg-green-100 px-4 py-2.5 rounded-md text-sm border border-green-200">
              {successMessage}
            </p>
          ) : (
            <>
              <input
                type="email"
                placeholder={errorMessage || placeholder}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-3/5 px-4 py-2.5 rounded-l-md sm:w-2/3 text-ami-navy bg-white border border-ami-gray-200 text-sm focus:outline-none focus:border-ami-teal"
              />
              <button
                type="button"
                className="w-2/5 px-4 py-2.5 font-medium rounded-r-md sm:w-1/3 bg-ami-red text-white hover:bg-ami-red-dark transition-default text-sm"
                onClick={handleSubmit}
              >
                {text}
              </button>
            </>
          )}
        </div>

        {errorMessage && (
          <p className="text-red-600 bg-red-50 px-4 py-2 rounded-md my-2 text-sm border border-red-200">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}
