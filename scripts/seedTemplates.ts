import mongoose from "mongoose";
import dotenv from "dotenv";

import TemplateModel from "@/models/template.model";
import { dbConnect } from "@/lib/db";

dotenv.config();

const templates = [
  {
    name: "Original",
    slug: "original",
    price: 0,
    isFree: true,
    thumbnail: "/templates/original.png",
  },
  {
    name: "Minimal",
    slug: "minimal",
    price: 49,
    isFree: false,
    thumbnail: "/templates/minimal.png",
  },
  {
    name: "NeoBrutalism",
    slug: "neobrutalism",
    price: 99,
    isFree: false,
    thumbnail: "/templates/neobrutalism.png",
  },
  {
    name: "ClayMorphism",
    slug: "claymorphism",
    price: 49,
    isFree: false,
    thumbnail: "/templates/claymorphism.png",
  },
  {
    name: "SwissStyle",
    slug: "swissstyle",
    price: 79,
    isFree: false,
    thumbnail: "/templates/swissstyle.png",
  },
];


async function seed() {
  await dbConnect();

  await TemplateModel.deleteMany({});

  await TemplateModel.insertMany(templates);

  console.log("Templates Seeded ✅");

  process.exit();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});