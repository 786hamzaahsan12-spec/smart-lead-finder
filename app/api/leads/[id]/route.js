import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";

export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedLead) {
      return NextResponse.json(
        { message: "Lead not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedLead);
  } catch (error) {
    console.error("PUT Lead Error:", error);

    return NextResponse.json(
      {
        message: "Failed to update lead",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const deletedLead = await Lead.findByIdAndDelete(id);

    if (!deletedLead) {
      return NextResponse.json(
        { message: "Lead not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Lead deleted successfully",
    });
  } catch (error) {
    console.error("DELETE Lead Error:", error);

    return NextResponse.json(
      {
        message: "Failed to delete lead",
        error: error.message,
      },
      { status: 500 }
    );
  }
}