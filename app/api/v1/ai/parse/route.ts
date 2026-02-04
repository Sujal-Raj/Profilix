export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import {
  GoogleGenerativeAI,
  GenerateContentResult,
} from "@google/generative-ai";
import UserModel from "@/models/user.model";
import PortfolioModel from "@/models/portfolio.model";
import { dbConnect } from "@/lib/db";
import slugify from "slugify";
import { nanoid } from "nanoid";
import { Buffer } from "buffer";

/* ---------------------------------- TYPES --------------------------------- */

type AIError = {
  message?: string;
  name?: string;
  status?: number;
};

type ParsedResume = {
  name: string;
  title: string | null;
  email: string | null;
  about: string;
  status: string | null;

  socialLinks: {
    github: string | null;
    linkedin: string | null;
    twitter: string | null;
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
    link: string | null;
  }[];

  education: {
    degree: string;
    school: string;
    year: string;
  }[];

  skills: string[];
};

/* -------------------------------------------------------------------------- */

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const formData = await req.formData();
    const file = formData.get("resume");
    const currentUser = formData.get("currentUser");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Resume file is required" },
        { status: 400 }
      );
    }

    const bytes = new Uint8Array(await file.arrayBuffer());
    console.log("Got resume file, size:", bytes.length);

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are an AI that extracts structured information from resumes.
Extract the following fields in JSON format strictly matching this structure:

{
  "name": string,
  "title": string | null,
  "email": string | null,
  "about": string | null,
  "status": string | null,

  "socialLinks": {
    "github": string | null,
    "linkedin": string | null,
    "twitter": string | null
  },

  "experience": [
    {
      "role": string | null,
      "company": string | null,
      "duration": string | null,
      "description": string | null
    }
  ],

  "projects": [
    {
      "title": string | null,
      "description": string | null,
      "tech": [string],
      "link": string | null
    }
  ],

  "education": [
    {
      "degree": string | null,
      "school": string | null,
      "year": string | null
    }
  ],

  "skills": [string]
}

Notes for extraction:
- Use null for missing fields.
- Convert paragraphs into clean sentences.
- Extract only real skills & technologies.
- Duration should be in readable form (e.g., "2020 - 2022").
- If project technologies are not listed, infer reasonable tech based on context.
- If multiple emails or links appear, choose the most professional.
`;

    let result: GenerateContentResult;

    try {
      result = await model.generateContent([
        { text: prompt },
        {
          inlineData: {
            data: Buffer.from(bytes).toString("base64"),
            mimeType: "application/pdf",
          },
        },
      ]);
    } catch (error: unknown) {
      const err = error as AIError;

      console.error("AI generation failed:", err);
      return NextResponse.json(
        {
          error: "AI generation failed",
          details: err?.message || String(err),
          name: err?.name,
          status: err?.status,
        },
        { status: 500 }
      );
    }

    let text = "";

    try {
      if (
        result.response &&
        typeof result.response.text === "function"
      ) {
        text = result.response.text();
      } else {
        text = JSON.stringify(result);
      }
    } catch (error) {
      console.error("Error reading Gemini response:", error);
      text = String(result);
    }

    const cleaned = text.replace(/```json|```/g, "").trim();

    let parsedJson: ParsedResume;

    try {
      parsedJson = JSON.parse(cleaned) as ParsedResume;
    } catch (error) {
      console.error("Failed to parse AI response as JSON", error, cleaned);
      return NextResponse.json(
        {
          error: "Failed to parse AI response as JSON",
          raw: cleaned,
          rawFull: text,
        },
        { status: 500 }
      );
    }

    if (typeof currentUser === "string") {
      const user = await UserModel.findOne({ email: currentUser });

      if (!user) {
        return NextResponse.json(
          {
            message: "User not found - returning parsed data for preview",
            portfolio: parsedJson,
          },
          { status: 200 }
        );
      }

      const name = user.name || parsedJson.name || "portfolio";
      const baseSlug = slugify(name, { lower: true });
      let slug = baseSlug;

      const existing = await PortfolioModel.findOne({ slug });
      if (existing) {
        slug = `${baseSlug}-${nanoid(4)}`;
      }

      const portfolio = new PortfolioModel({
        userEmail: currentUser,
        ...parsedJson,
        slug,
      });

      await portfolio.save();

      user.portfolio = portfolio._id;
      await user.save();

      return NextResponse.json(
        { message: "Portfolio saved successfully", portfolio },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Parsed (preview)", portfolio: parsedJson },
      { status: 200 }
    );
  } catch (error: unknown) {
    const err = error as Error;

    console.error("Unhandled error in resume route:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
