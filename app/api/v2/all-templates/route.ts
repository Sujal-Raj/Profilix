import { dbConnect } from "@/lib/db";
import templateModel from "@/models/template.model";
import PurchasedTemplateModel from "@/models/purchasedTemplate.model";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const templates = await templateModel.find({ isActive: true }).lean();
    const { userId } = await auth();
    const user = userId ? await currentUser() : null;

    let purchasedSlugs = new Set<string>();

    if (user?.primaryEmailAddress?.emailAddress) {
      const purchases = await PurchasedTemplateModel.find({
        userEmail: user.primaryEmailAddress.emailAddress,
        status: "SUCCESS",
      }).lean();

      purchasedSlugs = new Set(purchases.map((purchase) => purchase.templateSlug).filter(Boolean));
    }

    const payload = templates.map((template) => ({
      ...template,
      isPurchased: purchasedSlugs.has(template.slug),
      isAccessible: template.isFree || purchasedSlugs.has(template.slug),
    }));

    return NextResponse.json({
      status: 200,
      message: "All template fetched",
      data: payload,
    });
  } catch (error) {
    console.error("Template fetch error:", error);
    return NextResponse.json({ status: 500, message: "Error fetching templates" }, { status: 500 });
  }
}