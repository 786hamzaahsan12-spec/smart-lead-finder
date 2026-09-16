import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";

export async function GET() {
  try {
    await connectDB();

    const leads = await Lead.find().sort({ score: -1 });

    return NextResponse.json(leads);
  } catch (error) {
    console.error("GET LEADS ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const lead = await Lead.create(body);

    return NextResponse.json(lead, {
      status: 201,
    });
  } catch (error) {
    console.error("POST LEAD ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create lead" },
      { status: 500 }
    );
  }
}