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

import { jsonrepair } from "jsonrepair";

/* -------------------------------------------------------------------------- */

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

/* -------------------------------------------------------------------------- */

type ParsedResume = {
  name: string | null;
  title: string | null;
  email: string | null;
  phone: string | null;
  about: string | null;
  status: string | null;

  socialLinks: {
    github: string | null;
    linkedin: string | null;
    twitter: string | null;
  };

  experience: {
    role: string | null;
    company: string | null;
    duration: string | null;
    description: string | null;
  }[];

  projects: {
    title: string | null;
    description: string | null;
    tech: string[];
    link: string | null;
  }[];

  education: {
    degree: string | null;
    school: string | null;
    year: string | null;
  }[];

  skills: string[];
};

/* -------------------------------------------------------------------------- */
/*                               FALLBACK DATA                                */
/* -------------------------------------------------------------------------- */

function extractFallbackData(text: string) {
  const email =
    text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || null;

  const phone =
    text.match(
      /(\+?\d{1,3}[-.\s]?)?(\(?\d{3,5}\)?[-.\s]?)?\d{3,5}[-.\s]?\d{4}/
    )?.[0] || null;

  const linkedin =
    text.match(/https?:\/\/(www\.)?linkedin\.com\/[^\s]+/i)?.[0] || null;

  const github =
    text.match(/https?:\/\/(www\.)?github\.com\/[^\s]+/i)?.[0] || null;

  const twitter =
    text.match(/https?:\/\/(www\.)?(twitter|x)\.com\/[^\s]+/i)?.[0] || null;

  // crude name detection
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  let name: string | null = null;

  for (const line of lines.slice(0, 10)) {
    if (
      line.length > 2 &&
      line.length < 50 &&
      /^[A-Za-z\s]+$/.test(line)
    ) {
      name = line;
      break;
    }
  }

  return {
    name,
    email,
    phone,
    socialLinks: {
      github,
      linkedin,
      twitter,
    },
  };
}

/* -------------------------------------------------------------------------- */
/*                             SAFE NORMALIZATION                             */
/* -------------------------------------------------------------------------- */

// function normalizeResume(data: Record<string, unknown>): ParsedResume {
//   return {
//     name: data?.name || null,
//     title: data?.title || null,
//     email: data?.email || null,
//     phone: data?.phone || null,
//     about: data?.about || null,
//     status: data?.status || null,

//     socialLinks: {
//       github: data?.socialLinks?.github || null,
//       linkedin: data?.socialLinks?.linkedin || null,
//       twitter: data?.socialLinks?.twitter || null,
//     },

//     experience: Array.isArray(data?.experience)
//       ? data.experience.map((e: {
//             role?: string;
//             company?: string;
//             duration?: string;
//             description?: string;
//           }) => ({
//           role: e?.role || null,
//           company: e?.company || null,
//           duration: e?.duration || null,
//           description: e?.description || null,
//         }))
//       : [],

//     projects: Array.isArray(data?.projects)
//       ? data.projects.map((p: any) => ({
//           title: p?.title || null,
//           description: p?.description || null,
//           tech: Array.isArray(p?.tech) ? p.tech : [],
//           link: p?.link || null,
//         }))
//       : [],

//     education: Array.isArray(data?.education)
//       ? data.education.map((e: any) => ({
//           degree: e?.degree || null,
//           school: e?.school || null,
//           year: e?.year || null,
//         }))
//       : [],

//     skills: Array.isArray(data?.skills)
//       ? [...new Set(data.skills.filter((s: any) => typeof s === 'string'))] as string[]
//       : [],
//   };
// }

