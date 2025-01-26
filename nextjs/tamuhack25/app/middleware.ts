// middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("supabase-auth-token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/profile"],
};
