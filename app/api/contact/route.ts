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

    // Send email using Web3Forms - using FormData format as required
    const formData = new FormData();
    formData.append("access_key", process.env.WEB3FORMS_ACCESS_KEY || "");
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);
    formData.append("subject", `Portfolio Contact থেকে নতুন message - ${name}`);
    formData.append("from_name", "Portfolio Contact Form");
    
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json(
        { message: "Email sent successfully" },
        { status: 200 }
      );
    } else {
      console.error("Web3Forms Error:", data);
      return NextResponse.json(
        { error: data.message || "Failed to send email" },
        { status: 400 }
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