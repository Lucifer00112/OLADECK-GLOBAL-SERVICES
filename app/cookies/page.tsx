import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy — OLADECK Global Services",
  description: "Learn how OLADECK Global Services uses cookies and local storage to enhance user experience and secure sessions."
};

export default function CookiesPage() {
  return (
    <section className="py-16 md:py-24 bg-muted/20">
      <div className="container-pad max-w-4xl bg-white rounded-2xl p-8 sm:p-12 shadow-card border border-border space-y-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gold mb-1">Legal & Privacy</p>
          <h1 className="text-3xl font-extrabold text-navy sm:text-4xl">Cookie &amp; Local Storage Policy</h1>
          <p className="mt-2 text-xs text-muted-foreground">Effective Date: January 1, 2026 · OLADECK Global Services Limited</p>
        </div>

        <div className="space-y-4 text-sm text-foreground leading-relaxed divide-y divide-border/60">
          <div className="pt-4 space-y-2">
            <h2 className="text-base font-bold text-navy">1. Introduction</h2>
            <p className="text-muted-foreground">
              This Cookie Policy explains how OLADECK Global Services Limited (&quot;OLADECK&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) uses cookies, local browser storage, and similar technologies when you visit our website, submit vehicle clearing quotes, or access the Customer Portal.
            </p>
          </div>

          <div className="pt-4 space-y-2">
            <h2 className="text-base font-bold text-navy">2. What Are Cookies and Local Storage?</h2>
            <p className="text-muted-foreground">
              Cookies are small text files stored on your browser or mobile device by a web server. Local storage allows us to store essential session preferences and temporary quote history directly in your browser for offline accessibility and speed.
            </p>
          </div>

          <div className="pt-4 space-y-2">
            <h2 className="text-base font-bold text-navy">3. How We Use Cookies</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li><strong>Essential Cookies:</strong> Required for secure customer authentication, admin portal access, and session management.</li>
              <li><strong>Functional Cookies:</strong> Remembers your vehicle quote estimates and tracking numbers so you can return anytime to check clearing status.</li>
              <li><strong>Consent Cookies:</strong> Stores your acceptance of our Terms of Service and Privacy Policy.</li>
            </ul>
          </div>

          <div className="pt-4 space-y-2">
            <h2 className="text-base font-bold text-navy">4. Managing Your Preferences</h2>
            <p className="text-muted-foreground">
              You can control or clear cookies through your browser settings at any time. Note that disabling essential cookies may impact your ability to log into the Customer Portal or save quote drafts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
