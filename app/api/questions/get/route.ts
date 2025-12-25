import { NextResponse } from "next/server";
import { paths } from "@/lib/learn/mock";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nodeId = searchParams.get("nodeId");

  if (!nodeId) {
    return NextResponse.json({ error: "Missing nodeId" }, { status: 400 });
  }

  // Find node
  for (const p of paths) {
    for (const s of p.sections) {
      for (const u of s.units) {
        for (const n of u.nodes) {
          if (n.id === nodeId) {
            return NextResponse.json(n.quizQuestions || []);
          }
        }
      }
    }
  }

  return NextResponse.json({ error: "Node not found" }, { status: 404 });
}
