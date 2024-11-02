import { NextResponse } from "next/server";

async function query(data: { question: string }) {
  const response = await fetch(
    "http://31.220.107.113:3000/api/v1/prediction/aa54f39f-7f93-479e-a76e-ca855373b5e5",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

export async function POST(request: Request) {
  const { prompt } = await request.json();

  console.log("Received prompt:", prompt); // Debug: Log the received prompt

  try {
    console.log("Sending request to API..."); // Debug: Log before sending the request
    const result = await query({ question: prompt });
    console.log("Result:", result); // Debug: Log the result
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error occurred:", error); // Debug: Log the error
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
