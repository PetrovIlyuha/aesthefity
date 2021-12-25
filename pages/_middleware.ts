import { NextResponse } from "next/server"
const authPages = ["/", "/playlist", "/library"]

export default function middleware(req) {
  if (authPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.APP_ACCESS_TOKEN
    if (!token) {
      return NextResponse.redirect("/signin")
    }
  }
}
