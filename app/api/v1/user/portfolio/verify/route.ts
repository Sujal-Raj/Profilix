import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { dbConnect } from "@/lib/db";
import PurchasedTemplateModel from "@/models/purchasedTemplate.model";

const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ success: false, message: "Missing payment details" }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET || "")
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const expectedBuffer = Buffer.from(expectedSignature);
    const actualBuffer = Buffer.from(razorpay_signature);

    const isValid = expectedBuffer.length === actualBuffer.length
      ? crypto.timingSafeEqual(expectedBuffer, actualBuffer)
      : false;

    if (!isValid) {
      return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 400 });
    }

    await dbConnect();

    const purchase = await PurchasedTemplateModel.findOneAndUpdate(
      { orderId: razorpay_order_id },
      {
        paymentId: razorpay_payment_id,
        status: "SUCCESS",
      },
      { new: true }
    );

    if (!purchase) {
      return NextResponse.json({ success: false, message: "Purchase record not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Payment verified", purchase });
  } catch (error) {
    console.error("Verify payment error:", error);
    return NextResponse.json({ success: false, message: "Payment verification failed" }, { status: 500 });
  }
}
