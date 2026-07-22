"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, ClipboardCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const baseDocs = ["Bill of Lading", "Purchase Invoice", "Export Title", "Valid ID", "Vehicle photos"];

export function DocumentChecklist() {
  const [scenario, setScenario] = useState("first-time");
  const docs = useMemo(() => {
    if (scenario === "auction") return [...baseDocs, "Auction invoice", "Release authorization"];
    if (scenario === "corporate") return [...baseDocs, "CAC documents", "Tax ID", "Company authorization letter"];
    if (scenario === "fleet") return [...baseDocs, "Fleet manifest", "Batch shipping list", "Delivery schedule"];
    return [...baseDocs, "Importer contact details", "Preferred delivery address"];
  }, [scenario]);

  return (
    <Card className="shadow-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5 text-gold" /> Document Checklist Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <select
          value={scenario}
          onChange={(event) => setScenario(event.target.value)}
          className="focus-ring h-11 rounded-lg border bg-background px-3 text-sm"
          aria-label="Import scenario"
        >
          <option value="first-time">First-time importer</option>
          <option value="auction">Auction vehicle</option>
          <option value="corporate">Corporate import</option>
          <option value="fleet">Fleet clearance</option>
        </select>
        <div className="grid gap-2">
          {docs.map((doc) => (
            <div key={doc} className="flex items-center gap-2 rounded-lg border bg-background p-3 text-sm">
              <CheckCircle2 className="h-4 w-4 text-gold" /> {doc}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
