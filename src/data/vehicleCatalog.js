const buildFallbackUrl = (model, year, sig, extra = "") => {
  const seed = `${slugify(model)}-${year}-${sig}-${extra || "car"}`;
  return `https://picsum.photos/seed/${seed}/1200/800`;
};

const exteriorPool = [
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
];

const buildExteriorUrl = (sig) => exteriorPool[sig % exteriorPool.length];

const interiorByBrand = {
  Toyota: [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
  ],
  Lexus: [
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80"
  ],
  Mercedes: [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
  ],
  BMW: [
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80"
  ],
  Honda: [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80"
  ],
  Ford: [
    "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80"
  ],
  Nissan: [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
  ],
  Kia: [
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
  ],
  Hyundai: [
    "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80"
  ],
  Mitsubishi: [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80"
  ]
};

const interiorByModel = {
  "Toyota Camry XSE": [
    "https://source.unsplash.com/1200x800/?toyota,camry,interior",
    "https://source.unsplash.com/1200x800/?camry,interior",
    "https://source.unsplash.com/1200x800/?toyota,sedan,interior"
  ],
  "Toyota Corolla Altis": [
    "https://source.unsplash.com/1200x800/?toyota,corolla,interior",
    "https://source.unsplash.com/1200x800/?corolla,interior",
    "https://source.unsplash.com/1200x800/?toyota,interior"
  ],
  "Honda Accord Sport": [
    "https://source.unsplash.com/1200x800/?honda,accord,interior",
    "https://source.unsplash.com/1200x800/?accord,interior",
    "https://source.unsplash.com/1200x800/?honda,sedan,interior"
  ],
  "Lexus ES 350": [
    "https://source.unsplash.com/1200x800/?lexus,es,interior",
    "https://source.unsplash.com/1200x800/?lexus,sedan,interior",
    "https://source.unsplash.com/1200x800/?lexus,interior"
  ],
  "Mercedes-Benz C300": [
    "https://source.unsplash.com/1200x800/?mercedes,c-class,interior",
    "https://source.unsplash.com/1200x800/?mercedes,interior",
    "https://source.unsplash.com/1200x800/?mercedes,sedan,interior"
  ],
  "BMW 3 Series": [
    "https://source.unsplash.com/1200x800/?bmw,3-series,interior",
    "https://source.unsplash.com/1200x800/?bmw,interior",
    "https://source.unsplash.com/1200x800/?bmw,sedan,interior"
  ],
  "Toyota Avalon": [
    "https://source.unsplash.com/1200x800/?toyota,avalon,interior",
    "https://source.unsplash.com/1200x800/?avalon,interior",
    "https://source.unsplash.com/1200x800/?toyota,sedan,interior"
  ],
  "Lexus RX 350": [
    "https://source.unsplash.com/1200x800/?lexus,rx,interior",
    "https://source.unsplash.com/1200x800/?lexus,suv,interior",
    "https://source.unsplash.com/1200x800/?lexus,interior"
  ],
  "Toyota Highlander": [
    "https://source.unsplash.com/1200x800/?toyota,highlander,interior",
    "https://source.unsplash.com/1200x800/?highlander,interior",
    "https://source.unsplash.com/1200x800/?toyota,suv,interior"
  ],
  "Toyota Land Cruiser Prado": [
    "https://source.unsplash.com/1200x800/?toyota,prado,interior",
    "https://source.unsplash.com/1200x800/?landcruiser,interior",
    "https://source.unsplash.com/1200x800/?toyota,suv,interior"
  ],
  "Lexus GX 460": [
    "https://source.unsplash.com/1200x800/?lexus,gx,interior",
    "https://source.unsplash.com/1200x800/?lexus,suv,interior",
    "https://source.unsplash.com/1200x800/?lexus,interior"
  ],
  "Mercedes-Benz G-Wagon G63": [
    "https://source.unsplash.com/1200x800/?mercedes,g-wagon,interior",
    "https://source.unsplash.com/1200x800/?g-wagon,interior",
    "https://source.unsplash.com/1200x800/?mercedes,interior"
  ],
  "Toyota Fortuner": [
    "https://source.unsplash.com/1200x800/?toyota,fortuner,interior",
    "https://source.unsplash.com/1200x800/?fortuner,interior",
    "https://source.unsplash.com/1200x800/?toyota,suv,interior"
  ],
  "Nissan Patrol": [
    "https://source.unsplash.com/1200x800/?nissan,patrol,interior",
    "https://source.unsplash.com/1200x800/?nissan,suv,interior",
    "https://source.unsplash.com/1200x800/?nissan,interior"
  ],
  "Toyota Hilux Adventure": [
    "https://source.unsplash.com/1200x800/?toyota,hilux,interior",
    "https://source.unsplash.com/1200x800/?hilux,interior",
    "https://source.unsplash.com/1200x800/?toyota,truck,interior"
  ],
  "Ford Ranger Wildtrak": [
    "https://source.unsplash.com/1200x800/?ford,ranger,interior",
    "https://source.unsplash.com/1200x800/?ranger,interior",
    "https://source.unsplash.com/1200x800/?ford,truck,interior"
  ],
  "Mitsubishi L200": [
    "https://source.unsplash.com/1200x800/?mitsubishi,l200,interior",
    "https://source.unsplash.com/1200x800/?mitsubishi,truck,interior",
    "https://source.unsplash.com/1200x800/?pickup,interior"
  ],
  "Toyota Sienna": [
    "https://source.unsplash.com/1200x800/?toyota,sienna,interior",
    "https://source.unsplash.com/1200x800/?sienna,interior",
    "https://source.unsplash.com/1200x800/?minivan,interior"
  ],
  "Kia Carnival": [
    "https://source.unsplash.com/1200x800/?kia,carnival,interior",
    "https://source.unsplash.com/1200x800/?kia,interior",
    "https://source.unsplash.com/1200x800/?minivan,interior"
  ],
  "Hyundai Santa Fe": [
    "https://source.unsplash.com/1200x800/?hyundai,santa-fe,interior",
    "https://source.unsplash.com/1200x800/?hyundai,suv,interior",
    "https://source.unsplash.com/1200x800/?hyundai,interior"
  ]
};

