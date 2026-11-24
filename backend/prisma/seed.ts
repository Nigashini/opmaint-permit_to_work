
import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import bcrypt from "bcrypt";


const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is missing in the .env file");
}

const dbUrl = new URL(databaseUrl);

const adapter = new PrismaMariaDb({
  host: dbUrl.hostname,
  port: Number(dbUrl.port || 3306),
  user: decodeURIComponent(dbUrl.username),
  password: decodeURIComponent(dbUrl.password),
  database: dbUrl.pathname.slice(1),
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting database seed...");

  const hashedPassword = await bcrypt.hash("PTW@Demo2026", 12);

  const users = [
  {
    name: "Demo Requester",
    email: "requester@opmaint.com",
    role: "REQUESTER",
  },
  {
    name: "Demo Area Owner",
    email: "areaowner@opmaint.com",
    role: "AREA_OWNER",
  },
  {
    name: "Demo Safety Officer",
    email: "safety@opmaint.com",
    role: "SAFETY_OFFICER",
  },
  {
    name: "Demo Admin",
    email: "admin@opmaint.com",
    role: "ADMIN",
  },
];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        password: hashedPassword,
        role: user.role,
      },
      create: {
        ...user,
        password: hashedPassword,
      },
    });

    console.log(`Created/updated: ${user.email}`);
  }

    console.log("Four demo users seeded successfully!");

  // Seed two plants
  const plant1 = await prisma.plant.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Chennai Manufacturing Plant",
      location: "Chennai, Tamil Nadu",
    },
  });

  const plant2 = await prisma.plant.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Coimbatore Industrial Plant",
      location: "Coimbatore, Tamil Nadu",
    },
  });

   console.log("Two demo plants seeded successfully!");

  // Seed six equipment records
  const equipmentData = [
    {
      name: "Industrial Welding Machine",
      code: "CHN-EQ-001",
      plantId: plant1.id,
    },
    {
      name: "Hydraulic Press Machine",
      code: "CHN-EQ-002",
      plantId: plant1.id,
    },
    {
      name: "Electrical Distribution Panel",
      code: "CHN-EQ-003",
      plantId: plant1.id,
    },
    {
      name: "Confined Space Storage Tank",
      code: "CBE-EQ-001",
      plantId: plant2.id,
    },
    {
      name: "Overhead Crane",
      code: "CBE-EQ-002",
      plantId: plant2.id,
    },
    {
      name: "Industrial Air Compressor",
      code: "CBE-EQ-003",
      plantId: plant2.id,
    },
  ];

  for (const equipment of equipmentData) {
    await prisma.equipment.upsert({
      where: { code: equipment.code },
      update: equipment,
      create: equipment,
    });

    console.log(`Created/updated: ${equipment.code}`);
  }

  console.log("Six equipment records seeded successfully!");


  // Fetch demo users
  const requester = await prisma.user.findUniqueOrThrow({
    where: { email: "requester@opmaint.com" },
  });

  // Fetch equipment
  const weldingMachine = await prisma.equipment.findUniqueOrThrow({
    where: { code: "CHN-EQ-001" },
  });

  const hydraulicPress = await prisma.equipment.findUniqueOrThrow({
    where: { code: "CHN-EQ-002" },
  });

  const electricalPanel = await prisma.equipment.findUniqueOrThrow({
    where: { code: "CHN-EQ-003" },
  });

  const storageTank = await prisma.equipment.findUniqueOrThrow({
    where: { code: "CBE-EQ-001" },
  });

  const overheadCrane = await prisma.equipment.findUniqueOrThrow({
    where: { code: "CBE-EQ-002" },
  });

  const airCompressor = await prisma.equipment.findUniqueOrThrow({
    where: { code: "CBE-EQ-003" },
  });

  // Prepare dates
  const now = new Date();
  const hour = 60 * 60 * 1000;
  const day = 24 * hour;

  // Seed 10 demo permits
  const permitData = [
    {
      permitNumber: "PTW-2026-001",
      title: "Welding Pipeline Repair",
      description: "Repair pipeline using industrial welding equipment.",
      type: "HOT_WORK",
      status: "DRAFT",
      plannedStart: new Date(now.getTime() + 2 * day),
      plannedEnd: new Date(now.getTime() + 3 * day),
      equipmentId: weldingMachine.id,
      plantId: plant1.id,
      workLocation: "Production Area A",
      hazards: "Fire, sparks and burns",
      precautions: "Fire extinguisher and PPE required",
      emergencyPlan: "Use fire alarm and emergency exit",
    },
    {
      permitNumber: "PTW-2026-002",
      title: "Storage Tank Inspection",
      description: "Inspect internal condition of storage tank.",
      type: "CONFINED_SPACE",
      status: "DRAFT",
      plannedStart: new Date(now.getTime() + 3 * day),
      plannedEnd: new Date(now.getTime() + 4 * day),
      equipmentId: storageTank.id,
      plantId: plant2.id,
      workLocation: "Tank Section B",
      hazards: "Low oxygen and toxic gases",
      precautions: "Gas testing and ventilation",
      emergencyPlan: "Rescue team on standby",
    },
    {
      permitNumber: "PTW-2026-003",
      title: "Electrical Panel Maintenance",
      description: "Maintenance of electrical distribution panel.",
      type: "ELECTRICAL_ISOLATION",
      status: "PENDING_APPROVAL",
      plannedStart: new Date(now.getTime() + day),
      plannedEnd: new Date(now.getTime() + 2 * day),
      equipmentId: electricalPanel.id,
      plantId: plant1.id,
      workLocation: "Electrical Room",
      hazards: "Electric shock and arc flash",
      precautions: "LOTO and insulated gloves",
      emergencyPlan: "Isolate power and contact emergency team",
    },
    {
      permitNumber: "PTW-2026-004",
      title: "Overhead Crane Inspection",
      description: "Inspect crane components and lifting mechanism.",
      type: "WORKING_AT_HEIGHT",
      status: "PENDING_APPROVAL",
      plannedStart: new Date(now.getTime() + 2 * day),
      plannedEnd: new Date(now.getTime() + 3 * day),
      equipmentId: overheadCrane.id,
      plantId: plant2.id,
      workLocation: "Crane Maintenance Bay",
      hazards: "Fall from height and falling objects",
      precautions: "Safety harness and barricading",
      emergencyPlan: "Activate rescue procedure",
    },
    {
      permitNumber: "PTW-2026-005",
      title: "Hydraulic Press Repair",
      description: "Repair hydraulic press machine.",
      type: "HOT_WORK",
      status: "APPROVED",
      plannedStart: new Date(now.getTime() + hour),
      plannedEnd: new Date(now.getTime() + day),
      equipmentId: hydraulicPress.id,
      plantId: plant1.id,
      workLocation: "Workshop Area",
      hazards: "Heat and mechanical injury",
      precautions: "PPE and equipment isolation",
      emergencyPlan: "Contact plant emergency team",
    },
    {
      permitNumber: "PTW-2026-006",
      title: "Air Compressor Maintenance",
      description: "Perform scheduled compressor maintenance.",
      type: "ELECTRICAL_ISOLATION",
      status: "ACTIVE",
      plannedStart: new Date(now.getTime() - hour),
      plannedEnd: new Date(now.getTime() + 8 * hour),
      actualStart: new Date(now.getTime() - 30 * 60 * 1000),
      equipmentId: airCompressor.id,
      plantId: plant2.id,
      workLocation: "Compressor Room",
      hazards: "Electrical and pressure hazards",
      precautions: "LOTO and pressure release",
      emergencyPlan: "Emergency shutdown procedure",
    },
    {
      permitNumber: "PTW-2026-007",
      title: "Pipeline Welding Work",
      description: "Welding work on production pipeline.",
      type: "HOT_WORK",
      status: "ACTIVE",
      plannedStart: new Date(now.getTime() - 2 * hour),
      plannedEnd: new Date(now.getTime() + 6 * hour),
      actualStart: new Date(now.getTime() - hour),
      equipmentId: weldingMachine.id,
      plantId: plant1.id,
      workLocation: "Pipeline Section C",
      hazards: "Fire and heat exposure",
      precautions: "Fire watch and protective clothing",
      emergencyPlan: "Fire suppression and evacuation",
    },
    {
      permitNumber: "PTW-2026-008",
      title: "Elevated Crane Maintenance",
      description: "Crane maintenance temporarily suspended.",
      type: "WORKING_AT_HEIGHT",
      status: "SUSPENDED",
      plannedStart: new Date(now.getTime() - 3 * hour),
      plannedEnd: new Date(now.getTime() + 6 * hour),
      actualStart: new Date(now.getTime() - 2 * hour),
      equipmentId: overheadCrane.id,
      plantId: plant2.id,
      workLocation: "Crane Maintenance Bay",
      hazards: "Fall and unstable equipment",
      precautions: "Harness and secured work platform",
      emergencyPlan: "Stop work and initiate rescue plan",
    },
    {
      permitNumber: "PTW-2026-009",
      title: "Completed Tank Inspection",
      description: "Internal storage tank inspection completed.",
      type: "CONFINED_SPACE",
      status: "CLOSED",
      plannedStart: new Date(now.getTime() - 10 * day),
      plannedEnd: new Date(now.getTime() - 9 * day),
      actualStart: new Date(now.getTime() - 10 * day),
      actualEnd: new Date(now.getTime() - 9 * day),
      equipmentId: storageTank.id,
      plantId: plant2.id,
      workLocation: "Tank Section B",
      hazards: "Low oxygen and toxic gases",
      precautions: "Gas testing and ventilation",
      emergencyPlan: "Rescue team on standby",
    },
    {
      permitNumber: "PTW-2026-010",
      title: "Electrical Maintenance Request",
      description: "Electrical maintenance request rejected due to safety concerns.",
      type: "ELECTRICAL_ISOLATION",
      status: "REJECTED",
      plannedStart: new Date(now.getTime() + 2 * day),
      plannedEnd: new Date(now.getTime() + 3 * day),
      equipmentId: electricalPanel.id,
      plantId: plant1.id,
      workLocation: "Electrical Room",
      hazards: "Electric shock",
      precautions: "LOTO procedure required",
      emergencyPlan: "Emergency isolation",
    },
  ] as const;

  for (const permit of permitData) {
    await prisma.permit.upsert({
      where: { permitNumber: permit.permitNumber },
      update: { ...permit, requesterId: requester.id },
      create: { ...permit, requesterId: requester.id },
    });

    console.log(`Created/updated permit: ${permit.permitNumber}`);
  }

  console.log("Ten demo permits seeded successfully!");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
