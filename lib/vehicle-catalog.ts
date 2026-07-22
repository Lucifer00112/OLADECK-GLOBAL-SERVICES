import type { VehicleCatalogEntry } from "@/lib/types";

const bodyImages: Record<VehicleCatalogEntry["bodyType"], string> = {
  Sedan:
    "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?auto=format&fit=crop&w=1000&q=82",
  Hatchback:
    "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=1000&q=82",
  SUV:
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=82",
  Minivan:
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1000&q=82",
  Pickup:
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=82",
  Bus:
    "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=82",
  Truck:
    "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=1000&q=82",
  Coupe:
    "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1000&q=82",
  Wagon:
    "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1000&q=82",
  Van:
    "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=82"
};

export const vehicleBrands = [
  "Toyota", "Lexus", "Honda", "Acura", "Nissan", "Infiniti", "Mazda", "Mitsubishi",
  "Subaru", "Suzuki", "Daihatsu", "Isuzu", "Hino", "UD Trucks", "Mercedes-Benz",
  "BMW", "Audi", "Volkswagen", "Porsche", "Opel", "Smart", "MAN", "Ford",
  "Chevrolet", "GMC", "Cadillac", "Lincoln", "Dodge", "Chrysler", "Jeep", "RAM",
  "Buick", "Tesla", "Hyundai", "Kia", "Genesis", "Daewoo", "SsangYong",
  "Land Rover", "Range Rover", "Jaguar", "MINI", "Bentley", "Rolls-Royce",
  "Aston Martin", "MG", "Fiat", "Alfa Romeo", "Ferrari", "Lamborghini",
  "Maserati", "Lancia", "Peugeot", "Citroen", "Renault", "DS", "Volvo", "Saab",
  "Scania", "BYD", "Chery", "Geely", "GAC", "Great Wall", "Haval", "JAC",
  "Jetour", "BAIC", "Foton", "Dongfeng", "Changan", "Tata", "Mahindra",
  "Skoda", "Seat", "Dacia", "Iveco", "Renault Trucks", "Volvo Trucks", "DAF",
  "Mack", "Kenworth", "Peterbilt", "Freightliner", "International", "Holden",
  "Proton", "Perodua", "Wuling", "FAW", "Sinotruk", "Shacman", "JMC", "ZX Auto",
  "Roewe", "Maxus", "Lynk & Co", "Lifan", "Brilliance", "NIO", "XPeng", "Li Auto",
  "Leapmotor", "Hongqi", "Baojun", "Zotye", "Soueast", "Luxgen", "Abarth",
  "Cupra", "Polestar", "Lucid", "Rivian", "Mercury", "Pontiac", "Saturn",
  "Oldsmobile", "Hummer", "Scion", "Eagle"
];

const toyotaModels = [
  "4Runner", "Allion", "Altezza", "Aqua", "Aristo", "Auris", "Avalon", "Avanza",
  "Avensis", "bZ3", "bZ4X", "Belta", "Blade", "Brevis", "C-HR", "Caldina",
  "Calya", "Camry", "Carina", "Celica", "Century", "Corolla", "Corolla Axio",
  "Corolla Cross", "Corolla Fielder", "Corolla Rumion", "Corolla Spacio",
  "Corolla Verso", "Crown", "Crown Athlete", "Crown Majesta", "Crown Royal",
  "Estima", "FJ Cruiser", "Fortuner", "Harrier", "HiAce", "Highlander", "Hilux",
  "Hilux Surf", "Ipsum", "IQ", "Isis", "Kluger", "Land Cruiser",
  "Land Cruiser Prado", "Mark II", "Mark X", "Matrix", "Noah", "Passo", "Pixis",
  "Porte", "Premio", "Prius", "Probox", "Ractis", "Raize", "Raum", "RAV4",
  "Rush", "Sequoia", "Sienna", "Soarer", "Starlet", "Supra", "Tacoma", "Tercel",
  "TownAce", "Tundra", "Vanguard", "Vellfire", "Venza", "Vios", "Vitz", "Voxy",
  "Wish", "Yaris", "Yaris Cross", "Yaris Verso"
];

