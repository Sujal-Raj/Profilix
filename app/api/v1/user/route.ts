import { dbConnect } from "@/lib/db";
import PortfolioModel from "@/models/portfolio.model";
import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {

    await dbConnect();
    
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email not provided" },
        { status: 400 }
      );
    }

    // const user = await UserModel.findOne({ email });
    const user = await PortfolioModel.findOne({userEmail:email})

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User found", user },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: String(error) },
      { status: 500 }
    );
  }
}
