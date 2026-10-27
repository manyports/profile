import { createElement, type ReactElement } from "react"
import { renderToBuffer, type DocumentProps } from "@react-pdf/renderer"
import { cvContent, pdfFileName } from "../content"
import { CVDocument } from "../pdf"

// rendered once at build time from src/data, so the file always matches /cv
export const dynamic = "force-static"

export async function GET() {
  const pdf = await renderToBuffer(createElement(CVDocument, { cv: cvContent() }) as ReactElement<DocumentProps>)
  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${pdfFileName}"`,
    },
  })
}
