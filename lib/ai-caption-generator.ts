/**
 * OLADECK Auto-Writer AI
 * Mini AI Engine specialized in generating professional, high-converting Truth Social-style 
 * social captions and formal port clearance documentation for vehicle clearing & forwarding.
 */

export type AiGeneratorInput = {
  vehicleName: string;
  year: number;
  port: string;
  clearingTime: string;
  category: string;
  specialNotes?: string;
  tone?: "Hype & Social" | "Executive & Official" | "Detailed Technical";
};

export type AiGeneratorOutput = {
  caption: string;
  documentation: string;
};

const portHighlights: Record<string, string> = {
  "Apapa Port, Lagos": "Smooth clearance through Apapa Ocean Terminal with instant Single Window duty clearance.",
  "Tin Can Island Port, Lagos": "Fast-tracked release via Tin Can Island customs hub with zero demurrage charges.",
  "PTML Terminal, Lagos": "Direct RORO berth clearance at PTML Terminal in record time.",
  "Onne Port, Port Harcourt": "Eastern zone customs clearance completed efficiently at Onne Port Terminal."
};

const socialHashtags = "#OLADECKGlobal #VehicleClearing #CustomsDuty #NigeriaLogistics #ApapaPort #TinCanPort #PortClearance #CarImporter #CustomsAgent #LagosCars";

export function generateClearanceContent(input: AiGeneratorInput): AiGeneratorOutput {
  const { vehicleName, year, port, clearingTime, category, specialNotes, tone = "Hype & Social" } = input;

  const titleVehicle = `${year} ${vehicleName}`;
  const portInfo = portHighlights[port] || `Successfully processed and cleared at ${port}.`;
  const duration = clearingTime || "4 Working Days";

  // 1. Social Caption Generation (Truth Social style)
  let caption = "";
  if (tone === "Hype & Social") {
    caption = `🚗 DOCK RELEASE CONFIRMED: ${titleVehicle} Successfully Cleared! ⚓\n\n` +
      `Another happy client drive-out! We just completed full customs duty assessment and port clearance for this pristine ${titleVehicle} at ${port} in just ${duration}. ⏱️✨\n\n` +
      `📌 Key Highlights:\n` +
      `• ${portInfo}\n` +
      `• 100% Genuine Customs Duty Paid with authentic C-Number.\n` +
      `• Safe, zero-scratch terminal handling & direct client handover.\n` +
      (specialNotes ? `• Note: ${specialNotes}\n` : "") +
      `\n` +
      `Are you importing a car soon? Don't let demurrage accumulate at the ports! Trust OLADECK Global Services for fast, transparent, and hassle-free vehicle clearance.\n\n` +
      `📲 Send us a message on WhatsApp or click our bio link for an instant quote!\n\n` +
      `${socialHashtags}`;
  } else if (tone === "Executive & Official") {
    caption = `OFFICIAL PORT RELEASE ANNOUNCEMENT: ${titleVehicle}\n\n` +
      `OLADECK Global Services is pleased to announce the successful customs clearance and terminal release of a ${titleVehicle} at ${port}.\n\n` +
      `Clearance Duration: ${duration}\n` +
      `Customs Status: Fully Duty Paid & Verified\n` +
      `Terminal: ${port}\n\n` +
      `${portInfo} Our dedicated clearing team handled all documentation including Form M, SGD assessment, and terminal release procedures without delay.\n` +
      (specialNotes ? `\nSpecial Remarks: ${specialNotes}\n` : "") +
      `\nFor corporate fleet management or individual vehicle clearance inquiries, contact OLADECK Global Services.\n\n` +
      `${socialHashtags}`;
  } else {
    // Detailed Technical
    caption = `CUSTOMS CLEARANCE LOG: ${titleVehicle} [${port}]\n\n` +
      `Technical Overview:\n` +
      `- Vehicle: ${titleVehicle} (${category})\n` +
      `- Port of Discharge: ${port}\n` +
      `- Turnaround Time: ${duration}\n` +
      `- Customs Valuation: VIN-based e-Valuation Verified\n\n` +
      `Operational Summary:\n` +
      `${portInfo} Terminal physical inspection completed with zero discrepancies. Full customs release note issued.\n` +
      (specialNotes ? `Additional Logistics Note: ${specialNotes}\n` : "") +
      `\nNeed reliable clearing agent services in Lagos or Port Harcourt? Reach out to OLADECK Global Services today.\n\n` +
      `${socialHashtags}`;
  }

  // 2. Technical Documentation Generation
  const documentation = `==================================================
OFFICIAL VEHICLE CUSTOMS CLEARANCE DOCUMENTATION
OLADECK GLOBAL SERVICES — PORT OPERATIONS DIVISION
==================================================

1. VEHICLE IDENTIFICATION & SPECS
   • Make/Model: ${vehicleName}
   • Model Year: ${year}
   • Category: ${category}
   • Port of Entry: ${port}

2. CUSTOMS COMPLIANCE & DUTY SUMMARY
   • Duty Status: FULLY PAID & VERIFIED (AUTHENTIC C-NUMBER ISSUED)
   • Valuation System: Nigerian Customs e-Valuation Standard
   • Inspection Status: Physical Joint Inspection Completed (100% Satisfactory)
   • Demurrage Status: ZERO DEMURRAGE (Fast-Track Port Clearance)

3. LOGISTICS TIMELINE
   • Discharge to Terminal: Day 1
   • Assessment & Duty Payment: Day 2
   • Physical Inspection & Release: Day 3
   • Final Terminal Handover: ${duration}

4. AGENT OPERATIONS NOTE
   ${portInfo}
   ${specialNotes ? `Special Note: ${specialNotes}` : "All documents including Bill of Lading, SGD, and Valuation Slip verified clean."}

Verified by: OLADECK Operations Command Desk
Licence: Licensed Customs Agent (CAC Registered)
==================================================`;

  return {
    caption,
    documentation
  };
}