const commonImportedModels: Record<string, string[]> = {
  Lexus: ["ES 300", "ES 330", "ES 350", "GS 300", "GS 350", "IS 250", "IS 350", "RX 300", "RX 330", "RX 350", "GX 460", "LX 570"],
  Honda: ["Accord", "Civic", "CR-V", "Pilot", "Odyssey", "Fit", "HR-V", "Element", "Ridgeline"],
  Acura: ["MDX", "RDX", "TL", "TLX", "TSX", "RL", "ILX"],
  Nissan: ["Altima", "Maxima", "Sentra", "Rogue", "Murano", "Pathfinder", "Xterra", "Frontier", "Armada", "Quest"],
  Infiniti: ["FX35", "FX45", "G35", "G37", "M35", "Q50", "QX56", "QX60", "QX70"],
  Mazda: ["Mazda3", "Mazda6", "CX-5", "CX-7", "CX-9", "Demio", "Premacy", "Tribute"],
  Mitsubishi: ["Lancer", "Outlander", "Pajero", "Montero", "Galant", "ASX", "L200"],
  Subaru: ["Forester", "Outback", "Legacy", "Impreza", "Tribeca", "XV"],
  Suzuki: ["Swift", "Grand Vitara", "Vitara", "SX4", "Jimny", "Ertiga"],
  Isuzu: ["D-Max", "Rodeo", "Trooper", "NPR", "NQR"],
  "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLK", "GLC", "GLE", "ML-Class", "Sprinter", "Vito"],
  BMW: ["3 Series", "5 Series", "7 Series", "X1", "X3", "X5", "X6"],
  Audi: ["A3", "A4", "A6", "A8", "Q3", "Q5", "Q7"],
  Volkswagen: ["Golf", "Jetta", "Passat", "Tiguan", "Touareg", "Polo", "Sharan"],
  Ford: ["Focus", "Fusion", "Edge", "Escape", "Explorer", "Expedition", "F-150", "Transit"],
  Chevrolet: ["Cruze", "Malibu", "Impala", "Equinox", "Traverse", "Tahoe", "Suburban", "Silverado"],
  Hyundai: ["Accent", "Elantra", "Sonata", "Tucson", "Santa Fe", "ix35", "Genesis"],
  Kia: ["Rio", "Cerato", "Optima", "Sorento", "Sportage", "Soul", "Sedona"],
  Peugeot: ["206", "307", "308", "406", "407", "508", "3008", "5008", "Partner"],
  Renault: ["Clio", "Megane", "Koleos", "Duster", "Trafic"],
  Volvo: ["S40", "S60", "S80", "XC60", "XC90"],
  Jeep: ["Cherokee", "Grand Cherokee", "Compass", "Patriot", "Wrangler"],
  "Range Rover": ["Evoque", "Sport", "Vogue", "Velar"],
  "Land Rover": ["Discovery", "Freelander", "Defender"],
  Chery: ["Tiggo 2", "Tiggo 4", "Tiggo 7", "Arrizo"],
  Geely: ["Emgrand", "Coolray", "Azkarra"],
  BYD: ["F3", "Qin", "Song", "Tang", "Dolphin"],
  GAC: ["GS3", "GS4", "GS8"],
  Haval: ["H2", "H6", "Jolion"],
  Tata: ["Indica", "Indigo", "Xenon", "Ace"],
  Mahindra: ["Scorpio", "Bolero", "XUV500", "Pik-Up"]
};

function bodyTypeFor(model: string): VehicleCatalogEntry["bodyType"] {
  const lower = model.toLowerCase();
  if (/(hiace|townace|sprinter|vito|transit|partner|trafic|sedona|odyssey|sienna|estima|noah|voxy|vellfire|wish)/.test(lower)) return "Minivan";
  if (/(hilux|tacoma|tundra|frontier|d-max|l200|silverado|f-150|ridgeline|pik-up|xenon)/.test(lower)) return "Pickup";
  if (/(npr|nqr|hino|man|scania|truck|ace)/.test(lower)) return "Truck";
  if (/(rav4|cr-v|rx|gx|lx|x1|x3|x5|x6|q3|q5|q7|edge|escape|explorer|santa fe|sportage|sorento|touareg|tiguan|tahoe|suburban|land cruiser|prado|fortuner|highlander|harrier|venza|4runner|sequoia|rush|raize|c-hr|pilot|murano|rogue|pathfinder|armada|outlander|pajero|forester|outback|vitara|cherokee|discovery|evoque|velar|h6|gs4|tang|song|scorpio)/.test(lower)) return "SUV";
  if (/(yaris|vitz|golf|swift|fit|demio|aqua|passo|pixis|iq|starlet|polo|clio)/.test(lower)) return "Hatchback";
  if (/(celica|soarer|supra|c-class coupe|camaro|mustang)/.test(lower)) return "Coupe";
  if (/(fielder|wagon|probox)/.test(lower)) return "Wagon";
  return "Sedan";
}