const trims = [
  "Premium",
  "Limited",
  "Sport",
  "Executive",
  "Signature",
  "Platinum",
  "Luxury",
  "X-Line",
  "Adventure",
  "Elite"
];

const baseModels = [
  {
    name: "Toyota Camry XSE",
    type: "Sedan",
    engine: "2.5L 4-cylinder",
    fuel: "Petrol",
    drivetrain: "FWD",
    seats: 5,
    transmission: "Automatic",
    basePrice: 18500000
  },
  {
    name: "Toyota Corolla Altis",
    type: "Sedan",
    engine: "1.8L 4-cylinder",
    fuel: "Petrol",
    drivetrain: "FWD",
    seats: 5,
    transmission: "Automatic",
    basePrice: 14000000
  },
  {
    name: "Honda Accord Sport",
    type: "Sedan",
    engine: "1.5L Turbo",
    fuel: "Petrol",
    drivetrain: "FWD",
    seats: 5,
    transmission: "Automatic",
    basePrice: 12500000
  },
  {
    name: "Lexus ES 350",
    type: "Sedan",
    engine: "3.5L V6",
    fuel: "Petrol",
    drivetrain: "FWD",
    seats: 5,
    transmission: "Automatic",
    basePrice: 22000000
  },
  {
    name: "Mercedes-Benz C300",
    type: "Sedan",
    engine: "2.0L Turbo",
    fuel: "Petrol",
    drivetrain: "RWD",
    seats: 5,
    transmission: "Automatic",
    basePrice: 28000000
  },
  {
    name: "BMW 3 Series",
    type: "Sedan",
    engine: "2.0L Turbo",
    fuel: "Petrol",
    drivetrain: "RWD",
    seats: 5,
    transmission: "Automatic",
    basePrice: 26000000
  },
  {
    name: "Toyota Avalon",
    type: "Sedan",
    engine: "3.5L V6",
    fuel: "Petrol",
    drivetrain: "FWD",
    seats: 5,
    transmission: "Automatic",
    basePrice: 24000000
  },
  {
    name: "Lexus RX 350",
    type: "SUV",
    engine: "3.5L V6",
    fuel: "Petrol",
    drivetrain: "AWD",
    seats: 5,
    transmission: "Automatic",
    basePrice: 35000000
  },
  {
    name: "Toyota Highlander",
    type: "SUV",
    engine: "3.5L V6",
    fuel: "Petrol",
    drivetrain: "AWD",
    seats: 7,
    transmission: "Automatic",
    basePrice: 32000000
  },
  {
    name: "Toyota Land Cruiser Prado",
    type: "SUV",
    engine: "4.0L V6",
    fuel: "Petrol",
    drivetrain: "4WD",
    seats: 7,
    transmission: "Automatic",
    basePrice: 75000000
  },
  {
    name: "Lexus GX 460",
    type: "SUV",
    engine: "4.6L V8",
    fuel: "Petrol",
    drivetrain: "4WD",
    seats: 7,
    transmission: "Automatic",
    basePrice: 55000000
  },
  {
    name: "Mercedes-Benz G-Wagon G63",
    type: "SUV",
    engine: "4.0L V8 Biturbo",
    fuel: "Petrol",
    drivetrain: "AWD",
    seats: 5,
    transmission: "Automatic",
    basePrice: 180000000
  },
  {
    name: "Toyota Fortuner",
    type: "SUV",
    engine: "2.8L Turbo Diesel",
    fuel: "Diesel",
    drivetrain: "4WD",
    seats: 7,
    transmission: "Automatic",
    basePrice: 30000000
  },
  {
    name: "Nissan Patrol",
    type: "SUV",
    engine: "5.6L V8",
    fuel: "Petrol",
    drivetrain: "4WD",
    seats: 7,
    transmission: "Automatic",
    basePrice: 68000000
  },
  {
    name: "Toyota Hilux Adventure",
    type: "Truck",
    engine: "2.8L Turbo Diesel",
    fuel: "Diesel",
    drivetrain: "4WD",
    seats: 5,
    transmission: "Automatic",
    basePrice: 45000000
  },
  {
    name: "Ford Ranger Wildtrak",
    type: "Truck",
    engine: "2.0L Bi-Turbo",
    fuel: "Diesel",
    drivetrain: "4WD",
    seats: 5,
    transmission: "Automatic",
    basePrice: 40000000
  },
  {
    name: "Mitsubishi L200",
    type: "Truck",
    engine: "2.4L Turbo Diesel",
    fuel: "Diesel",
    drivetrain: "4WD",
    seats: 5,
    transmission: "Automatic",
    basePrice: 28000000
  },
  {
    name: "Toyota Sienna",
    type: "Van",
    engine: "3.5L V6",
    fuel: "Petrol",
    drivetrain: "FWD",
    seats: 7,
    transmission: "Automatic",
    basePrice: 38000000
  },
  {
    name: "Kia Carnival",
    type: "Van",
    engine: "3.5L V6",
    fuel: "Petrol",
    drivetrain: "FWD",
    seats: 7,
    transmission: "Automatic",
    basePrice: 32000000
  },
  {
    name: "Hyundai Santa Fe",
    type: "SUV",
    engine: "2.5L Turbo",
    fuel: "Petrol",
    drivetrain: "AWD",
    seats: 7,
    transmission: "Automatic",
    basePrice: 27000000
  }
];

