"use client"

import { ReactNode } from "react"

interface GridProps {
  children: ReactNode
  columns?: 1 | 2 | 3 | 4 | 12
  className?: string
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16
  mdColumns?: 1 | 2 | 3 | 4 | 12
}

export function Grid({ 
  children, 
  columns = 1, 
  className = "",
  gap = 6,
  mdColumns
}: GridProps) {
  const getColumnsClass = (cols: number) => {
    const map: Record<number, string> = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      12: "grid-cols-12"
    }
    return map[cols]
  }
  
  const getMdColumnsClass = (cols: number) => {
    const map: Record<number, string> = {
      1: "md:grid-cols-1",
      2: "md:grid-cols-2",
      3: "md:grid-cols-3",
      4: "md:grid-cols-4",
      12: "md:grid-cols-12"
    }
    return map[cols]
  }
  
  const getGapClass = (g: number) => {
    const map: Record<number, string> = {
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      8: "gap-8",
      10: "gap-10",
      12: "gap-12",
      16: "gap-16"
    }
    return map[g]
  }
  
  return (
    <div className={`grid ${getColumnsClass(columns)} ${mdColumns ? getMdColumnsClass(mdColumns) : ""} ${getGapClass(gap)} ${className}`}>
      {children}
    </div>
  )
}

export function GridItem({
  children,
  className = "",
  colSpan = 1,
  mdColSpan
}: {
  children: ReactNode
  className?: string
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  mdColSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
}) {
  const getColSpanClass = (span: number) => {
    const map: Record<number, string> = {
      1: "col-span-1",
      2: "col-span-2",
      3: "col-span-3",
      4: "col-span-4",
      5: "col-span-5",
      6: "col-span-6",
      7: "col-span-7",
      8: "col-span-8",
      9: "col-span-9",
      10: "col-span-10",
      11: "col-span-11",
      12: "col-span-12"
    }
    return map[span]
  }
  
  const getMdColSpanClass = (span: number) => {
    const map: Record<number, string> = {
      1: "md:col-span-1",
      2: "md:col-span-2",
      3: "md:col-span-3",
      4: "md:col-span-4",
      5: "md:col-span-5",
      6: "md:col-span-6",
      7: "md:col-span-7",
      8: "md:col-span-8",
      9: "md:col-span-9",
      10: "md:col-span-10",
      11: "md:col-span-11",
      12: "md:col-span-12"
    }
    return map[span]
  }
  
  return (
    <div className={`${getColSpanClass(colSpan)} ${mdColSpan ? getMdColSpanClass(mdColSpan) : ""} ${className}`}>
      {children}
    </div>
  )
} 