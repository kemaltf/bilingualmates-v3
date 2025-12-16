import { NextResponse } from "next/server";
import { paths } from "@/lib/learn/mock";

export async function GET() {
  // Simulate database delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json(paths);
}
