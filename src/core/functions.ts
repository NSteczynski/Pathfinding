import { Vector, AlgorithmParams, Dictionary, NodeParams, NodeTypes } from "./types"

/**
 * Capitalize provided string.
 * @param name The string to capitalize.
 */
export const Capitalize = (name: string): string => {
  return name.charAt(0).toUpperCase() + name.slice(1, name.length).toLowerCase()
}

/** Returns maximal value of rows that can be presented. */
export const getMaxRows = (): number => {
  const nodeSize = window.innerWidth <= 768 ? 20 : 40
  return Math.floor(window.innerHeight / nodeSize) < 2 ? 2 : Math.floor(window.innerHeight / nodeSize)
}

/** Returns maximal value of columns that can be presented. */
export const getMaxColumns = (): number => {
  const nodeSize = window.innerWidth <= 768 ? 20 : 40
  return Math.floor(window.innerWidth / nodeSize) < 4 ? 4 : Math.floor(window.innerWidth / nodeSize)
}

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

/**
 * Calculates the distance between vectors.
 * @param vector The vector to check.
 * @param checkVector The vector to check.
 */
export const getVectorDistance = (vector: Vector, checkVector: Vector): number => {
  const difference = {
    x: vector.x - checkVector.x,
    y: vector.y - checkVector.y
  }

  return Math.sqrt(Math.pow(difference.x, 2) + Math.pow(difference.y, 2))
}

export const getPathFromNode = (node: AlgorithmParams): Array<AlgorithmParams> => {
  const result: Array<AlgorithmParams> = [node]
  if (node.parent)
    result.unshift(...getPathFromNode(node.parent))
  return result
}

export const getNodeNeighbors = (nodes: Dictionary<NodeParams>, rows: number, columns: number, startNode: AlgorithmParams): Array<AlgorithmParams> => {
  const neighbors: Array<AlgorithmParams> = []

  /** Left */
  const leftName = `${startNode.position.x - 1}-${startNode.position.y}`
  const isLeft = startNode.position.x - 1 >= 0
  if (isLeft && nodes[leftName].type === NodeTypes.UNVISITED)
    neighbors.push({ position: nodes[leftName].position, parent: startNode })

  /** Right */
  const rightName = `${startNode.position.x + 1}-${startNode.position.y}`
  const isRight = startNode.position.x + 1 < columns
  if (isRight && nodes[rightName].type === NodeTypes.UNVISITED)
    neighbors.push({ position: nodes[rightName].position, parent: startNode })

  /** Bottom */
  const bottomName = `${startNode.position.x}-${startNode.position.y + 1}`
  const isBottom = startNode.position.y + 1 < rows
  if (isBottom && nodes[bottomName].type === NodeTypes.UNVISITED)
    neighbors.push({ position: nodes[bottomName].position, parent: startNode })

  /** Top */
  const topName = `${startNode.position.x}-${startNode.position.y - 1}`
  const isTop = startNode.position.y - 1 >= 0
  if (isTop && nodes[topName].type === NodeTypes.UNVISITED)
    neighbors.push({ position: nodes[topName].position, parent: startNode })

  /** Bottom Right */
  const bottomRightName = `${startNode.position.x + 1}-${startNode.position.y + 1}`
  const isBottomRight = isBottom && isRight
  if (isBottomRight && nodes[bottomRightName].type === NodeTypes.UNVISITED)
    neighbors.push({ position: nodes[bottomRightName].position, parent: startNode })

  /** Top Left */
  const topLeftName = `${startNode.position.x - 1}-${startNode.position.y - 1}`
  const isTopLeft = isTop && isLeft
  if (isTopLeft && nodes[topLeftName].type === NodeTypes.UNVISITED)
    neighbors.push({ position: nodes[topLeftName].position, parent: startNode })

  /** Top Right */
  const topRightName = `${startNode.position.x + 1}-${startNode.position.y - 1}`
  const isTopRight = isTop && isRight
  if (isTopRight && nodes[topRightName].type === NodeTypes.UNVISITED)
    neighbors.push({ position: nodes[topRightName].position, parent: startNode })

  /** Bottom Left */
  const bottomLeftName = `${startNode.position.x - 1}-${startNode.position.y + 1}`
  const isBottomLeft = isBottom && isLeft
  if (isBottomLeft && nodes[bottomLeftName].type === NodeTypes.UNVISITED)
    neighbors.push({ position: nodes[bottomLeftName].position, parent: startNode })

  return neighbors
}