const years = [2019, 2020, 2021, 2022, 2023];
const locations = ["Lagos", "Abuja", "Port Harcourt", "Kano", "Ibadan", "Enugu"];
const exteriorColors = [
  "Midnight Black",
  "Pearl White",
  "Ice Gray",
  "Caviar",
  "Modern Steel",
  "Obsidian Black",
  "Deep Blue",
  "Crimson Red"
];
const interiorTrims = ["Leather", "Premium Leather", "Cloth", "Nappa Leather", "Suede"];

const sharedFeatures = [
  "Bluetooth audio",
  "Reverse camera",
  "ABS braking system",
  "Dual front airbags",
  "Cruise control",
  "Keyless start",
  "Touchscreen infotainment",
  "USB and AUX ports",
  "Parking sensors",
  "Alloy wheels"
];

const badgeByYear = (year) => {
  if (year >= 2023) return "Brand New";
  if (year === 2022) return "Certified";
  if (year === 2021) return "Foreign Used";
  return "Nigerian Used";
};

const formatPrice = (value) => `NGN ${value.toLocaleString("en-NG")}`;

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const createVehicle = (base, year, index) => {
  const badge = badgeByYear(year);
  const mileageBase = Math.max(1200, (2024 - year) * 12000 + index * 450);
  const distance = badge === "Brand New" ? "0 km" : `${mileageBase.toLocaleString("en-NG")} km`;
  const priceValue = base.basePrice + (year - 2019) * 1500000 + index * 50000;
  const exterior = exteriorColors[index % exteriorColors.length];
  const interior = interiorTrims[index % interiorTrims.length];
  const image = buildExteriorUrl(index);
  const brand = base.name.split(" ")[0];
  const trim = trims[index % trims.length];
  const interiorImages =
    interiorByModel[base.name] ||
    interiorByBrand[brand] ||
    [
      buildFallbackUrl(base.name, year, index + 101, "interior"),
      buildFallbackUrl(base.name, year, index + 202, "interior"),
      buildFallbackUrl(base.name, year, index + 303, "interior")
    ];
  const listingName = `${base.name} ${trim} ${year}`;

  return {
    id: `${slugify(base.name)}-${year}-${index % 5}`,
    name: listingName,
    model: base.name,
    trim,
    year: `${year} Model`,
    price: formatPrice(priceValue),
    priceValue,
    badge,
    distance,
    transmission: base.transmission,
    fuel: base.fuel,
    location: locations[index % locations.length],
    seats: `${base.seats} seats`,
    drivetrain: base.drivetrain,
    engine: base.engine,
    exterior,
    interior,
    type: base.type,
    image,
    gallery: [
      image,
      buildExteriorUrl(index + 401),
      buildExteriorUrl(index + 502)
    ],
    interiorImages,
    features: sharedFeatures,
    description: `Well-maintained ${year} ${base.name} with verified inspection and full service history.`
  };
};

const vehicleCatalog = baseModels.flatMap((base, baseIndex) =>
  years.map((year, yearIndex) =>
    createVehicle(base, year, baseIndex * years.length + yearIndex)
  )
);

export default vehicleCatalog;
