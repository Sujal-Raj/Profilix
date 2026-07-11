import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import Razorpay from "razorpay";
import { dbConnect } from "@/lib/db";
import TemplateModel from "@/models/template.model";
import PurchasedTemplateModel from "@/models/purchasedTemplate.model";

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

const razorpay = RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET
  ? new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET })
  : null;

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const user = await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    if (!userEmail) {
      return NextResponse.json({ success: false, message: "User email not found" }, { status: 400 });
    }

    const body = await req.json();
    const { templateSlug } = body;

    if (!templateSlug || typeof templateSlug !== "string") {
      return NextResponse.json({ success: false, message: "Invalid template slug" }, { status: 400 });
    }

    await dbConnect();

    const template = await TemplateModel.findOne({ slug: templateSlug, isActive: true });
    if (!template) {
      return NextResponse.json({ success: false, message: "Template not found" }, { status: 404 });
    }

    if (template.isFree) {
      return NextResponse.json({ success: true, message: "Template is free", orderId: null });
    }

    const existingPurchase = await PurchasedTemplateModel.findOne({
      userEmail,
      templateSlug,
      status: "SUCCESS",
    });

    if (existingPurchase) {
      return NextResponse.json({ success: true, message: "Already purchased", orderId: null });
    }

    if (!razorpay) {
      return NextResponse.json({ success: false, message: "Razorpay is not configured" }, { status: 500 });
    }

    // const options = {
    //   amount: Math.round(template.price * 100),
    //   currency: "INR",
    //   receipt: `${userId}-${templateSlug}-${Date.now()}`,
    //   notes: {
    //     userEmail,
    //     templateSlug,
    //   },
    // };

    const options = {
  amount: Math.round(template.price * 100),
  currency: "INR",
  receipt: `order_${Date.now()}`,
  notes: {
    userEmail,
    userId,
    templateSlug,
  },
};

    const order = await razorpay.orders.create(options);

    await PurchasedTemplateModel.create({
      userEmail,
      template: template._id,
      templateSlug,
      orderId: order.id,
      amount: template.price,
      status: "PENDING",
    });

    return NextResponse.json({ success: true, order, userEmail });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ success: false, message: "Checkout failed" }, { status: 500 });
  }
}
