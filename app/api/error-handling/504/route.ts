import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  // Kiểm tra nếu thiếu tham số "name"
  if (!body.name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  return NextResponse.json({ message: "Success", data: body });
}
