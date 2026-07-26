import type {
  ClearingStatus,
  CommonCar,
  GalleryItem,
  PriceItem,
  QuoteRecord,
  VehicleShowcaseItem
} from "@/lib/types";
import { vehicleCatalog } from "@/lib/vehicle-catalog";

export const companyName = "OLADECK Global Services";

export const clearingStatuses: ClearingStatus[] = [
  "Received",
  "Pending",
  "Received by Customer"
];

export const commonCars: CommonCar[] = [
  {
    make: "Toyota",
    model: "Corolla",
    type: "Sedan",
    years: "2003-2024",
    image: "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?auto=format&fit=crop&w=1000&q=82"
  },
  {
    make: "Toyota",
    model: "Camry",
    type: "Sedan",
    years: "2002-2024",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=82"
  },
  {
    make: "Toyota",
    model: "Matrix",
    type: "Hatchback",
    years: "2003-2014",
    image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=1000&q=82"
  },
  {
    make: "Toyota",
    model: "Sienna",
    type: "Minivan",
    years: "2004-2024",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1000&q=82"
  },
  {
    make: "Toyota",
    model: "RAV4",
    type: "SUV",
    years: "2006-2024",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=82"
  },
  {
    make: "Toyota",
    model: "Venza",
    type: "SUV",
    years: "2009-2024",
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1000&q=82"
  },
  {
    make: "Honda",
    model: "Accord",
    type: "Sedan",
    years: "2003-2024",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1000&q=82"
  },
  {
    make: "Honda",
    model: "Civic",
    type: "Sedan",
    years: "2005-2024",
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1000&q=82"
  },
  {
    make: "Honda",
    model: "CR-V",
    type: "SUV",
    years: "2006-2024",
    image: "https://images.unsplash.com/photo-1517672651691-24622a91b550?auto=format&fit=crop&w=1000&q=82"
  },
  {
    make: "Hyundai",
    model: "Elantra",
    type: "Sedan",
    years: "2011-2024",
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1000&q=82"
  },
  {
    make: "Hyundai",
    model: "Sonata",
    type: "Sedan",
    years: "2011-2024",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1000&q=82"
  },
  {
    make: "Kia",
    model: "Rio",
    type: "Sedan",
    years: "2012-2024",
    image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=1000&q=82"
  },
  {
    make: "Kia",
    model: "Optima",
    type: "Sedan",
    years: "2011-2020",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=82"
  },
  {
    make: "Nissan",
    model: "Altima",
    type: "Sedan",
    years: "2007-2024",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1000&q=82"
  },
  {
    make: "Nissan",
    model: "Rogue",
    type: "SUV",
    years: "2008-2024",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=82"
  },
  {
    make: "Ford",
    model: "Edge",
    type: "SUV",
    years: "2007-2024",
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1000&q=82"
  },
  {
    make: "Lexus",
    model: "ES 350",
    type: "Sedan",
    years: "2007-2024",
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1000&q=82"
  },
  {
    make: "Lexus",
    model: "RX 350",
    type: "SUV",
    years: "2007-2024",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1000&q=82"
  },
  {
    make: "Volkswagen",
    model: "Golf",
    type: "Hatchback",
    years: "2004-2024",
    image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=1000&q=82"
  },
  {
    make: "Peugeot",
    model: "406",
    type: "Sedan",
    years: "1999-2004",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=82"
  },
  {
    make: "Toyota",
    model: "Hiace",
    type: "Bus",
    years: "2005-2024",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=82"
  },
  {
    make: "Toyota",
    model: "Hilux",
    type: "Pickup",
    years: "2005-2024",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=82"
  }
];

export const services = [
  "Vehicle Customs Clearance",
  "Duty Processing Assistance",
  "Port Documentation",
  "Vehicle Release",
  "Port Logistics",
  "Delivery Coordination",
  "Auction Vehicle Clearance",
  "Everyday Car Clearance",
  "Fleet Clearance",
  "Corporate Import Services",
  "Consultation for First-Time Importers",
  "Emergency Fast Track Assistance"
];

