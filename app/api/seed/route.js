import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";

const initialLeads = [
  {
    company: "TechNova Solutions",
    industry: "Software",
    location: "Lahore",
    employees: 45,
    contact: "Ali Khan",
    email: "ali@technova.com",
    score: 92,
    status: "Qualified",
    verified: true,
    source: "LinkedIn",
  },
  {
    company: "PakTech Innovations",
    industry: "Technology",
    location: "Islamabad",
    employees: 80,
    contact: "Usman Ahmed",
    email: "usman@paktech.com",
    score: 88,
    status: "Qualified",
    verified: true,
    source: "LinkedIn",
  },
  {
    company: "Digital Growth Agency",
    industry: "Marketing",
    location: "Karachi",
    employees: 25,
    contact: "Hassan Raza",
    email: "hassan@digitalgrowth.com",
    score: 81,
    status: "New",
    verified: true,
    source: "Website",
  },
  {
    company: "CloudWorks",
    industry: "Software",
    location: "Lahore",
    employees: 120,
    contact: "Ahmed Saeed",
    email: "ahmed@cloudworks.com",
    score: 95,
    status: "Qualified",
    verified: true,
    source: "LinkedIn",
  },
  {
    company: "Startup Hub",
    industry: "Technology",
    location: "Islamabad",
    employees: 35,
    contact: "Bilal Khan",
    email: "bilal@startuphub.com",
    score: 76,
    status: "New",
    verified: true,
    source: "Website",
  },
  {
    company: "Creative Minds",
    industry: "Design",
    location: "Karachi",
    employees: 18,
    contact: "Hamza Ali",
    email: "hamza@creativeminds.com",
    score: 72,
    status: "New",
    verified: true,
    source: "Manual",
  },
  {
    company: "FinTech Pakistan",
    industry: "Finance",
    location: "Lahore",
    employees: 65,
    contact: "Saad Malik",
    email: "saad@fintechpak.com",
    score: 90,
    status: "Qualified",
    verified: true,
    source: "LinkedIn",
  },
  {
    company: "Ecom Experts",
    industry: "E-commerce",
    location: "Multan",
    employees: 30,
    contact: "Usman Malik",
    email: "usman@ecomexperts.com",
    score: 79,
    status: "New",
    verified: true,
    source: "Website",
  },
];

export async function POST() {
  try {
    await connectDB();

    await Lead.deleteMany({});

    const leads = await Lead.insertMany(initialLeads);

    return NextResponse.json({
      message: "Leads seeded successfully",
      count: leads.length,
    });
  } catch (error) {
    console.error("SEED ERROR:", error);

    return NextResponse.json(
      { error: "Failed to seed leads" },
      { status: 500 }
    );
  }
}