function normalizeResume(
  data: Record<string, unknown>
): ParsedResume {
  const safeData = data as {
    name?: string;
    title?: string;
    email?: string;
    phone?: string;
    about?: string;
    status?: string;

    socialLinks?: {
      github?: string;
      linkedin?: string;
      twitter?: string;
    };

    experience?: {
      role?: string;
      company?: string;
      duration?: string;
      description?: string;
    }[];

    projects?: {
      title?: string;
      description?: string;
      tech?: string[];
      link?: string;
    }[];

    education?: {
      degree?: string;
      school?: string;
      year?: string;
    }[];

    skills?: unknown[];
  };

  return {
    name: safeData.name || null,
    title: safeData.title || null,
    email: safeData.email || null,
    phone: safeData.phone || null,
    about: safeData.about || null,
    status: safeData.status || null,

    socialLinks: {
      github: safeData.socialLinks?.github || null,
      linkedin: safeData.socialLinks?.linkedin || null,
      twitter: safeData.socialLinks?.twitter || null,
    },

    experience: Array.isArray(safeData.experience)
      ? safeData.experience.map(
          (e: {
            role?: string;
            company?: string;
            duration?: string;
            description?: string;
          }) => ({
            role: e.role || null,
            company: e.company || null,
            duration: e.duration || null,
            description: e.description || null,
          })
        )
      : [],

    projects: Array.isArray(safeData.projects)
      ? safeData.projects.map(
          (p: {
            title?: string;
            description?: string;
            tech?: string[];
            link?: string;
          }) => ({
            title: p.title || null,
            description: p.description || null,
            tech: Array.isArray(p.tech) ? p.tech : [],
            link: p.link || null,
          })
        )
      : [],

    education: Array.isArray(safeData.education)
      ? safeData.education.map(
          (e: {
            degree?: string;
            school?: string;
            year?: string;
          }) => ({
            degree: e.degree || null,
            school: e.school || null,
            year: e.year || null,
          })
        )
      : [],

    skills: Array.isArray(safeData.skills)
      ? [
          ...new Set(
            safeData.skills.filter(
              (s: unknown): s is string =>
                typeof s === "string"
            )
          ),
        ]
      : [],
  };
}


/* -------------------------------------------------------------------------- */

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

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an AI resume parser designed for highly unreliable and diverse resume formats.

CRITICAL RULES:
- NEVER fail
- ALWAYS return valid JSON
- NEVER omit keys
- Use null for missing values
- Use [] for missing arrays
- Extract ANY identifiable information possible
- At minimum try to extract:
  - name
  - email
  - phone
  - links

STRICT JSON ONLY.

Schema:

{
  "name": string | null,
  "title": string | null,
  "email": string | null,
  "phone": string | null,
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
`;

    let text = "";

    try {
      const result: GenerateContentResult =
        await model.generateContent([
          { text: prompt },
          {
            inlineData: {
              data: Buffer.from(bytes).toString("base64"),
              mimeType: file.type || "application/pdf",
            },
          },
        ]);

      text = result.response.text();
    } catch (err) {
      console.error("Gemini failed:", err);
    }

    /* ---------------------------------------------------------------------- */
    /*                             CLEAN AI OUTPUT                            */
    /* ---------------------------------------------------------------------- */

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // let parsed: any = null;
     let parsed: Record<string, any> | null = null;

    try {
      parsed = JSON.parse(cleaned);
    } catch {
      try {
        parsed = JSON.parse(jsonrepair(cleaned));
      } catch {
        parsed = null;
      }
    }

    /* ---------------------------------------------------------------------- */
    /*                          FALLBACK EXTRACTION                           */
    /* ---------------------------------------------------------------------- */

    const rawText = cleaned || text;

    const fallback = extractFallbackData(rawText);

    const merged = {
      ...parsed,

      name: parsed?.name || fallback.name,
      email: parsed?.email || fallback.email,
      phone: parsed?.phone || fallback.phone,

      socialLinks: {
        github:
          parsed?.socialLinks?.github ||
          fallback.socialLinks.github,

        linkedin:
          parsed?.socialLinks?.linkedin ||
          fallback.socialLinks.linkedin,

        twitter:
          parsed?.socialLinks?.twitter ||
          fallback.socialLinks.twitter,
      },
    };

    const parsedJson = normalizeResume(merged);

    /* ---------------------------------------------------------------------- */
    /*                           LAST SAFETY CHECK                            */
    /* ---------------------------------------------------------------------- */

    if (
      !parsedJson.name &&
      !parsedJson.email &&
      !parsedJson.phone
    ) {
      return NextResponse.json(
        {
          error:
            "Could not extract meaningful data from resume",
        },
        { status: 422 }
      );
    }

    /* ---------------------------------------------------------------------- */
    /*                               SAVE LOGIC                               */
    /* ---------------------------------------------------------------------- */

    if (typeof currentUser === "string") {
      const user = await UserModel.findOne({
        email: currentUser,
      });

      if (!user) {
        return NextResponse.json(
          {
            message:
              "User not found - returning preview",
            portfolio: parsedJson,
          },
          { status: 200 }
        );
      }

      const name =
        user.name || parsedJson.name || "portfolio";

      const baseSlug = slugify(name, {
        lower: true,
      });

      let slug = baseSlug;

      const existing = await PortfolioModel.findOne({
        slug,
      });

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
        {
          message: "Portfolio saved successfully",
          portfolio,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message: "Resume parsed successfully",
        portfolio: parsedJson,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Internal server error";
    console.error(error);

    return NextResponse.json(
      {
        error: message || "Internal server error",
      },
      { status: 500 }
    );
  }
}