import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate the input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Here you can integrate with email services like:
    // - Resend
    // - SendGrid
    // - Nodemailer
    // - EmailJS
    
    // For now, we'll use a third-party API (Formspree, Web3Forms, or similar)
    // You can replace this with your preferred email service
    
    const formspreeEndpoint = "https://formspree.io/f/YOUR_FORM_ID"; // Replace with your Formspree ID
    
    // Alternative: Use Web3Forms (free, no backend needed)
    const web3FormsEndpoint = "https://api.web3forms.com/submit";
    
    const response = await fetch(web3FormsEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_key: "YOUR_WEB3FORMS_ACCESS_KEY", // Get free key from https://web3forms.com
        name,
        email,
        message,
        to: "sohagbhuiyan778@gmail.com",
        subject: `Portfolio Contact from ${name}`,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send email");
    }

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}