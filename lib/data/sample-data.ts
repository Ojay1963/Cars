export type SampleListing = {
  slug: string;
  title: string;
  make: string;
  model: string;
  trim: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: "PETROL" | "DIESEL" | "HYBRID" | "ELECTRIC";
  transmission: "AUTOMATIC" | "MANUAL";
  bodyType: "SEDAN" | "SUV" | "COUPE" | "HATCHBACK" | "TRUCK" | "VAN";
  color: string;
  condition: "NEW" | "FOREIGN_USED" | "NIGERIAN_USED" | "CERTIFIED_PRE_OWNED";
  description: string;
  location: string;
  city: string;
  state: string;
  featured: boolean;
  status: "PUBLISHED" | "RESERVED" | "SOLD";
  engine: string;
  drivetrain: string;
  seats: number;
  doors: number;
  images: { url: string; altText: string; isPrimary?: boolean }[];
};

export const sampleListings: SampleListing[] = [
  {
    slug: "2023-mercedes-benz-gle-450-4matic",
    title: "2023 Mercedes-Benz GLE 450 4MATIC",
    make: "Mercedes-Benz",
    model: "GLE 450",
    trim: "4MATIC",
    year: 2023,
    price: 148000000,
    mileage: 8200,
    fuelType: "PETROL",
    transmission: "AUTOMATIC",
    bodyType: "SUV",
    color: "Obsidian Black",
    condition: "CERTIFIED_PRE_OWNED",
    description:
      "Executive-spec SUV with panoramic roof, Burmester audio, digital cockpit, and dealership-grade inspection documentation.",
    location: "Victoria Island, Lagos",
    city: "Lagos",
    state: "Lagos",
    featured: true,
    status: "PUBLISHED",
    engine: "3.0L Turbo Inline-6",
    drivetrain: "AWD",
    seats: 5,
    doors: 4,
    images: [
      {
        url: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=80",
        altText: "Mercedes-Benz GLE exterior",
        isPrimary: true
      },
      {
        url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
        altText: "Mercedes-Benz GLE front profile"
      }
    ]
  },
  {
    slug: "2022-toyota-land-cruiser-prado",
    title: "2022 Toyota Land Cruiser Prado",
    make: "Toyota",
    model: "Land Cruiser Prado",
    trim: "VX",
    year: 2022,
    price: 119500000,
    mileage: 15600,
    fuelType: "DIESEL",
    transmission: "AUTOMATIC",
    bodyType: "SUV",
    color: "Pearl White",
    condition: "FOREIGN_USED",
    description:
      "Highly sought-after seven-seat SUV with leather cabin, terrain modes, and full inspection history for family and executive travel.",
    location: "Abuja Central, Abuja",
    city: "Abuja",
    state: "FCT",
    featured: true,
    status: "PUBLISHED",
    engine: "2.8L Turbo Diesel",
    drivetrain: "4WD",
    seats: 7,
    doors: 4,
    images: [
      {
        url: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1600&q=80",
        altText: "Toyota Land Cruiser Prado exterior",
        isPrimary: true
      },
      {
        url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80",
        altText: "Toyota Land Cruiser Prado rear angle"
      }
    ]
  },
  {
    slug: "2024-bmw-530i-m-sport",
    title: "2024 BMW 530i M Sport",
    make: "BMW",
    model: "530i",
    trim: "M Sport",
    year: 2024,
    price: 132000000,
    mileage: 2400,
    fuelType: "PETROL",
    transmission: "AUTOMATIC",
    bodyType: "SEDAN",
    color: "Brooklyn Grey",
    condition: "NEW",
    description:
      "Brand-new luxury sedan with advanced driver assistance, adaptive suspension, and premium executive comfort package.",
    location: "Lekki Phase 1, Lagos",
    city: "Lagos",
    state: "Lagos",
    featured: true,
    status: "PUBLISHED",
    engine: "2.0L TwinPower Turbo",
    drivetrain: "RWD",
    seats: 5,
    doors: 4,
    images: [
      {
        url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1600&q=80",
        altText: "BMW 530i exterior",
        isPrimary: true
      },
      {
        url: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1600&q=80",
        altText: "BMW 530i side profile"
      }
    ]
  },
  {
    slug: "2021-lexus-rx-350-luxury",
    title: "2021 Lexus RX 350 Luxury",
    make: "Lexus",
    model: "RX 350",
    trim: "Luxury",
    year: 2021,
    price: 78500000,
    mileage: 28700,
    fuelType: "PETROL",
    transmission: "AUTOMATIC",
    bodyType: "SUV",
    color: "Caviar",
    condition: "CERTIFIED_PRE_OWNED",
    description:
      "Premium crossover with ventilated seats, 360 camera, Mark Levinson sound, and a documented service record.",
    location: "Port Harcourt GRA, Rivers",
    city: "Port Harcourt",
    state: "Rivers",
    featured: false,
    status: "PUBLISHED",
    engine: "3.5L V6",
    drivetrain: "AWD",
    seats: 5,
    doors: 4,
    images: [
      {
        url: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1600&q=80",
        altText: "Lexus RX 350 exterior",
        isPrimary: true
      }
    ]
  },
  {
    slug: "2020-toyota-hilux-adventure",
    title: "2020 Toyota Hilux Adventure",
    make: "Toyota",
    model: "Hilux",
    trim: "Adventure",
    year: 2020,
    price: 56500000,
    mileage: 43200,
    fuelType: "DIESEL",
    transmission: "AUTOMATIC",
    bodyType: "TRUCK",
    color: "Deep Blue",
    condition: "NIGERIAN_USED",
    description:
      "Rugged pickup with strong fleet and lifestyle appeal, upgraded multimedia, and solid maintenance history.",
    location: "Ikeja, Lagos",
    city: "Lagos",
    state: "Lagos",
    featured: false,
    status: "PUBLISHED",
    engine: "2.8L Turbo Diesel",
    drivetrain: "4WD",
    seats: 5,
    doors: 4,
    images: [
      {
        url: "https://images.unsplash.com/photo-1494976388901-750f4c7cf462?auto=format&fit=crop&w=1600&q=80",
        altText: "Toyota Hilux exterior",
        isPrimary: true
      }
    ]
  },
  {
    slug: "2023-hyundai-santa-fe-hybrid",
    title: "2023 Hyundai Santa Fe Hybrid",
    make: "Hyundai",
    model: "Santa Fe",
    trim: "Hybrid",
    year: 2023,
    price: 68400000,
    mileage: 11200,
    fuelType: "HYBRID",
    transmission: "AUTOMATIC",
    bodyType: "SUV",
    color: "Typhoon Silver",
    condition: "CERTIFIED_PRE_OWNED",
    description:
      "Efficient family SUV with low running costs, spacious seating, and verified hybrid system health report.",
    location: "Enugu North, Enugu",
    city: "Enugu",
    state: "Enugu",
    featured: true,
    status: "PUBLISHED",
    engine: "1.6L Turbo Hybrid",
    drivetrain: "AWD",
    seats: 7,
    doors: 4,
    images: [
      {
        url: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1600&q=80",
        altText: "Hyundai Santa Fe exterior",
        isPrimary: true
      }
    ]
  },
  {
    slug: "2022-audi-q7-premium-plus",
    title: "2022 Audi Q7 Premium Plus",
    make: "Audi",
    model: "Q7",
    trim: "Premium Plus",
    year: 2022,
    price: 126500000,
    mileage: 14300,
    fuelType: "PETROL",
    transmission: "AUTOMATIC",
    bodyType: "SUV",
    color: "Glacier White",
    condition: "FOREIGN_USED",
    description:
      "Three-row executive SUV with virtual cockpit, quattro traction, Bang & Olufsen audio, and a clean inspection-backed history.",
    location: "Ikoyi, Lagos",
    city: "Lagos",
    state: "Lagos",
    featured: true,
    status: "PUBLISHED",
    engine: "3.0L Turbo V6",
    drivetrain: "AWD",
    seats: 7,
    doors: 4,
    images: [
      {
        url: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1600&q=80",
        altText: "Audi Q7 exterior",
        isPrimary: true
      }
    ]
  },
  {
    slug: "2021-land-rover-range-rover-sport-hse",
    title: "2021 Land Rover Range Rover Sport HSE",
    make: "Land Rover",
    model: "Range Rover Sport",
    trim: "HSE",
    year: 2021,
    price: 139000000,
    mileage: 19800,
    fuelType: "PETROL",
    transmission: "AUTOMATIC",
    bodyType: "SUV",
    color: "Santorini Black",
    condition: "CERTIFIED_PRE_OWNED",
    description:
      "Premium SUV with air suspension, Meridian audio, and a commanding road presence suited for executive and family use.",
    location: "Asokoro, Abuja",
    city: "Abuja",
    state: "FCT",
    featured: true,
    status: "PUBLISHED",
    engine: "3.0L Supercharged V6",
    drivetrain: "4WD",
    seats: 5,
    doors: 4,
    images: [
      {
        url: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1600&q=80",
        altText: "Range Rover Sport exterior",
        isPrimary: true
      }
    ]
  },
  {
    slug: "2024-porsche-cayenne-coupe",
    title: "2024 Porsche Cayenne Coupe",
    make: "Porsche",
    model: "Cayenne",
    trim: "Coupe",
    year: 2024,
    price: 189000000,
    mileage: 3900,
    fuelType: "PETROL",
    transmission: "AUTOMATIC",
    bodyType: "SUV",
    color: "Arctic Grey",
    condition: "NEW",
    description:
      "Driver-focused luxury SUV with adaptive air suspension, premium leather cabin, and performance-oriented Porsche dynamics.",
    location: "Victoria Island, Lagos",
    city: "Lagos",
    state: "Lagos",
    featured: true,
    status: "PUBLISHED",
    engine: "3.0L Turbo V6",
    drivetrain: "AWD",
    seats: 5,
    doors: 4,
    images: [
      {
        url: "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1600&q=80",
        altText: "Porsche Cayenne exterior",
        isPrimary: true
      }
    ]
  },
  {
    slug: "2023-tesla-model-y-long-range",
    title: "2023 Tesla Model Y Long Range",
    make: "Tesla",
    model: "Model Y",
    trim: "Long Range",
    year: 2023,
    price: 98000000,
    mileage: 9600,
    fuelType: "ELECTRIC",
    transmission: "AUTOMATIC",
    bodyType: "SUV",
    color: "Pearl White Multi-Coat",
    condition: "FOREIGN_USED",
    description:
      "Fully electric crossover with dual-motor range confidence, panoramic glass roof, and a minimalist premium tech cabin.",
    location: "GRA, Port Harcourt",
    city: "Port Harcourt",
    state: "Rivers",
    featured: false,
    status: "PUBLISHED",
    engine: "Dual Motor Electric",
    drivetrain: "AWD",
    seats: 5,
    doors: 4,
    images: [
      {
        url: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1600&q=80",
        altText: "Tesla Model Y exterior",
        isPrimary: true
      }
    ]
  },
  {
    slug: "2022-honda-accord-touring",
    title: "2022 Honda Accord Touring",
    make: "Honda",
    model: "Accord",
    trim: "Touring",
    year: 2022,
    price: 49500000,
    mileage: 22100,
    fuelType: "PETROL",
    transmission: "AUTOMATIC",
    bodyType: "SEDAN",
    color: "Platinum White",
    condition: "FOREIGN_USED",
    description:
      "Refined midsize sedan with premium comfort, driver-assist suite, and excellent reliability for urban daily use.",
    location: "Ibadan, Oyo",
    city: "Ibadan",
    state: "Oyo",
    featured: false,
    status: "PUBLISHED",
    engine: "2.0L Turbo",
    drivetrain: "FWD",
    seats: 5,
    doors: 4,
    images: [
      {
        url: "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1600&q=80",
        altText: "Honda Accord exterior",
        isPrimary: true
      }
    ]
  },
  {
    slug: "2021-ford-explorer-limited",
    title: "2021 Ford Explorer Limited",
    make: "Ford",
    model: "Explorer",
    trim: "Limited",
    year: 2021,
    price: 63800000,
    mileage: 31500,
    fuelType: "PETROL",
    transmission: "AUTOMATIC",
    bodyType: "SUV",
    color: "Carbonized Grey",
    condition: "NIGERIAN_USED",
    description:
      "Spacious seven-seat SUV with strong road presence, modern infotainment, and practical family-focused versatility.",
    location: "Lekki, Lagos",
    city: "Lagos",
    state: "Lagos",
    featured: false,
    status: "PUBLISHED",
    engine: "2.3L EcoBoost",
    drivetrain: "AWD",
    seats: 7,
    doors: 4,
    images: [
      {
        url: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1600&q=80",
        altText: "Ford Explorer exterior",
        isPrimary: true
      }
    ]
  },
  {
    slug: "2023-nissan-patrol-le",
    title: "2023 Nissan Patrol LE",
    make: "Nissan",
    model: "Patrol",
    trim: "LE",
    year: 2023,
    price: 117000000,
    mileage: 8700,
    fuelType: "PETROL",
    transmission: "AUTOMATIC",
    bodyType: "SUV",
    color: "Champagne Quartz",
    condition: "CERTIFIED_PRE_OWNED",
    description:
      "Large premium SUV with commanding V8 performance, spacious cabin, and strong appeal for executive and family travel.",
    location: "Maitama, Abuja",
    city: "Abuja",
    state: "FCT",
    featured: true,
    status: "PUBLISHED",
    engine: "5.6L V8",
    drivetrain: "4WD",
    seats: 7,
    doors: 4,
    images: [
      {
        url: "https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&w=1600&q=80",
        altText: "Nissan Patrol exterior",
        isPrimary: true
      }
    ]
  },
  {
    slug: "2022-volkswagen-tiguan-r-line",
    title: "2022 Volkswagen Tiguan R-Line",
    make: "Volkswagen",
    model: "Tiguan",
    trim: "R-Line",
    year: 2022,
    price: 52800000,
    mileage: 18700,
    fuelType: "PETROL",
    transmission: "AUTOMATIC",
    bodyType: "SUV",
    color: "Nightshade Blue",
    condition: "FOREIGN_USED",
    description:
      "European compact SUV with premium cabin treatment, digital cockpit, and a balanced mix of comfort and efficiency.",
    location: "Benin City, Edo",
    city: "Benin City",
    state: "Edo",
    featured: false,
    status: "PUBLISHED",
    engine: "2.0L Turbo",
    drivetrain: "AWD",
    seats: 5,
    doors: 4,
    images: [
      {
        url: "https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?auto=format&fit=crop&w=1600&q=80",
        altText: "Volkswagen Tiguan exterior",
        isPrimary: true
      }
    ]
  },
  {
    slug: "2023-kia-sorento-x-line",
    title: "2023 Kia Sorento X-Line",
    make: "Kia",
    model: "Sorento",
    trim: "X-Line",
    year: 2023,
    price: 61200000,
    mileage: 12400,
    fuelType: "PETROL",
    transmission: "AUTOMATIC",
    bodyType: "SUV",
    color: "Gravity Grey",
    condition: "CERTIFIED_PRE_OWNED",
    description:
      "Modern three-row SUV with upscale interior packaging, smart safety tech, and a clean premium ownership proposition.",
    location: "Uyo, Akwa Ibom",
    city: "Uyo",
    state: "Akwa Ibom",
    featured: false,
    status: "PUBLISHED",
    engine: "2.5L Turbo",
    drivetrain: "AWD",
    seats: 7,
    doors: 4,
    images: [
      {
        url: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1600&q=80",
        altText: "Kia Sorento exterior",
        isPrimary: true
      }
    ]
  }
];

export const sampleTestimonials = [
  {
    name: "Adaeze I.",
    role: "Corporate Buyer, Lagos",
    quote:
      "The shortlist was accurate, the pricing was transparent, and the team handled delivery like a proper premium operation."
  },
  {
    name: "Sola K.",
    role: "Family SUV Buyer, Abuja",
    quote:
      "I could actually trust what I was seeing on the platform. The process felt structured from inquiry to inspection."
  },
  {
    name: "Tobi A.",
    role: "Dealer Partner, Port Harcourt",
    quote:
      "This feels like the kind of marketplace dealers want to be represented on because the brand experience is credible."
  }
];
