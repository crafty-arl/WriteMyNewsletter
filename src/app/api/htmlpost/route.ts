import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Get the URL of the request
  const url = new URL(request.url);
  
  // Extract query parameters
  const query = url.searchParams.get('query'); // Adjust 'query' to your specific parameter name

  // Replace this with your desired response based on the query
  const responseText = `You sent the following query: ${query}`;

  return NextResponse.json({ text: responseText });
}
