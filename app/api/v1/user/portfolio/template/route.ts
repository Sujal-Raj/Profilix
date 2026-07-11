import PortfolioModel from "@/models/portfolio.model";
import TemplateModel from "@/models/template.model";
import PurchasedTemplateModel from "@/models/purchasedTemplate.model";
import { NextRequest, NextResponse } from "next/server";
import {dbConnect} from "@/lib/db"; 
import { auth, currentUser } from "@clerk/nextjs/server";


export async function PATCH(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await currentUser();

    if (!user?.primaryEmailAddress?.emailAddress) {
      return NextResponse.json(
        { success: false, message: "User email not found" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { template } = body;

    if (!template || typeof template !== "string") {
      return NextResponse.json(
        { success: false, message: "Invalid template value" },
        { status: 400 }
      );
    }

    const VALID_TEMPLATES = ["original", "minimal", "neobrutalism", "claymorphism", "swissstyle"];

    if (!VALID_TEMPLATES.includes(template)) {
      return NextResponse.json(
        { success: false, message: `Unknown template: ${template}` },
        { status: 400 }
      );
    }

    await dbConnect();

    const templateDoc = await TemplateModel.findOne({ slug: template });
    if (!templateDoc) {
      return NextResponse.json(
        { success: false, message: "Template not found" },
        { status: 404 }
      );
    }

    if (!templateDoc.isFree) {
      const purchase = await PurchasedTemplateModel.findOne({
        userEmail: user.primaryEmailAddress.emailAddress,
        templateSlug: template,
        status: "SUCCESS",
      });

      if (!purchase) {
        return NextResponse.json(
          { success: false, message: "You need to purchase this template before using it" },
          { status: 403 }
        );
      }
    }

    const portfolio = await PortfolioModel.findOneAndUpdate(
      {
        userEmail: user.primaryEmailAddress.emailAddress,
      },
      {
        selectedTemplate: template,
      },
      {
        new: true,
      }
    );

    if (!portfolio) {
      return NextResponse.json(
        { success: false, message: "Portfolio not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Template updated successfully",
      selectedTemplate: portfolio.selectedTemplate,
    });
  } catch (error) {
    console.error("Update template error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}