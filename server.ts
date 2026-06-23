import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { getSupabaseClient } from "./src/supabaseServer";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory fallback dataset for active grievances when Supabase credentials or tables are not fully provisioned
const memoryGrievances: any[] = [
  {
    id: "fallback-initial-ticket",
    category: "IT & Infrastructure",
    subject: "Classroom 405 Wi-Fi Connection Latency",
    description: "The digital projection node and student connection links frequently timeout during active lab sessions.",
    student_name: "Vedant Saxena",
    enrollment_no: "BTIO25O1142",
    status: "In Progress",
    created_at: new Date(Date.now() - 48200000).toISOString()
  }
];

// Supabase Connection Diagnostics / Setup Help endpoint
app.get("/api/supabase/status", (req, res) => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const configured = !!(url && key);

  res.json({
    configured,
    url: url ? url.replace(/(https?:\/\/)(.*)/i, "$1*****.$2") : null,
    requiredSchemaSql: `
create table grievances (
  id text primary key,
  category text not null,
  subject text not null,
  description text not null,
  student_name text,
  enrollment_no text,
  status text default 'Pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
    `.trim(),
    message: configured
      ? "Supabase configurations are bound to the backend container."
      : "Supabase configuration variables (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY) are missing. Serving with elegant in-memory fallback mode."
  });
});

// Retrieve Grievances (Supabase Table API or Memory Fallback)
app.get("/api/grievances", async (req, res) => {
  try {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (url && key) {
      const db = getSupabaseClient();
      const { data, error } = await db
        .from("grievances")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return res.json(data);
      }
      
      console.warn(
        "Supabase query warning (ensure 'grievances' table exists in Supabase panel):",
        error?.message || "unknown table structure error"
      );
    }
  } catch (err: any) {
    console.error("Internal Supabase resolution caught exception:", err.message);
  }
  // Safe high-contrast fallback
  res.json(memoryGrievances);
});

// Create Grievance Ticket
app.post("/api/grievances", async (req, res) => {
  try {
    const { category, subject, description, studentName, enrollmentNo } = req.body;

    if (!category || !subject || !description) {
      return res.status(400).json({ error: "Missing required grievance feedback parameters." });
    }

    const ticket = {
      id: `ticket-${Date.now()}`,
      category,
      subject,
      description,
      student_name: studentName || "Vedant Saxena",
      enrollment_no: enrollmentNo || "BTIO25O1142",
      status: "Pending",
      created_at: new Date().toISOString()
    };

    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (url && key) {
      const db = getSupabaseClient();
      const { data, error } = await db
        .from("grievances")
        .insert([ticket])
        .select();

      if (!error && data) {
        return res.json({ success: true, data: data[0] });
      }

      console.warn(
        "Supabase insertion failed or query error. Serving via in-memory buffer.",
        error?.message
      );
    }

    // fallback persistence in server memory
    memoryGrievances.unshift(ticket);
    return res.json({ 
      success: true, 
      data: ticket, 
      fallback: true,
      message: "Ticket registered in localized in-memory buffer on the academic server." 
    });
  } catch (err: any) {
    console.error("Catch handler during grievance register:", err);
    res.status(500).json({ error: "Internal processing failed during grievance report compilation." });
  }
});

// Initialize Gemini client with standard telemetry User-Agent header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API endpoint to analyze grades, syllabus, list of marks, and assignment completion to estimate the CGPA
app.post("/api/predict-cgpa", async (req, res) => {
  try {
    const { student, syllabus, results, currentMarks, assignments } = req.body;

    const prompt = `
You are an expert academic advisor for a student studying under a university system. Analyze the student's academic history, current semester estimated marks, and assignment completion status to project their academic profile, strengths, milestones, areas of improvement, and detailed recommendations for the next semester.

Student Information:
${JSON.stringify(student, null, 2)}

Syllabus / Credit-bearing Courses in Current Semester:
${JSON.stringify(syllabus, null, 2)}

Past Semester SGPA Performance History:
${JSON.stringify(results, null, 2)}

Current Live Marks Estimated by user (0-100 scale, if empty/missing for any subject, default to 85 marks which represents an 'A' grade):
${JSON.stringify(currentMarks, null, 2)}

Assignments List & Status Tracker:
${JSON.stringify(assignments, null, 2)}

Objectives:
1. Assess academic trends: Sem 1 SGPA is 8.12, Sem 2 SGPA is 8.45. Observe if the trajectory is positive, and how current marks might affect progress.
2. Predict the Upcoming Semester's (Semester 4) SGPA based on their past and current trend.
3. Compute and provide a projected overall Cumulative Grade Point Average (CGPA) after the upcoming semester (Semester 4).
4. Outline 3 specific high-impact student strengths (linked to courses, labs, projects or submission pacing).
5. Outline 2 areas for academic improvement (weaknesses).
6. Provide a set of 4 tailored actionable tips/guidelines to hit or exceed this target.

Return the response in a structured JSON schema. The "predictedSgpa" and "predictedCgpa" fields MUST be valid numbers (not strings).
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            predictedSgpa: {
              type: Type.NUMBER,
              description: "Expected SGPA for the future upcoming semester (Semester 4), e.g. 8.70"
            },
            predictedCgpa: {
              type: Type.NUMBER,
              description: "Estimated overall Cumulative Grade Point Average (CGPA) after the predicted upcoming semester, e.g. 8.42"
            },
            trendAnalysis: {
              type: Type.STRING,
              description: "An encouraging but realistic narrative of the student's academic progress trend and overall stance."
            },
            strengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A list of 3 key student highlights based on their profile and data."
            },
            weaknesses: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A list of 2 key developmental opportunities or risk elements."
            },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A list of 4 specific study techniques, goals, or schedule optimizations to reach the target."
            }
          },
          required: ["predictedSgpa", "predictedCgpa", "trendAnalysis", "strengths", "weaknesses", "recommendations"]
        }
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("No response text returned from Gemini API");
    }

    res.json(JSON.parse(responseText.trim()));
  } catch (err: any) {
    console.error("Error predicting CGPA projection with Gemini:", err);
    res.status(500).json({ error: err.message || "An unexpected error occurred during prediction." });
  }
});

// Vite Middleware/Static routing configuration
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

start();
