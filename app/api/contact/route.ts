import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate input
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

    // Send email using Web3Forms API with JSON
    const web3formsPayload = {
      access_key: "01c9c44e-f4c8-4183-9e17-8e521f1e5adc",
      name: name,
      email: email,
      message: message,
      subject: `Portfolio Contact থেকে নতুন message - ${name}`,
      from_name: "Portfolio Contact Form",
    };

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(web3formsPayload),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return NextResponse.json(
        { message: "Email sent successfully" },
        { status: 200 }
      );
    } else {
      console.error("Web3Forms Error:", data);
      return NextResponse.json(
        { error: data.message || "Failed to send email" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}