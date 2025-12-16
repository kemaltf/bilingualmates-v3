import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="mb-6">
          <Link href="/">
            <Button
              variant="ghost"
              className="pl-0 gap-2 text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="size-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 mb-6">
          Privacy Policy
        </h1>

        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 mb-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-xl font-bold text-slate-800 mt-6 mb-3">
            1. Introduction
          </h2>
          <p className="text-slate-600 mb-4">
            Welcome to BilingualMates. We respect your privacy and are committed
            to protecting your personal data. This privacy policy will inform
            you as to how we look after your personal data when you visit our
            website and tell you about your privacy rights and how the law
            protects you.
          </p>

          <h2 className="text-xl font-bold text-slate-800 mt-6 mb-3">
            2. Information We Collect
          </h2>
          <p className="text-slate-600 mb-4">
            We may collect, use, store and transfer different kinds of personal
            data about you which we have grouped together follows:
          </p>
          <ul className="list-disc list-inside text-slate-600 mb-4 space-y-2">
            <li>
              <strong>Identity Data:</strong> includes username, first name,
              last name.
            </li>
            <li>
              <strong>Contact Data:</strong> includes email address.
            </li>
            <li>
              <strong>Technical Data:</strong> includes internet protocol (IP)
              address, your login data, browser type and version, time zone
              setting and location, browser plug-in types and versions,
              operating system and platform.
            </li>
            <li>
              <strong>Profile Data:</strong> includes your username and
              password, progress, and preferences.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-slate-800 mt-6 mb-3">
            3. How We Use Your Data
          </h2>
          <p className="text-slate-600 mb-4">
            We will only use your personal data when the law allows us to. Most
            commonly, we will use your personal data in the following
            circumstances:
          </p>
          <ul className="list-disc list-inside text-slate-600 mb-4 space-y-2">
            <li>To register you as a new customer.</li>
            <li>To provide and improve our services.</li>
            <li>To manage our relationship with you.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-800 mt-6 mb-3">
            4. Data Security
          </h2>
          <p className="text-slate-600 mb-4">
            We have put in place appropriate security measures to prevent your
            personal data from being accidentally lost, used or accessed in an
            unauthorized way, altered or disclosed.
          </p>

          <h2 className="text-xl font-bold text-slate-800 mt-6 mb-3">
            5. Contact Us
          </h2>
          <p className="text-slate-600 mb-4">
            If you have any questions about this privacy policy or our privacy
            practices, please contact us at: support@bilingualmates.com
          </p>
        </div>
      </div>
    </div>
  );
}
