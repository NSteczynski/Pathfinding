import { Vector } from "./types"

/**
 * Capitalize provided string.
 * @param name The string to capitalize.
 */
export const Capitalize = (name: string): string => {
  return name.charAt(0).toUpperCase() + name.slice(1, name.length).toLowerCase()
}

/** Returns maximal value of rows that can be presented. */
export const getMaxRows = (): number => Math.floor(window.innerHeight / 40) < 2 ? 2 : Math.floor(window.innerHeight / 40)

/** Returns maximal value of columns that can be presented. */
export const getMaxColumns = (): number => Math.floor(window.innerWidth / 40) < 4 ? 4 : Math.floor(window.innerWidth / 40)

/**
 * Returns node start position on middle of rows and on one fourth columns.
 * @param columns The number of columns.
 * @param rows The number of rows.
 */
export const getNodeStartPosition = (columns: number, rows: number): Vector => ({
  x: Math.floor(columns / 4),
  y: Math.floor(rows / 2)
})

/**
 * Returns node end position on middle of rows and on three fourth columns.
 * @param columns The number of columns.
 * @param rows The number of rows.
 */
export const getNodeEndPosition = (columns: number, rows: number): Vector => ({
  x: Math.floor(columns / 4 * 3),
  y: Math.floor(rows / 2)
})