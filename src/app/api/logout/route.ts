import { NextResponse } from "next/server";

export async function POST() {
  const res = new NextResponse(null, { status: 204 });
  res.cookies.set({
    name: "role",
    value: "",
    maxAge: 0,
    path: "/",
    sameSite: "lax",
  });
  return res;
}
