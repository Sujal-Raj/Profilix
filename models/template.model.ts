// models/template.model.ts

import mongoose, { Schema, models } from "mongoose";

const TemplateSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    thumbnail: String,

    price: {
      type: Number,
      default: 0,
    },

    isFree: {
      type: Boolean,
      default: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default models.Template ||
mongoose.model("Template", TemplateSchema);