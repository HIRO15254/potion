import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename =
    searchParams.get("filename") ?? Math.random().toString(36).slice(-8);

  // TODO: エラーハンドリング
  if (!request.body) {
    return NextResponse.next();
  }

  const blob = await put(filename, request.body, {
    access: "public",
  });

  return NextResponse.json(blob);
}
