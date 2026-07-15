import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [
      projectCount,
      messageCount,
      unreadMessageCount,
      experienceCount,
      skillCount,
      recentMessages,
      siteSettings,
    ] = await Promise.all([
      prisma.project.count(),
      prisma.message.count(),
      prisma.message.count({ where: { status: "UNREAD" } }),
      prisma.experience.count(),
      prisma.skill.count(),
      prisma.message.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: { id: true, name: true, subject: true, status: true, createdAt: true },
      }),
      prisma.siteSettings.findFirst(),
    ]);

    return NextResponse.json({
      stats: {
        projects: projectCount,
        messages: messageCount,
        unreadMessages: unreadMessageCount,
        experiences: experienceCount,
        skills: skillCount,
      },
      recentMessages,
      resumeUrl: siteSettings?.resumeUrl ?? null,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
