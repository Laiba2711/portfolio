"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ── Projects ──────────────────────────────────────────────────────────
export async function getProjects() {
  return prisma.project.findMany({ orderBy: { order: "asc" } });
}

export async function saveProject(data: {
  id?: string;
  title: string;
  slug: string;
  description: string;
  liveUrl?: string;
  githubUrl?: string;
  techStack: string[];
  category?: string;
  featured: boolean;
  order: number;
}) {
  const payload = {
    title: data.title,
    slug: data.slug,
    description: data.description,
    liveUrl: data.liveUrl || null,
    githubUrl: data.githubUrl || null,
    techStack: data.techStack,
    category: data.category || null,
    featured: data.featured,
    order: Number(data.order),
  };

  if (data.id) {
    await prisma.project.update({ where: { id: data.id }, data: payload });
  } else {
    await prisma.project.create({ data: payload });
  }
  revalidatePath("/");
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
}

// ── Experience ────────────────────────────────────────────────────────
export async function getExperiences() {
  return prisma.experience.findMany({ orderBy: { order: "asc" } });
}

export async function saveExperience(data: {
  id?: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
  location?: string;
  order: number;
}) {
  const payload = {
    company: data.company,
    role: data.role,
    startDate: new Date(data.startDate),
    endDate: data.endDate && !data.current ? new Date(data.endDate) : null,
    current: data.current,
    description: data.description || null,
    location: data.location || null,
    order: Number(data.order),
  };

  if (data.id) {
    await prisma.experience.update({ where: { id: data.id }, data: payload });
  } else {
    await prisma.experience.create({ data: payload });
  }
  revalidatePath("/");
}

export async function deleteExperience(id: string) {
  await prisma.experience.delete({ where: { id } });
  revalidatePath("/");
}

// ── Skills ────────────────────────────────────────────────────────────
export async function getSkills() {
  return prisma.skill.findMany({ orderBy: { order: "asc" } });
}

type SkillCategory = "FRONTEND" | "BACKEND" | "DATABASE" | "TOOLS" | "OTHER";

export async function saveSkill(data: {
  id?: string;
  name: string;
  category: SkillCategory;
  level: number;
  order: number;
}) {
  const payload = {
    name: data.name,
    category: data.category,
    level: Number(data.level),
    order: Number(data.order),
  };

  if (data.id) {
    await prisma.skill.update({ where: { id: data.id }, data: payload });
  } else {
    await prisma.skill.create({ data: payload });
  }
  revalidatePath("/");
}

export async function deleteSkill(id: string) {
  await prisma.skill.delete({ where: { id } });
  revalidatePath("/");
}

// ── Education ─────────────────────────────────────────────────────────
export async function getEducations() {
  return prisma.education.findMany({ orderBy: { order: "asc" } });
}

export async function saveEducation(data: {
  id?: string;
  institution: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  gpa?: string;
  description?: string;
  order: number;
}) {
  const payload = {
    institution: data.institution,
    degree: data.degree,
    field: data.field || null,
    startDate: new Date(data.startDate),
    endDate: data.endDate && !data.current ? new Date(data.endDate) : null,
    current: data.current,
    gpa: data.gpa || null,
    description: data.description || null,
    order: Number(data.order),
  };

  if (data.id) {
    await prisma.education.update({ where: { id: data.id }, data: payload });
  } else {
    await prisma.education.create({ data: payload });
  }
  revalidatePath("/");
}

export async function deleteEducation(id: string) {
  await prisma.education.delete({ where: { id } });
  revalidatePath("/");
}

// ── Certificates ──────────────────────────────────────────────────────
export async function getCertificates() {
  return prisma.certificate.findMany({ orderBy: { order: "asc" } });
}

export async function saveCertificate(data: {
  id?: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
  description?: string;
  order: number;
}) {
  const payload = {
    title: data.title,
    issuer: data.issuer,
    date: new Date(data.date),
    credentialId: data.credentialId || null,
    url: data.url || null,
    description: data.description || null,
    order: Number(data.order),
  };

  if (data.id) {
    await prisma.certificate.update({ where: { id: data.id }, data: payload });
  } else {
    await prisma.certificate.create({ data: payload });
  }
  revalidatePath("/");
}

export async function deleteCertificate(id: string) {
  await prisma.certificate.delete({ where: { id } });
  revalidatePath("/");
}

// ── Messages ──────────────────────────────────────────────────────────
export async function getMessages() {
  return prisma.message.findMany({ orderBy: { createdAt: "desc" } });
}

type MessageStatus = "UNREAD" | "READ" | "REPLIED" | "ARCHIVED";

export async function updateMessageStatus(id: string, status: MessageStatus) {
  await prisma.message.update({ where: { id }, data: { status } });
}

export async function deleteMessage(id: string) {
  await prisma.message.delete({ where: { id } });
}

// ── Settings ──────────────────────────────────────────────────────────
export async function getSettings() {
  const settings = await prisma.siteSettings.findFirst();
  if (!settings) {
    return prisma.siteSettings.create({
      data: {
        email: "laibarashid2711@gmail.com",
        githubUrl: "https://github.com/laiba2711",
        linkedinUrl: "https://www.linkedin.com/in/laiba-rashid-571634290",
      },
    });
  }
  return settings;
}

export async function saveSettings(data: {
  id: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl?: string;
}) {
  await prisma.siteSettings.update({
    where: { id: data.id },
    data: {
      email: data.email,
      githubUrl: data.githubUrl,
      linkedinUrl: data.linkedinUrl,
      twitterUrl: data.twitterUrl || null,
    },
  });
  revalidatePath("/");
}
