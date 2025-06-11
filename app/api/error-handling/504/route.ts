import { NextResponse } from "next/server";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return NextResponse.json(
    {
      error: "Gateway Timeout",
      message: "The server took too long to respond.",
    },
    { status: 504 },
  );
}
