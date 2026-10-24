import { NextResponse, type NextRequest } from "next/server"

// search engines (Googlebot, Bingbot) are deliberately absent: they get the same page people do.
const agents =
  /GPTBot|ChatGPT-User|OAI-SearchBot|ClaudeBot|Claude-User|Claude-SearchBot|Claude-Web|anthropic-ai|PerplexityBot|Perplexity-User|MistralAI-User|cohere-ai|Meta-ExternalAgent|Meta-ExternalFetcher|Amazonbot|Bytespider|CCBot|DuckAssistBot|YouBot|Diffbot|^curl\/|^Wget\/|python-requests|python-httpx|aiohttp|node-fetch|axios|undici|Go-http-client/i

export function proxy(request: NextRequest) {
  const ua = request.headers.get("user-agent") ?? ""
  const accept = request.headers.get("accept") ?? ""
  const wantsMarkdown = accept.includes("text/markdown") || (accept.includes("text/plain") && !accept.includes("text/html"))

  const response =
    agents.test(ua) || wantsMarkdown
      ? NextResponse.rewrite(new URL("/llms.txt", request.url))
      : NextResponse.next()

  // the same URL answers differently per client, so caches must keep the variants apart
  response.headers.set("Vary", "User-Agent, Accept")
  response.headers.set("Link", '</llms.txt>; rel="alternate"; type="text/markdown"')
  return response
}

export const config = {
  matcher: "/",
}
