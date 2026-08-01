"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { CheckCircle2, FileUp, Save, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { submitQuote, type QuoteActionState } from "@/app/quote/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { vehicleCatalog } from "@/lib/vehicle-catalog";

const fieldSchema = z.record(z.string().min(1));
const steps = ["Customer", "Vehicle", "Shipping", "Notes"] as const;

type QuoteFormValues = Record<string, string>;

const initialState: QuoteActionState = {
  ok: false,
  message: ""
};

export function QuoteForm() {
  const [step, setStep] = useState(0);
  const [state, formAction, pending] = useActionState(submitQuote, initialState);
  const { register, getValues, reset } = useForm<QuoteFormValues>();

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);

  useEffect(() => {
    const draft = localStorage.getItem("mg-enterprises-quote-draft");
    if (draft) reset(JSON.parse(draft));
  }, [reset]);

  useEffect(() => {
    if (state.ok) {
      localStorage.removeItem("mg-enterprises-quote-draft");
      if (state.quote) {
        const saved = localStorage.getItem("mg-enterprises-quotes");
        const existing = saved ? JSON.parse(saved) : [];
        localStorage.setItem(
          "mg-enterprises-quotes",
          JSON.stringify([state.quote, ...existing.filter((quote: { trackingNumber: string }) => quote.trackingNumber !== state.quote?.trackingNumber)])
        );
      }
    }
  }, [state.ok]);

  function saveDraft() {
    localStorage.setItem("mg-enterprises-quote-draft", JSON.stringify(getValues()));
  }

  function canAdvance() {
    const values = getValues();
    const requiredByStep = [
      ["name", "phone", "email"],
      ["carType", "modelYear", "countryPurchased", "vin", "condition", "engineSize", "fuelType", "transmission"],
      ["port", "billOfLading", "arrivalDate"],
      []
    ];
    return fieldSchema.safeParse(
      Object.fromEntries(requiredByStep[step].map((field) => [field, values[field] ?? ""]))
    ).success;
  }

  if (state.ok) {
    return (
      <Card className="mx-auto max-w-3xl shadow-glow">
        <CardContent className="grid place-items-center gap-5 p-10 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-gold/15 text-gold">
            <CheckCircle2 className="h-9 w-9" />
          </span>
          <div>
            <h1 className="text-3xl font-semibold tracking-normal">Quote request received</h1>
            <p className="mt-3 text-muted-foreground">{state.message}</p>
          </div>
          <div className="rounded-lg border bg-muted p-5">
            <p className="text-sm text-muted-foreground">Tracking number</p>
            <p className="mt-1 text-2xl font-semibold text-navy dark:text-white">{state.trackingNumber}</p>
          </div>
          <Button asChild>
            <a href={state.whatsappLink} target="_blank" rel="noreferrer">Send Details to WhatsApp</a>
          </Button>
          <Button asChild variant="outline">
            <a href={`/track?tracking=${state.trackingNumber}`}>Track Progress</a>
          </Button>
          <p className="max-w-xl text-sm text-muted-foreground">
            WhatsApp cannot receive uploaded files automatically from the browser. After the chat opens, attach your invoice, bill of lading, and vehicle documents there.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-5xl shadow-glow">
      <CardContent className="p-0">
        <div className="border-b p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-gold">Step {step + 1} of {steps.length}</p>
              <h1 className="mt-1 text-2xl font-semibold tracking-normal">{steps[step]} Information</h1>
            </div>
            <Button type="button" variant="outline" onClick={saveDraft}>
              <Save className="h-4 w-4" /> Save Draft
            </Button>
          </div>
          <Progress value={progress} className="mt-5" />
        </div>

        <form action={formAction} className="grid gap-6 p-6">
          <div className={step === 0 ? "grid gap-4 md:grid-cols-2" : "hidden"}>
            <Field label="Name" required><Input {...register("name")} name="name" required /></Field>
            <Field label="Phone" required><Input {...register("phone")} name="phone" required /></Field>
            <Field label="Email" required><Input {...register("email")} name="email" type="email" required /></Field>
            <Field label="Company"><Input {...register("company")} name="company" /></Field>
          </div>

          <div className={step === 1 ? "grid gap-4 md:grid-cols-3" : "hidden"}>
            <Field label="Search car type" required>
              <Input
                {...register("carType")}
                name="carType"
                list="common-nigeria-cars"
                placeholder="Toyota Corolla, Honda Accord, Toyota Sienna..."
                required
              />
              <span className="text-xs text-muted-foreground">
                Search the common Nigerian car list or type another car manually.
              </span>
            </Field>
            <datalist id="common-nigeria-cars">
              {vehicleCatalog.slice(0, 500).map((car) => (
                <option
                  key={car.id}
                  value={`${car.brand} ${car.model}`}
                  label={`${car.generation}, ${car.yearFrom}-${car.yearTo}, ${car.bodyType}, ${car.fuel}, ${car.origin}`}
                />
              ))}
            </datalist>
            <Field label="Model Year" required><Input {...register("modelYear")} name="modelYear" inputMode="numeric" placeholder="2012" required /></Field>
            <Field label="Country Purchased" required><Input {...register("countryPurchased")} name="countryPurchased" required /></Field>
            <Field label="VIN / Chassis Number" required><Input {...register("vin")} name="vin" required /></Field>
            <Field label="Vehicle Condition" required><Input {...register("condition")} name="condition" placeholder="Used, new, salvage..." required /></Field>
            <Field label="Engine Size" required><Input {...register("engineSize")} name="engineSize" placeholder="2.5L" required /></Field>
            <Field label="Fuel Type" required><Input {...register("fuelType")} name="fuelType" placeholder="Petrol, diesel, hybrid..." required /></Field>
            <Field label="Transmission" required><Input {...register("transmission")} name="transmission" required /></Field>
          </div>

          <div className={step === 2 ? "grid gap-4 md:grid-cols-2" : "hidden"}>
            <Field label="Port of Arrival" required><Input {...register("port")} name="port" required /></Field>
            <Field label="Shipping Line"><Input {...register("shippingLine")} name="shippingLine" /></Field>
            <Field label="Container Number"><Input {...register("containerNumber")} name="containerNumber" /></Field>
            <Field label="Bill of Lading Number" required><Input {...register("billOfLading")} name="billOfLading" required /></Field>
            <Field label="Arrival Date" required><Input {...register("arrivalDate")} name="arrivalDate" type="date" required /></Field>
          </div>

          <div className={step === 3 ? "grid gap-4" : "hidden"}>
            <Field label="Additional Notes"><Textarea {...register("notes")} name="notes" placeholder="Any special instructions or information about your vehicle shipment..." /></Field>
            <label className="grid gap-2 rounded-lg border border-dashed p-6 text-center text-sm font-medium hover:bg-muted/30 transition cursor-pointer">
              <FileUp className="mx-auto h-6 w-6 text-gold" />
              Upload vehicle documents, B/L, or invoice
              <Input name="documents" type="file" multiple className="mx-auto max-w-md cursor-pointer" />
            </label>

            {/* Mandatory Legal & Data Consent Checkboxes */}
            <div className="rounded-xl bg-muted/40 p-4 border border-border space-y-3 text-xs text-navy mt-2">
              <p className="font-bold text-xs uppercase tracking-wider text-gold">Service Terms & Legal Consent</p>
              
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" required defaultChecked className="mt-0.5 h-4 w-4 rounded border-gray-300 text-navy focus:ring-navy shrink-0" />
                <span className="leading-snug">
                  I agree to OLADECK Global Services&apos; <a href="/terms" target="_blank" className="font-semibold underline text-gold">Terms of Service</a> and confirm all submitted vehicle details and VIN information are accurate.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" required defaultChecked className="mt-0.5 h-4 w-4 rounded border-gray-300 text-navy focus:ring-navy shrink-0" />
                <span className="leading-snug">
                  I consent to the processing of my documentation in accordance with the <a href="/privacy" target="_blank" className="font-semibold underline text-navy">Privacy Policy</a> for customs declaration and clearing purposes.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" required defaultChecked className="mt-0.5 h-4 w-4 rounded border-gray-300 text-navy focus:ring-navy shrink-0" />
                <span className="leading-snug font-medium text-foreground">
                  I permit OLADECK Global Services to contact me via <strong>WhatsApp, Email, and Phone</strong> for real-time duty updates and clearing invoices.
                </span>
              </label>
            </div>
          </div>

          {state.message && !state.ok ? (
            <p className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {state.message}
            </p>
          ) : null}

          <div className="flex justify-between gap-3 border-t pt-6">
            <Button type="button" variant="outline" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))}>
              Back
            </Button>
            {step < steps.length - 1 ? (
              <Button
                type="button"
                onClick={() => {
                  if (canAdvance()) setStep((current) => current + 1);
                }}
              >
                Continue
              </Button>
            ) : (
              <Button type="submit" disabled={pending}>
                <Send className="h-4 w-4" /> {pending ? "Submitting..." : "Submit Quote"}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function Field({
  label,
  required,
  children
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      <span>{label}{required ? <span className="text-destructive"> *</span> : null}</span>
      {children}
    </label>
  );
}
