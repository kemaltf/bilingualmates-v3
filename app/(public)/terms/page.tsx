import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
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
          Terms of Service
        </h1>

        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 mb-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-xl font-bold text-slate-800 mt-6 mb-3">
            1. Agreement to Terms
          </h2>
          <p className="text-slate-600 mb-4">
            By accessing or using BilingualMates, you agree to be bound by these
            Terms of Service and all applicable laws and regulations. If you do
            not agree with any of these terms, you are prohibited from using or
            accessing this site.
          </p>

          <h2 className="text-xl font-bold text-slate-800 mt-6 mb-3">
            2. Use License
          </h2>
          <p className="text-slate-600 mb-4">
            {`Permission is granted to temporarily download one copy of the materials (information or software) on BilingualMates' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:`}
          </p>
          <ul className="list-disc list-inside text-slate-600 mb-4 space-y-2">
            <li>modify or copy the materials;</li>
            <li>
              use the materials for any commercial purpose, or for any public
              display (commercial or non-commercial);
            </li>
            <li>{`attempt to decompile or reverse engineer any software contained on BilingualMates' website;`}</li>
            <li>
              remove any copyright or other proprietary notations from the
              materials; or
            </li>
            <li>{`transfer the materials to another person or "mirror" the materials on any other server.`}</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-800 mt-6 mb-3">
            3. Disclaimer
          </h2>
          <p className="text-slate-600 mb-4">
            {`The materials on BilingualMates' website are provided on an 'as is' basis. BilingualMates makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.`}
          </p>

          <h2 className="text-xl font-bold text-slate-800 mt-6 mb-3">
            4. Limitations
          </h2>
          <p className="text-slate-600 mb-4">
            {`In no event shall BilingualMates or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on BilingualMates' website.`}
          </p>

          <h2 className="text-xl font-bold text-slate-800 mt-6 mb-3">
            5. Governing Law
          </h2>
          <p className="text-slate-600 mb-4">
            These terms and conditions are governed by and construed in
            accordance with the laws of Indonesia and you irrevocably submit to
            the exclusive jurisdiction of the courts in that State or location.
          </p>
        </div>
      </div>
    </div>
  );
}
