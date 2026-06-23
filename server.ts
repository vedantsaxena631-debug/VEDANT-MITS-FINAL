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

// In-memory fallback dataset for study materials
const memoryMaterials: any[] = [
  { id: "mat-1", title: 'Chapter 1: Intro to Operating Systems', course: 'CS302', type: 'PDF', date: 'Oct 20, 2026', size: '2.4 MB', description: 'Core slide deck covering Kernel architectures.' },
  { id: "mat-2", title: 'Process Scheduling Algorithms', course: 'CS302', type: 'PPT', date: 'Oct 22, 2026', size: '5.1 MB', description: 'Interactive visual decks for FCFS/SJF/Priority.' },
  { id: "mat-3", title: 'Lecture 4 Recording - Deadlocks', course: 'CS302', type: 'Video', date: 'Oct 23, 2026', size: '145 MB', description: 'Zoom lecture recording outlining Banker\'s Algorithm.' },
];

// In-memory fallback dataset for courses assignments
const memoryAssignments: any[] = [
  { id: "asg-1", title: 'Process Synchronization Implementation', course: 'CS302', deadline: 'Oct 30, 2026', time: '11:59 PM', submissions: 45, total: 75, status: 'Active' },
  { id: "asg-2", title: 'BST Operations Lab Record', course: 'CS301', deadline: 'Oct 25, 2026', time: '5:00 PM', submissions: 72, total: 80, status: 'Active' },
  { id: "asg-3", title: 'SQL Queries Practice', course: 'CS303', deadline: 'Oct 15, 2026', time: '11:59 PM', submissions: 78, total: 80, status: 'Closed' },
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
-- Grievances Table
create table if not exists grievances (
  id text primary key,
  category text not null,
  subject text not null,
  description text not null,
  student_name text,
  enrollment_no text,
  status text default 'Pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Materials Upload Table
create table if not exists materials (
  id text primary key,
  title text not null,
  course text not null,
  description text,
  type text not null,
  size text not null,
  date text not null,
  file_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Assignments Management Table
create table if not exists assignments (
  id text primary key,
  title text not null,
  course text not null,
  deadline text not null,
  time text not null,
  submissions integer default 0,
  total integer default 75,
  status text default 'Active',
  file_url text,
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

// GET: Retrieve Shared materials (Supabase or Fallback Memory)
app.get("/api/materials", async (req, res) => {
  try {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (url && key) {
      const db = getSupabaseClient();
      const { data, error } = await db
        .from("materials")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return res.json(data);
      }
      console.warn("Supabase materials query warning (ensure 'materials' table exists):", error?.message);
    }
  } catch (err: any) {
    console.error("Internal Supabase materials resolution caught exception:", err.message);
  }
  // Safe high-contrast fallback
  res.json(memoryMaterials);
});

// POST: Faculty upload a study material resource 
app.post("/api/materials", async (req, res) => {
  try {
    const { title, course, description, type, size, file_url } = req.body;

    if (!title || !course || !type) {
      return res.status(400).json({ error: "Missing required materials parameters (title, course, type)." });
    }

    const item = {
      id: `mat-${Date.now()}`,
      title,
      course,
      description: description || "",
      type,
      size: size || "2.1 MB",
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      file_url: file_url || null,
      created_at: new Date().toISOString()
    };

    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (url && key) {
      const db = getSupabaseClient();
      const { data, error } = await db
        .from("materials")
        .insert([item])
        .select();

      if (!error && data) {
        return res.json({ success: true, data: data[0] });
      }

      console.warn("Supabase materials insert failed, running via fallback buffer.", error?.message);
    }

    memoryMaterials.unshift(item);
    return res.json({ success: true, data: item, fallback: true });
  } catch (err: any) {
    console.error("Catch handler during material publish:", err);
    res.status(500).json({ error: "Internal processing failed during study material publish." });
  }
});

// DELETE: Terminate and discard a materials resource
app.delete("/api/materials/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (url && key) {
      const db = getSupabaseClient();
      const { error } = await db
        .from("materials")
        .delete()
        .eq("id", id);

      if (!error) {
        return res.json({ success: true });
      }
      console.warn("Supabase materials deletion failed, applying fallback delete:", error?.message);
    }

    const index = memoryMaterials.findIndex(m => m.id === id);
    if (index !== -1) {
      memoryMaterials.splice(index, 1);
    }
    return res.json({ success: true });
  } catch (err: any) {
    console.error("Catch handler during material deletion:", err);
    res.status(500).json({ error: "Internal processing failed during material deletion." });
  }
});

// GET: Retrieve institutional course assignments
app.get("/api/assignments", async (req, res) => {
  try {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (url && key) {
      const db = getSupabaseClient();
      const { data, error } = await db
        .from("assignments")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return res.json(data);
      }
      console.warn("Supabase assignments query warning (ensure 'assignments' table exists):", error?.message);
    }
  } catch (err: any) {
    console.error("Internal Supabase assignments lookup caught exception:", err.message);
  }
  res.json(memoryAssignments);
});

// POST: Faculty publish course assignment details
app.post("/api/assignments", async (req, res) => {
  try {
    const { title, course, deadline, time, total, status } = req.body;

    if (!title || !course || !deadline) {
      return res.status(400).json({ error: "Missing required assignment parameters (title, course, deadline)." });
    }

    const item = {
      id: `asg-${Date.now()}`,
      title,
      course,
      deadline,
      time: time || "11:59 PM",
      submissions: 0,
      total: total || 75,
      status: status || "Active",
      created_at: new Date().toISOString()
    };

    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (url && key) {
      const db = getSupabaseClient();
      const { data, error } = await db
        .from("assignments")
        .insert([item])
        .select();

      if (!error && data) {
        return res.json({ success: true, data: data[0] });
      }

      console.warn("Supabase assignments insertion failed, running in memory fallback.", error?.message);
    }

    memoryAssignments.unshift(item);
    return res.json({ success: true, data: item, fallback: true });
  } catch (err: any) {
    console.error("Catch handler during assignment setup:", err);
    res.status(500).json({ error: "Internal processing failed during assignment registration." });
  }
});

// DELETE: Delete task syllabus assignment
app.delete("/api/assignments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (url && key) {
      const db = getSupabaseClient();
      const { error } = await db
        .from("assignments")
        .delete()
        .eq("id", id);

      if (!error) {
        return res.json({ success: true });
      }
      console.warn("Supabase assignments delete failed, applying fallback delete:", error?.message);
    }

    const index = memoryAssignments.findIndex(a => a.id === id);
    if (index !== -1) {
      memoryAssignments.splice(index, 1);
    }
    return res.json({ success: true });
  } catch (err: any) {
    console.error("Catch handler during assignment deletion:", err);
    res.status(500).json({ error: "Internal processing failed during assignment deletion." });
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
