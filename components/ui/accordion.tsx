"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion({
  items
}: {
  items: { question: string; answer: string }[];
}) {
  const [open, setOpen] = useState(0);

  return (
    <div className="divide-y rounded-lg border bg-card">
      {items.map((item, index) => (
        <div key={item.question}>
          <button
            className="focus-ring flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold"
            onClick={() => setOpen(open === index ? -1 : index)}
            aria-expanded={open === index}
          >
            <span>{item.question}</span>
            <ChevronDown
              className={cn(
                "h-5 w-5 shrink-0 transition",
                open === index && "rotate-180"
              )}
            />
          </button>
          {open === index ? (
            <div className="px-5 pb-5 text-sm leading-7 text-muted-foreground">
              {item.answer}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
