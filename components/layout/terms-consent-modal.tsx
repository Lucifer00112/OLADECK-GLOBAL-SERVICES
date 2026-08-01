"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, FileText, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TermsConsentModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const agreed = localStorage.getItem("oladeck_terms_consent_agreed");
    if (!agreed) {
      const timer = setTimeout(() => setOpen(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem("oladeck_terms_consent_agreed", "true");
    localStorage.setItem("oladeck_terms_consent_date", new Date().toISOString());
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white text-navy shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-navy text-white px-6 py-5 flex items-center justify-between border-b border-navy/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold tracking-tight text-white">Terms of Service & Data Consent</h2>
              <p className="text-xs text-white/70">OLADECK Global Services Limited · Official User Agreement</p>
            </div>
          </div>
        </div>

        {/* Scrollable Policy Text */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-muted-foreground leading-relaxed">
          <div className="rounded-xl bg-muted/40 p-4 border border-border text-navy space-y-2">
            <p className="font-bold text-sm flex items-center gap-2">
              <FileText className="h-4 w-4 text-gold shrink-0" /> Important Terms for Importers & Clients
            </p>
            <p>
              Welcome to OLADECK Global Services Limited. Before accessing our vehicle clearing estimates, requesting quotes, or submitting customs documentation, please read and confirm your agreement to our operational terms and data policy.
            </p>
          </div>

          <div className="space-y-3 text-foreground">
            <h3 className="font-bold text-navy text-xs uppercase tracking-wider">1. Customs Entry & Tariff Estimates</h3>
            <p>
              All customs duty calculations, terminal fees, and clearing estimates provided by OLADECK Global Services are based on official Nigeria Customs Service (NCS) valuation schedules, VIN assessments, and current port tariffs. Final payable duties remain subject to physical terminal inspection and customs officer appraisal at Apapa Port, Tin Can Island, PTML, or Onne Port.
            </p>

            <h3 className="font-bold text-navy text-xs uppercase tracking-wider">2. Document Handling & Data Privacy</h3>
            <p>
              By uploading or submitting vehicle documentation (Bill of Lading, Purchase Invoices, Export Titles, Passport/ID, or VIN records), you authorize OLADECK Global Services to process these credentials solely for customs declaration, PAAR generation, SON/NAFDAC compliance, and terminal clearance. Your personal data is encrypted and protected in accordance with Nigeria Data Protection Regulation (NDPR).
            </p>

            <h3 className="font-bold text-navy text-xs uppercase tracking-wider">3. Communication & WhatsApp Authorization</h3>
            <p>
              By checking our consent checkboxes, you explicitly permit our licensed clearing desk to communicate via WhatsApp, phone calls, SMS, and email regarding real-time clearing status, duty assessment memos, and delivery schedules.
            </p>

            <h3 className="font-bold text-navy text-xs uppercase tracking-wider">4. Terminal Storage & Demurrage Liability</h3>
            <p>
              OLADECK Global Services acts as your authorized customs clearing agent. Clients must provide accurate VIN documentation promptly to prevent unnecessary terminal storage or shipping line demurrage fees.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-4 text-[11px] font-medium text-navy border-t border-border">
            <Link href="/terms" className="hover:underline flex items-center gap-1 text-gold font-semibold">
              <FileText className="h-3 w-3" /> Full Terms of Service
            </Link>
            <Link href="/privacy" className="hover:underline flex items-center gap-1 text-navy font-semibold">
              <Lock className="h-3 w-3" /> Privacy Policy
            </Link>
            <Link href="/cookies" className="hover:underline text-muted-foreground">
              Cookie Policy
            </Link>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-muted/30 px-6 py-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <p className="text-[11px] text-muted-foreground text-center sm:text-left">
            By clicking <strong className="text-navy">I Agree & Accept Terms</strong>, you confirm you are 18+ and consent to our policies.
          </p>
          <Button
            onClick={handleAccept}
            className="w-full sm:w-auto rounded-full bg-navy px-8 py-2.5 text-xs font-bold text-white hover:bg-navy/90 shadow-md shrink-0"
          >
            <CheckCircle2 className="h-4 w-4 mr-1.5 text-gold" /> I Agree & Accept Terms
          </Button>
        </div>
      </div>
    </div>
  );
}
