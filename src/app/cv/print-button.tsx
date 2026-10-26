"use client"

// the browser's print dialog doubles as "save as pdf"
export function PrintButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.print()} className={className}>
      download pdf ↓
    </button>
  )
}
