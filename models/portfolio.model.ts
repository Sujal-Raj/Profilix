// import mongoose, { Document, Schema, models } from "mongoose";

// export interface IPortfolio extends Document {
//   userEmail: string; // To associate with the logged-in user
//   name: string;
//   about: string;
//   skills: string[];
//   experience: string[];
//   education: string[];
//   projects: string[];
//   socialLinks: {
//     github: string | null;
//     linkedin: string | null;
//     twitter: string | null;
//     portfolio: string | null;
//   };
//   slug:string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// const PortfolioSchema = new Schema<IPortfolio>(
//   {
//     userEmail: { type: String, required: true },
//     name: { type: String, required: true },
//     about: { type: String },
//     skills: [{ type: String }],
//     experience: [{ type: String }],
//     education: [{ type: String }],
//     projects: [{ type: String }],
//     socialLinks: {
//       github: { type: String, default: null },
//       linkedin: { type: String, default: null },
//       twitter: { type: String, default: null },
//       portfolio: { type: String, default: null },
//     },
//     slug:{
//       type:String,
//       required:true,
//     }
//   },
//   { timestamps: true }
// );

// const PortfolioModel =
//   models.Portfolio || mongoose.model<IPortfolio>("Portfolio", PortfolioSchema);

// export default PortfolioModel;



// models/Portfolio.ts

import mongoose, { Document, Schema, models } from "mongoose";

export interface IPortfolio extends Document {
  userEmail: string; // owner of the portfolio (logged-in user)
  slug: string;      // for pretty URLs, e.g. /portfolio/:slug

  // === matches your PortfolioData shape ===
  name: string;
  title: string;
  email: string;
  about: string;
  status: string;

  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };

  experience: {
    role: string;
    company: string;
    duration: string;
    description: string;
  }[];

  projects: {
    title: string;
    description: string;
    tech: string[];
    link?: string;
  }[];

  education: {
    degree: string;
    school: string;
    year: string;
  }[];

  skills: string[];
  selectedTemplate:string;

  createdAt?: Date;
  updatedAt?: Date;
}

// --- Subschemas ---

const ExperienceSchema = new Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tech: [{ type: String, required: true }],
    link: { type: String }, // optional
  },
  { _id: false }
);

const EducationSchema = new Schema(
  {
    degree: { type: String, required: true },
    school: { type: String, required: true },
    year: { type: String, required: true },
  },
  { _id: false }
);

// --- Main Portfolio schema ---

const PortfolioSchema = new Schema<IPortfolio>(
  {
    userEmail: { type: String, required: true },
    slug: { type: String, required: true, unique: true },

    name: { type: String, required: true },
    title: { type: String, required: true },
    email: { type: String, required: true },
    about: { type: String, required: true },
    status: { type: String, default: "Open to opportunities" },

    socialLinks: {
      github: { type: String },
      linkedin: { type: String },
      twitter: { type: String },
    },

    experience: [ExperienceSchema],
    projects: [ProjectSchema],
    education: [EducationSchema],

    skills: [{ type: String, required: true }],
    selectedTemplate: {
     type: String,
     default: "original",
   },
  },
  { timestamps: true }
);

const PortfolioModel =
  models.Portfolio || mongoose.model<IPortfolio>("Portfolio", PortfolioSchema);

export default PortfolioModel;
