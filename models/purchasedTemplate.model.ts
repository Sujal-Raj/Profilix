import mongoose, { Schema, models } from "mongoose";

const PurchasedTemplateSchema = new Schema(
  {
    userEmail: {
      type: String,
      required: true,
      index: true,
    },

    template: {
      type: Schema.Types.ObjectId,
      ref: "Template",
      required: true,
    },

    templateSlug: {
      type: String,
      required: true,
      index: true,
    },

    orderId: String,
    paymentId: String,
    amount: Number,

    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

export default models.PurchasedTemplate || mongoose.model("PurchasedTemplate", PurchasedTemplateSchema);