export const stats = [
  { label: "WhatsApp Desk", value: 1, suffix: "" },
  { label: "Catalog Entries", value: vehicleCatalog.length, suffix: "+" },
  { label: "Working Day Target", value: 6, suffix: " days" },
  { label: "Tracking Statuses", value: 3, suffix: "" },
  { label: "Arrival Ports Supported", value: 4, suffix: "" }
];

export const galleryItems: GalleryItem[] = [
  {
    id: "g-corolla",
    vehicle: "Toyota Corolla",
    year: 2014,
    port: "Tin Can Island",
    completedAt: "Live customer import",
    category: "Sedans",
    image: commonCars[0].image
  },
  {
    id: "g-camry",
    vehicle: "Toyota Camry",
    year: 2012,
    port: "Apapa",
    completedAt: "Live customer import",
    category: "Sedans",
    image: commonCars[1].image
  },
  {
    id: "g-accord",
    vehicle: "Honda Accord",
    year: 2010,
    port: "PTML",
    completedAt: "Live customer import",
    category: "Sedans",
    image: commonCars[6].image
  },
  {
    id: "g-rav4",
    vehicle: "Toyota RAV4",
    year: 2015,
    port: "Onne",
    completedAt: "Live customer import",
    category: "SUVs",
    image: commonCars[4].image
  },
  {
    id: "g-sienna",
    vehicle: "Toyota Sienna",
    year: 2011,
    port: "Tin Can Island",
    completedAt: "Live customer import",
    category: "Commercial",
    image: commonCars[3].image
  },
  {
    id: "g-hilux",
    vehicle: "Toyota Hilux",
    year: 2014,
    port: "Apapa",
    completedAt: "Live customer import",
    category: "Commercial",
    image: commonCars[21].image
  }
];

export const vehicleShowcaseItems: VehicleShowcaseItem[] = commonCars.map((car) => ({
  id: `${car.make}-${car.model}`.toLowerCase().replace(/\s+/g, "-"),
  name: `${car.make} ${car.model}`,
  category: car.type === "SUV" ? "SUVs" : car.type === "Sedan" ? "Sedans" : "Commercial",
  image: car.image,
  note: `${car.years} models commonly imported and cleared in Nigeria.`
}));

export const heroMotionPanels = [
  {
    label: "Port Arrival",
    image:
      "https://images.unsplash.com/photo-1494412685616-a5d310fbb07d?auto=format&fit=crop&w=1400&q=82",
    video:
      "https://videos.pexels.com/video-files/3058057/3058057-uhd_3840_2160_30fps.mp4"
  },
  {
    label: "Vehicle Inspection",
    image:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1400&q=82"
  },
  {
    label: "Luxury Release",
    image:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1400&q=82",
    video:
      "https://videos.pexels.com/video-files/32156782/13711106_3840_2160_24fps.mp4"
  }
];

export const testimonials = [];

