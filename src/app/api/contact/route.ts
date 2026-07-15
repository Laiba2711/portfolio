import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendContactEmail } from "@/lib/resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(20),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    // Save to database
    const dbMessage = await prisma.message.create({
      data: validatedData,
    });

    // Attempt to send email
    try {
      await sendContactEmail(validatedData);
    } catch (emailError) {
      console.error("Failed to send email notification:", emailError);
      // We don't fail the request if email fails, as long as it's in DB
    }

    return NextResponse.json({ success: true, id: dbMessage.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors },
        { status: 400 }
      );
    }
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
