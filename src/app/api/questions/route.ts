import { NextRequest, NextResponse } from "next/server";
import questionsData from "@/data/questions-full.json";

export const dynamic = "force-dynamic";

const modules = questionsData.modules;

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const selectedModule = searchParams.get("module") || modules[0] || "";
  const limit = Math.min(Number(searchParams.get("limit") || 50), 200);
  const offset = Math.max(Number(searchParams.get("offset") || 0), 0);
  const filtered = questionsData.questions.filter((question) => question.module === selectedModule);

  return NextResponse.json({
    total: questionsData.total,
    modules,
    module: selectedModule,
    moduleTotal: filtered.length,
    limit,
    offset,
    questions: filtered.slice(offset, offset + limit),
  });
}
