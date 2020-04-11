/** The empty parameter. */
export type Empty =
  | {}
  | []
  | ""
  | null

/** The dictionary which uses string as key. */
export type Dictionary<T> = { [name: string]: T }

/** The board mouse events. */
export interface BoardMouseEvents {
  /** Returns true if mouse is down. */
  isMouseDown: boolean
  /** Returns true if mouse is down on start node. */
  isNodeStartDown: boolean
  /** Returns true if mouse is down on end node. */
  isNodeEndDown: boolean
}

/** The vector parameters. */
export interface Vector {
  /** The x parameter. */
  x: number
  /** The y parameter. */
  y: number
}

/** The node parameters. */
export interface NodeParams {
  /** The node type. */
  type: NodeTypes
  /** The node positino (x, y). */
  position: Vector
}

/** The field parameters. */
export interface FieldParams<T> {
  /** The field name. */
  name: string
  /** The field label. */
  label: string
  /** The field value. */
  value: T
  /** Determines if field should be disabled. */
  disabled: boolean
  /** The on change function. */
  onChange: (name: string, value: T) => void
}

export interface NumberInputParams extends FieldParams<number> {
  /** The minimal value. */
  min: number
  /** The maximal value. */
  max: number
  /** The step value. */
  step: number
}

export interface SelectFieldParams extends FieldParams<any> {
  /** The select options. */
  options: Dictionary<string>
}

/** The pathfinding settings. */
export interface Settings {
  /** The number of rows on the board. */
  rows: number
  /** The number of columns on the board. */
  columns: number
  /** The maximal number of rows on the board. */
  maxRows: number
  /** The maximal number of columns on the board. */
  maxColumns: number
  /** The start node position. */
  startNode: Vector
  /** The end node position */
  endNode: Vector
  /** The visualisation speed. */
  playingSpeed: number
  /** Returns true if visualisation is current playing. */
  isPlaying: boolean
  /** The algorithm name. */
  algorithm: Algorithms
}

/** The dijkstra nodes parameters. */
export interface DijkstraParams {
  position: Vector
  parent?: DijkstraParams
}

/** The list of algorithms. */
export enum Algorithms {
  DIJKSTRA = 'dijkstra'
}

/** The list of node types. */
export enum NodeTypes {
  UNVISITED = 'unvisited',
  VISITED = 'visited',
  WALL = 'wall',
  START = 'start',
  END = 'end',
  PATH = 'path'
}