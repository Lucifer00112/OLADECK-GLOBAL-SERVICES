"use client";

import { CalendarClock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  return (
    <Card className="shadow-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarClock className="h-5 w-5 text-gold" /> Request a callback
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input placeholder="Name" aria-label="Name" required />
            <Input placeholder="Phone" aria-label="Phone" required />
            <Input type="email" placeholder="Email" aria-label="Email" required />
            <Input type="datetime-local" aria-label="Preferred date and time" required />
          </div>
          <Textarea placeholder="Tell us about the vehicle and port." aria-label="Message" />
          <Button type="submit"><Send className="h-4 w-4" /> Send Request</Button>
        </form>
      </CardContent>
    </Card>
  );
}
