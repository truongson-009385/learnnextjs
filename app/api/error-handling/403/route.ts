import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { error: "Forbidden: You do not have access to this resource." },
    { status: 403 }
  );
}
