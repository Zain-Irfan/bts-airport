import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import bcrypt from "bcryptjs";

const url = process.env.DATABASE_URL || "mysql://root:@localhost:3306/ukride";
const parsed = new URL(url.replace("mysql://", "http://"));

const adapter = new PrismaMariaDb({
  host: parsed.hostname,
  port: parseInt(parsed.port || "3306"),
  user: parsed.username || "root",
  password: parsed.password || undefined,
  database: parsed.pathname.slice(1),
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

/** Display labels for known category slugs; anything else gets title-cased from the slug. */
const CATEGORY_LABELS: Record<string, string> = {
  saloon: "Saloon",
  executive: "Executive",
  estate: "Estate",
  mpv: "MPV",
  eight_seater: "8 Seater",
  chauffeur: "Chauffeur",
  electric: "Electric",
};

function labelForCategorySlug(slug: string): string {
  if (CATEGORY_LABELS[slug]) return CATEGORY_LABELS[slug];
  return slug
    .split("_")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

/** Ensures a VehicleCategory row exists for every categoryKey used by vehicle types (no manual admin step). */
async function ensureCategoriesFromVehicleTypes() {
  const grouped = await prisma.vehicleType.groupBy({
    by: ["categoryKey"],
  });
  for (const row of grouped) {
    const slug = row.categoryKey;
    await prisma.vehicleCategory.upsert({
      where: { slug },
      create: { slug, label: labelForCategorySlug(slug), isActive: true },
      update: {},
    });
  }
}

async function main() {
  const existing = await prisma.user.findUnique({
    where: { email: "admin@bts.com" },
  });

  if (!existing) {
    const hashed = await bcrypt.hash("admin123", 12);

    await prisma.user.create({
      data: {
        name: "Super Admin",
        email: "admin@bts.com",
        password: hashed,
        role: "ADMIN",
        status: "ACTIVE",
      },
    });

    console.log("Admin user created: admin@bts.com / admin123");
  } else {
    console.log("Admin user already exists.");
  }

  const vehicleSeeds = [
    {
      slug: "saloon",
      name: "Saloon",
      subtitle: "Saloon — Sedan",
      imageUrl: "/saloon.jpg",
      maxPassengers: 4,
      maxHandLuggage: 1,
      maxSuitcases: 2,
      baseFareGbp: "18",
      perMileGbp: "1.25",
      minimumFareGbp: "42",
      promoDiscountPercent: "5",
      categoryKey: "saloon",
    },
    {
      slug: "executive",
      name: "Executive",
      subtitle: "Executive saloon",
      imageUrl: "/executive.jpg",
      maxPassengers: 4,
      maxHandLuggage: 1,
      maxSuitcases: 1,
      baseFareGbp: "28",
      perMileGbp: "1.55",
      minimumFareGbp: "55",
      promoDiscountPercent: "5",
      categoryKey: "executive",
    },
    {
      slug: "estate",
      name: "Estate",
      subtitle: "Estate — extra luggage",
      imageUrl: "/estate.jpg",
      maxPassengers: 4,
      maxHandLuggage: 2,
      maxSuitcases: 3,
      baseFareGbp: "22",
      perMileGbp: "1.35",
      minimumFareGbp: "48",
      promoDiscountPercent: "5",
      categoryKey: "estate",
    },
    {
      slug: "mpv",
      name: "MPV",
      subtitle: "People carrier",
      imageUrl: "/mpv.jpg",
      maxPassengers: 6,
      maxHandLuggage: 3,
      maxSuitcases: 4,
      baseFareGbp: "32",
      perMileGbp: "1.65",
      minimumFareGbp: "62",
      promoDiscountPercent: "5",
      categoryKey: "mpv",
    },
    {
      slug: "eight-seater",
      name: "8 Seater",
      subtitle: "Minibus",
      imageUrl: "/mpv.jpg",
      maxPassengers: 8,
      maxHandLuggage: 4,
      maxSuitcases: 6,
      baseFareGbp: "45",
      perMileGbp: "1.95",
      minimumFareGbp: "85",
      promoDiscountPercent: "5",
      categoryKey: "eight_seater",
    },
    {
      slug: "chauffeur",
      name: "Chauffeur",
      subtitle: "Chauffeur service",
      imageUrl: "/chauffeur.jpg",
      maxPassengers: 4,
      maxHandLuggage: 1,
      maxSuitcases: 2,
      baseFareGbp: "55",
      perMileGbp: "2.2",
      minimumFareGbp: "95",
      promoDiscountPercent: "0",
      categoryKey: "chauffeur",
    },
    {
      slug: "electric",
      name: "Electric",
      subtitle: "Eco-friendly EV",
      imageUrl: "/saloon.jpg",
      maxPassengers: 4,
      maxHandLuggage: 2,
      maxSuitcases: 1,
      baseFareGbp: "24",
      perMileGbp: "1.4",
      minimumFareGbp: "48",
      promoDiscountPercent: "5",
      categoryKey: "electric",
    },
  ];

  for (const v of vehicleSeeds) {
    const { slug, ...rest } = v;
    await prisma.vehicleType.upsert({
      where: { slug },
      create: { slug, ...rest, isActive: true },
      update: { ...rest },
    });
  }
  console.log("Vehicle types seeded (upsert by slug).");

  await ensureCategoriesFromVehicleTypes();
  console.log("Vehicle categories synced from vehicle types (upsert by slug).");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