function fuelFor(model: string): VehicleCatalogEntry["fuel"] {
  const lower = model.toLowerCase();
  if (/(tesla|byd|bZ3|bZ4X|dolphin)/i.test(model)) return "Electric";
  if (/(prius|aqua|hybrid|corolla cross|venza|camry|rx 350|es 300)/.test(lower)) return "Petrol/Hybrid";
  if (/(hilux|hiace|d-max|l200|sprinter|transit|npr|nqr|hino|man|scania|truck)/.test(lower)) return "Diesel";
  return "Petrol";
}

function originFor(brand: string): string {
  if (["Toyota", "Lexus", "Honda", "Acura", "Nissan", "Infiniti", "Mazda", "Mitsubishi", "Subaru", "Suzuki", "Daihatsu", "Isuzu", "Hino", "UD Trucks"].includes(brand)) return "Japan";
  if (["Mercedes-Benz", "BMW", "Audi", "Volkswagen", "Porsche", "Opel", "Smart", "MAN"].includes(brand)) return "Germany";
  if (["Ford", "Chevrolet", "GMC", "Cadillac", "Lincoln", "Dodge", "Chrysler", "Jeep", "RAM", "Buick", "Tesla"].includes(brand)) return "USA";
  if (["Hyundai", "Kia", "Genesis", "Daewoo", "SsangYong"].includes(brand)) return "South Korea";
  if (["Land Rover", "Range Rover", "Jaguar", "MINI", "Bentley", "Rolls-Royce", "Aston Martin", "MG"].includes(brand)) return "United Kingdom";
  if (["Peugeot", "Citroen", "Renault", "DS"].includes(brand)) return "France";
  if (["BYD", "Chery", "Geely", "GAC", "Great Wall", "Haval", "JAC", "Jetour", "BAIC", "Foton", "Dongfeng", "Changan"].includes(brand)) return "China";
  if (["Tata", "Mahindra"].includes(brand)) return "India";
  return "Global";
}

function entry(
  brand: string,
  model: string,
  generation: string,
  yearFrom: number,
  yearTo: number | "Present",
  bodyType = bodyTypeFor(model),
  fuel = fuelFor(model)
): VehicleCatalogEntry {
  return {
    id: `${brand}-${model}-${generation}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    brand,
    model,
    generation,
    yearFrom,
    yearTo,
    bodyType,
    fuel,
    origin: originFor(brand),
    image: bodyImages[bodyType]
  };
}

const corollaGenerations: VehicleCatalogEntry[] = [
  entry("Toyota", "Corolla", "E90", 1987, 1992, "Sedan", "Petrol"),
  entry("Toyota", "Corolla", "E100", 1991, 1998, "Sedan", "Petrol"),
  entry("Toyota", "Corolla", "E110", 1995, 2002, "Sedan", "Petrol"),
  entry("Toyota", "Corolla", "E120", 2000, 2007, "Sedan", "Petrol"),
  entry("Toyota", "Corolla", "E140", 2006, 2013, "Sedan", "Petrol"),
  entry("Toyota", "Corolla", "E170", 2013, 2019, "Sedan", "Petrol"),
  entry("Toyota", "Corolla", "E210", 2018, "Present", "Sedan", "Petrol/Hybrid")
];

const toyotaCatalog = toyotaModels.flatMap((model) => {
  if (model === "Corolla") return corollaGenerations;
  return [
    entry("Toyota", model, "Common Import", 2000, 2010),
    entry("Toyota", model, "Modern Import", 2011, "Present")
  ];
});

const broadCatalog = Object.entries(commonImportedModels).flatMap(([brand, models]) =>
  models.flatMap((model) => [
    entry(brand, model, "Common Import", 2000, 2012),
    entry(brand, model, "Modern Import", 2013, "Present")
  ])
);

const brandCoverage = vehicleBrands.map((brand) =>
  entry(brand, "Other Imported Model", "Catalog Ready", 2000, "Present")
);

export const vehicleCatalog: VehicleCatalogEntry[] = [
  ...toyotaCatalog,
  ...broadCatalog,
  ...brandCoverage
];
