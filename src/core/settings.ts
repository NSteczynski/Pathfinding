import { Settings, Algorithms, BoardMouseEvents } from "./types"
import { getMaxRows, getMaxColumns, getNodeStartPosition, getNodeEndPosition } from "./functions"

const maxRows = getMaxRows()
const maxColumns = getMaxColumns()
const startNodeVector = getNodeStartPosition(maxColumns, maxRows)
const endNodeVector = getNodeEndPosition(maxColumns, maxRows)

/** The default settings. */
export const defaultSettings: Settings = {
  rows: maxRows,
  maxRows: maxRows,
  columns: maxColumns,
  maxColumns: maxColumns,
  startNode: startNodeVector,
  endNode: endNodeVector,
  playingSpeed: 1.0,
  isPlaying: false,
  algorithm: Algorithms.DIJKSTRA
}

/** The algorithm interval in miliseconds. */
export const AlgorithmInterval = 100

/** The default board mouse events. */
export const defaultBoardMouseEvents: BoardMouseEvents = {
  isMouseDown: false,
  isNodeStartDown: false,
  isNodeEndDown: false
}