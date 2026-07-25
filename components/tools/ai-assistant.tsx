"use client";

import { useState } from "react";
import Link from "next/link";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { whatsappUrl } from "@/lib/utils";

const answers = [
  {
    keyword: "document",
    answer: "Most vehicle imports need a bill of lading, purchase invoice, export title, ID, and any terminal payment receipts."
  },
  {
    keyword: "duty",
    answer: "Duty depends on vehicle type, age, engine size, value, and current customs assessment rules. Use the duty estimator for a planning range."
  },
  {
    keyword: "track",
    answer: "Use your CLR tracking number on the tracking page to see progress, timeline, documents, and estimated completion."
  },
  {
    keyword: "time",
    answer: "Many compliant clearances finish within 3 to 7 working days after documents and duty are complete."
  }
];

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    "Hi, I can help with vehicle clearing questions and point you to the right next step."
  ]);
  const [value, setValue] = useState("");

  function ask() {
    if (!value.trim()) return;
    const match = answers.find((item) => value.toLowerCase().includes(item.keyword));
    setMessages((current) => [
      ...current,
      value,
      match?.answer ?? "For that case, request a quote so our operations team can review your vehicle and documents."
    ]);
    setValue("");
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open ? (
        <>
          {/* Mobile backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs sm:hidden"
            onClick={() => setOpen(false)}
          />

          <section className="relative w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-xl border bg-card shadow-glow sm:w-[360px]">
            <div className="flex items-center justify-between bg-navy px-4 py-3 text-white">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Bot className="h-4 w-4 text-gold" /> Clearing Assistant
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="text-white/80 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="max-h-64 sm:max-h-72 space-y-3 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <p
                  key={`${message}-${index}`}
                  className={`rounded-lg px-3 py-2 text-sm leading-snug ${
                    index % 2 ? "ml-6 bg-muted" : "mr-6 bg-gold/15 text-foreground font-medium"
                  }`}
                >
                  {message}
                </p>
              ))}
            </div>

            <div className="grid gap-2 border-t p-3 bg-card">
              <div className="flex gap-2">
                <Input
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  onKeyDown={(event) => event.key === "Enter" && ask()}
                  placeholder="Ask about duty, documents..."
                  aria-label="Ask the assistant"
                  className="text-sm"
                />
                <Button size="icon" onClick={ask} aria-label="Send question">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Button asChild variant="outline" size="sm">
                  <Link href="/quote">Request Quote</Link>
                </Button>
                <Button asChild variant="secondary" size="sm">
                  <a href={whatsappUrl("Hello MG Enterprises, I need assistance with vehicle clearing.")}>
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </>
      ) : null}

      <Button
        className="h-12 w-12 rounded-full shadow-lg transition hover:scale-105"
        onClick={() => setOpen((current) => !current)}
        aria-label="Open clearing assistant"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </Button>
    </div>
  );
}
