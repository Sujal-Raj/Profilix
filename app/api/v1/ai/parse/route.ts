import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import UserModel from "@/models/user.model";
import PortfolioModel from "@/models/portfolio.model";
import { dbConnect } from "@/lib/db";
import slugify from "slugify";
import { nanoid } from "nanoid";
// or "gemini-2.5-flash" depending on availability


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    await dbConnect();


    const formData = await req.formData();
    const file = formData.get("resume") as File | null;
    const currentUser = formData.get("currentUser") as string | null;
    
    if (!file) {
      return NextResponse.json(
        { error: "Resume file is required" },
        { status: 400 }
      );
    }
    
    // Convert PDF to Uint8Array (Gemini accepts binary input)
    const bytes = new Uint8Array(await file.arrayBuffer());
    
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // const prompt = `
    //   You are an AI that extracts structured information from resumes.
    //   Extract the following fields in JSON format:
    //   {
    //     "name": string,
    //     "about": string,
    //     "skills": [string],
    //     "experience": [string],
    //     "education": [string],
    //     "projects": [string],
    //     "socialLinks": {
    //       "github": string | null,
    //       "linkedin": string | null,
    //       "twitter": string | null,
    //       "portfolio": string | null
    //     }
    //   }
    // `;

    const prompt = `
You are an AI that extracts structured information from resumes.
Extract the following fields in JSON format strictly matching this structure:

{
  "name": string,
  "title": string | null,
  "email": string | null,
  "about": string,
  "status": string | null,

  "socialLinks": {
    "github": string | null,
    "linkedin": string | null,
    "twitter": string | null
  },

  "experience": [
    {
      "role": string,
      "company": string,
      "duration": string,
      "description": string
    }
  ],

  "projects": [
    {
      "title": string,
      "description": string,
      "tech": [string],
      "link": string | null
    }
  ],

  "education": [
    {
      "degree": string,
      "school": string,
      "year": string
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
`


    // Send both prompt + file content
    let result: any;
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
    } catch (aiError: any) {
      // Return rich error for easier debugging
      return NextResponse.json(
        { error: "AI generation failed", details: aiError?.message || aiError, aiError },
        { status: 500 }
      );
    }

    // The shape of the response from the Gemini client may vary. Try multiple ways to get text.
    let text = "";
    try {
      if (result?.response && typeof result.response.text === "function") {
        text = result.response.text();
      } else if (result?.candidates && Array.isArray(result.candidates) && result.candidates[0]?.output) {
        // fallback if client returns candidates
        text = result.candidates.map((c: any) => c.output).join("\n");
      } else {
        text = JSON.stringify(result);
      }
    } catch (err) {
      text = String(result);
    }

    // Clean triple-backtick JSON blocks if present and trim
    const cleaned = String(text).replace(/```json|```/g, "").trim();
    let parsedJson: any;
    try {
      parsedJson = JSON.parse(cleaned);
    } catch (parseErr) {
      // Return the raw AI output alongside an explicit error to aid debugging on the frontend
      return NextResponse.json(
        { error: "Failed to parse AI response as JSON", raw: cleaned, rawFull: text },
        { status: 500 }
      );
    }

    // If a currentUser was provided, attempt to find and persist the portfolio to that user.
    if (currentUser) {
      const user = await UserModel.findOne({ email: currentUser });

      if (!user) {
        // Don't fail parsing if the user is not found; return parsed data for preview and let client handle sign-in/save.
        return NextResponse.json({ message: "User not found - returning parsed data for preview", portfolio: parsedJson }, { status: 200 });
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

      return NextResponse.json({ message: "Portfolio saved successfully", portfolio });
    }

    // No user provided -> return parsed JSON for frontend preview (do not save)
    return NextResponse.json({ message: "Parsed (preview)", portfolio: parsedJson }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
