import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("resume") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 });
    }

    // Max 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File size must be under 10MB" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const publicDir = join(process.cwd(), "public");
    await mkdir(publicDir, { recursive: true });
    await writeFile(join(publicDir, "resume.pdf"), buffer);

    const resumeUrl = "/resume.pdf";

    // Upsert site settings
    const existing = await prisma.siteSettings.findFirst();
    if (existing) {
      await prisma.siteSettings.update({
        where: { id: existing.id },
        data: { resumeUrl },
      });
    } else {
      await prisma.siteSettings.create({ data: { resumeUrl } });
    }

    return NextResponse.json({ success: true, resumeUrl });
  } catch (error) {
    console.error("Resume upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const { unlink } = await import("fs/promises");
    const filePath = join(process.cwd(), "public", "resume.pdf");
    try {
      await unlink(filePath);
    } catch {
      // File might not exist
    }

    const existing = await prisma.siteSettings.findFirst();
    if (existing) {
      await prisma.siteSettings.update({
        where: { id: existing.id },
        data: { resumeUrl: null },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resume delete error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
