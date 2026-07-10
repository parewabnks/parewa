import { client } from '@/sanity/client'
import { NextRequest, NextResponse } from 'next/server'
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    const emailSchema = z.object({
      email: z.string().email("Invalid email format")
    })

    const result = emailSchema.safeParse({ email });

    if (!result.success) {
      const emailErrors = result.error.format().email?._errors || [];
      console.log(result.error.format());
      return NextResponse.json(
        {
          success: false,
          message: emailErrors?.length > 0 ? emailErrors.join(', ') : 'Invalid query parameters'
        },
        { status: 400 });
    }

    // Check if email already exists
    const existing = await client.fetch(
      `*[_type == "newsletter_email" && email == $email][0]`,
      { email }
    );

    if (existing) {
      console.log("Newsletter already exists");
      return NextResponse.json(
        { success: false, message: "Newsletter already exists" },
        { status: 400 }
      );
    }

    // Create new newsletter document
    await client.create({
      _type: "newsletter_email",
      email,
    });

    console.log("Newsletter added successfully");
    return NextResponse.json(
      { success: true, message: "Newsletter added successfully" },
      { status: 200 }
    );

  } catch (error: any) {
    console.log(error)
    return NextResponse.json(
      { success: false, message: "Failed to add newsletter" },
      { status: 500 }
    );
  }
}