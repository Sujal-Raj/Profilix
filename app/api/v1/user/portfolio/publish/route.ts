import PortfolioModel from "@/models/portfolio.model";
import { NextRequest, NextResponse } from "next/server";
import {dbConnect} from "@/lib/db"; 

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { slug } = body;

    if (!slug) {
      return NextResponse.json(
        { message: "Slug is required" },
        { status: 400 }
      );
    }

    const updatedPortfolio = await PortfolioModel.findOneAndUpdate(
      { slug },
      body,
      {
        new: true,
        upsert: true,    
        runValidators: true,
      }
    );

    return NextResponse.json(
      {
        message: "Portfolio saved",
        slug: updatedPortfolio.slug,
        portfolio: updatedPortfolio,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

