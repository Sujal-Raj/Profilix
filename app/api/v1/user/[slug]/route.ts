import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import PortfolioModel from "@/models/portfolio.model";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> } // 👈 params is now a Promise
) {
  try {
    const { slug } = await params; // 👈 await params before using

    // Validate slug param
    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { success: false, message: "Invalid or missing slug parameter" },
        { status: 400 }
      );
    }

    // Connect to database
    await dbConnect();

    // Find portfolio by slug
    const portfolio = await PortfolioModel.findOne({ slug }).lean();

    if (!portfolio) {
      return NextResponse.json(
        { success: false, message: "Portfolio not found" },
        { status: 404 }
      );
    }

    // ✅ Successful response
    return NextResponse.json(
      { success: true, data: portfolio },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("❌ Error fetching portfolio:", error);

    if (error.name === "MongoNetworkError") {
      return NextResponse.json(
        { success: false, message: "Database connection error" },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
