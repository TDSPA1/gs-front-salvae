import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = "deaf7235640243f2bc5284a3c4b8501d";
  const url = `https://newsapi.org/v2/top-headlines?sources=google-news-br&apiKey=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  return NextResponse.json(data.articles || []);
}