export const faqs = [
  ["How long does vehicle clearing take?", "Most compliant passenger vehicles are released within 3 to 7 working days after documents and duty are complete."],
  ["Which Nigerian ports do you cover?", "We support Apapa, Tin Can Island, PTML, Onne, and other active vehicle arrival points by arrangement."],
  ["Can I clear a car without the original title?", "Requirements depend on the origin country and shipment type. We will review your documents before advising."],
  ["Do you calculate customs duty?", "We provide duty processing assistance and cost estimates, but final assessments are issued by the relevant authorities."],
  ["Do you clear auction vehicles?", "Yes. We handle auction vehicles from the US, Canada, Europe, and Asia when documentation is complete."],
  ["Can you deliver after release?", "Yes. Delivery coordination is available within Lagos and to other Nigerian states through trusted logistics partners."],
  ["What documents do I need?", "Common documents include bill of lading, purchase invoice, export title, packing list where applicable, and valid identification."],
  ["Do you support corporate fleet clearance?", "Yes. We manage bulk vehicle clearance, staged documentation, and reporting for businesses."],
  ["Can I track progress online?", "Yes. Every quote receives a tracking number such as CLR-2026-000001 for progress updates."],
  ["Is payment history available in the portal?", "Yes. Customers can view invoices, receipts, and payment status in the customer portal."],
  ["Do you offer emergency fast track help?", "Yes, when the case qualifies and the required documents are ready."],
  ["Can I upload documents online?", "Yes. The quote form accepts document images, invoices, and supporting files."],
  ["Can I type a car that is not listed?", "Yes. The car search suggests common Nigerian imports, but you can type any car model manually."],
  ["Do you focus on everyday Nigerian import cars?", "Yes. The platform is tuned for cars Nigerians commonly import and resell, including Toyota, Honda, Lexus, Hyundai, Kia, Nissan, Ford, Volkswagen, and Peugeot models."],
  ["Can I save my quote and continue later?", "Yes. The quote form stores a local draft until you submit it."],
  ["Do you notify by WhatsApp?", "Yes. WhatsApp notifications are supported once a notification provider is connected."],
  ["Can I request a callback?", "Yes. The contact page includes a preferred callback date and time."],
  ["Do you publish port updates?", "Yes. Admins can publish notices for delays, holidays, and customs announcements."],
  ["Do you provide import guides?", "Yes. The resource center includes downloadable import and document guides."],
  ["Is my data secure?", "The platform uses server-side validation, Supabase Auth, role permissions, storage policies, and audit logging patterns."]
].map(([question, answer]) => ({ question, answer }));

export const blogPosts = [
  {
    slug: "documents-required-for-nigeria-vehicle-clearance",
    title: "Documents Required for Vehicle Clearance in Nigeria",
    excerpt:
      "A practical list of customs, shipping, and ownership documents to prepare before your vehicle arrives.",
    category: "Import Tips",
    date: "2026-07-10",
    readTime: "5 min read"
  },
  {
    slug: "how-to-estimate-import-duty",
    title: "How to Estimate Import Duty Before Shipping",
    excerpt:
      "Understand the variables that influence duty, port charges, terminal fees, and delivery coordination.",
    category: "Duty Guidance",
    date: "2026-06-28",
    readTime: "6 min read"
  },
  {
    slug: "lagos-port-update-july-2026",
    title: "Lagos Port Update: July 2026",
    excerpt:
      "Recent operational notes for vehicle importers using Apapa, Tin Can Island, and PTML.",
    category: "Port Updates",
    date: "2026-07-01",
    readTime: "3 min read"
  }
];

export const quoteRecords: QuoteRecord[] = [
];

export const defaultPriceList: PriceItem[] = [
  {
    id: "customs-clearance",
    service: "Vehicle Customs Clearance",
    basePrice: 650000,
    unit: "per vehicle",
    description: "Core customs processing, documentation review, and status management."
  },
  {
    id: "duty-processing",
    service: "Duty Processing Assistance",
    basePrice: 250000,
    unit: "per assessment",
    description: "Duty memo coordination and payment confirmation support."
  },
  {
    id: "port-documentation",
    service: "Port Documentation",
    basePrice: 180000,
    unit: "per shipment",
    description: "Terminal, shipping line, and release documentation support."
  },
  {
    id: "delivery-coordination",
    service: "Delivery Coordination",
    basePrice: 320000,
    unit: "Lagos metro",
    description: "Pickup scheduling, handover, and last-mile delivery coordination."
  },
  {
    id: "fast-track",
    service: "Emergency Fast Track Assistance",
    basePrice: 450000,
    unit: "priority case",
    description: "Priority desk attention for qualified urgent clearances."
  },
  {
    id: "fleet",
    service: "Fleet Clearance",
    basePrice: 550000,
    unit: "per vehicle",
    description: "Discountable base rate for multi-vehicle corporate shipments."
  }
];

export const portUpdates: { title: string; date: string; body: string }[] = [];

export const resources = [
  "How to Import a Car into Nigeria",
  "Documents Required for Vehicle Clearance",
  "First-Time Importer Checklist",
  "Corporate Fleet Clearance Guide"
];
