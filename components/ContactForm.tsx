
"use client"

import { useState } from "react";
import Link from "next/link";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    message: "",
  });

  const [charCount, setCharCount] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const maxChars = 350;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "message") setCharCount(value.length);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        fullName: formData.fullName, // changed from 'name'
        email: formData.email,
        company: formData.company,
        message: formData.message,
        }),
        });

      if (response.ok) {
        setStatus("success");
        setFormData({ fullName: "", email: "", company: "", message: "" });
        setCharCount(0);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-2xl px-4 py-8 sm:p-10 max-w-xl sm:max-w-2xl w-full mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-gray-800 text-base sm:text-lg mb-2">
            Full name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border text-black border-gray-200 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#6CB653]/80 focus:border-transparent"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-gray-800 text-base sm:text-lg mb-2">
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Johndoe@gmail.com"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border text-black border-gray-200 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#6CB653]/80 focus:border-transparent"
            required
          />
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-gray-800 text-base sm:text-lg mb-2">
            Company or organisation name
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#6CB653]/80 focus:border-transparent"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-gray-800 text-base sm:text-lg mb-2">
            How can we help you?
          </label>
          <div className="relative">
            <textarea
              id="message"
              name="message"
              rows={6}
              maxLength={maxChars}
              placeholder="Tell us how we can be of assistance"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border text-black border-gray-200 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#6CB653]/80 focus:border-transparent resize-none"
              required
            ></textarea>
            <div className="absolute bottom-3 right-3 text-gray-400 text-xs sm:text-sm">
              {charCount}/{maxChars}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={status === "submitting"}
            className={`w-full ${
              status === "submitting" ? "bg-gray-400 cursor-not-allowed" : "bg-[#6CB653] hover:bg-[#6CB653]/90"
            } text-white font-medium text-sm sm:text-base py-3 px-4 rounded-full transition-colors duration-300`}
          >
            {status === "submitting" ? "Sending..." : "Submit"}
          </button>
        </div>

        {/* Feedback Message */}
        {status === "success" && (
          <p className="text-center text-green-600 text-sm">Message sent successfully!</p>
        )}
        {status === "error" && (
          <p className="text-center text-red-500 text-sm">Something went wrong. Please try again.</p>
        )}

        {/* Disclaimer */}
        <p className="text-center text-xs sm:text-sm text-gray-500">
          By submitting this form you agree to Tetra Energy Sciences{" "}
          <Link href="/privacy-policy" className="text-green-600 hover:underline">
            Terms of service
          </Link>{" "}
          and acknowledge that you have read our{" "}
          <Link href="/privacy-policy" className="text-green-600 hover:underline">
            Privacy policy
          </Link>.
        </p>
      </form>
    </div>
  );
}