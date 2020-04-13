import { Vector, DijkstraParams, NodeParams, NodeTypes, Dictionary } from "./types"

/**
 * The Dijsktra pathfinding algorithm.
 * Returns pathfinding nodes and path to end node from start node. Returns: [nodes, path].
 * @param nodes The nodes list.
 * @param rows The number of rows.
 * @param columns The number of columns.
 * @param startNode The start node position.
 * @param endNode The end node position.
 */
const Dijkstra = (nodes: Dictionary<NodeParams>, rows: number, columns: number, startNode: Vector, endNode: Vector): [Array<NodeParams>, Array<NodeParams>] => {
  const unexploredNodes = getNeighbors(nodes, rows, columns, { position: startNode, distance: 0 })
  const dijkstraParams: Array<DijkstraParams> = [...unexploredNodes]

  let endPath: DijkstraParams = { position: endNode, distance: Infinity }

  while (unexploredNodes.length) {
    const node = unexploredNodes.shift() as DijkstraParams
    const neighbors = getNeighbors(nodes, rows, columns, node)
    for (let i = 0, l = neighbors.length; i < l; ++i) {
      const neighbor = neighbors[i]
      const prevNeighbor = dijkstraParams.find(node => node.position.x === neighbor.position.x && node.position.y === neighbor.position.y)
      if (prevNeighbor)
        continue
      if (neighbor.position.x === endNode.x && neighbor.position.y === endNode.y)
        endPath = { ...neighbor }
      if (endPath.parent == undefined)
        unexploredNodes.push(neighbor)
      dijkstraParams.push(neighbor)
    }
  }

  const dijkstraPath = endPath ? getPath(endPath) : []
  const path = dijkstraPath.map(node => ({ position: node.position, type: NodeTypes.PATH }))

  const sortedDijkstraParams = dijkstraParams.sort((a, b) => a.distance < b.distance ? -1 : a.distance > b.distance ? 1 : 0)
  const nodeParams: Array<NodeParams> = sortedDijkstraParams.reduce((r: Array<NodeParams>, node) => {
    if (node.distance > endPath.distance)
      return r
    r.push({ position: node.position, type: NodeTypes.VISITED })
    return r
  }, [])
  return [nodeParams, path]
}

const getPath = (node: DijkstraParams): Array<DijkstraParams> => {
  if (!node.parent)
    return [node]
  const parentParam = getPath(node.parent)
  return parentParam.concat([node])
}

const getNeighbors = (nodes: Dictionary<NodeParams>, rows: number, columns: number, startNode: DijkstraParams): Array<DijkstraParams> => {
  const neighbors: Array<DijkstraParams> = []

  /** Left */
  const leftName = `${startNode.position.x - 1}-${startNode.position.y}`
  const isLeft = startNode.position.x - 1 >= 0 && nodes[leftName].type === NodeTypes.UNVISITED
  if (isLeft)
    neighbors.push({ position: nodes[leftName].position, parent: startNode, distance: startNode.distance + 1 })

  /** Right */
  const rightName = `${startNode.position.x + 1}-${startNode.position.y}`
  const isRight = startNode.position.x + 1 < columns && nodes[rightName].type === NodeTypes.UNVISITED
  if (isRight)
    neighbors.push({ position: nodes[rightName].position, parent: startNode, distance: startNode.distance + 1 })

  /** Bottom */
  const bottomName = `${startNode.position.x}-${startNode.position.y + 1}`
  const isBottom = startNode.position.y + 1 < rows && nodes[bottomName].type === NodeTypes.UNVISITED
  if (isBottom)
    neighbors.push({ position: nodes[bottomName].position, parent: startNode, distance: startNode.distance + 1 })

  /** Top */
  const topName = `${startNode.position.x}-${startNode.position.y - 1}`
  const isTop = startNode.position.y - 1 >= 0 && nodes[topName].type === NodeTypes.UNVISITED
  if (isTop)
    neighbors.push({ position: nodes[topName].position, parent: startNode, distance: startNode.distance + 1 })

  /** Bottom Right */
  const bottomRightName = `${startNode.position.x + 1}-${startNode.position.y + 1}`
  const isBottomRight = isBottom && isRight && nodes[bottomRightName].type === NodeTypes.UNVISITED
  if (isBottomRight)
    neighbors.push({ position: nodes[bottomRightName].position, parent: startNode, distance: startNode.distance + Math.sqrt(2) })

  /** Top Left */
  const topLeftName = `${startNode.position.x - 1}-${startNode.position.y - 1}`
  const isTopLeft = isTop && isLeft && nodes[topLeftName].type === NodeTypes.UNVISITED
  if (isTopLeft)
    neighbors.push({ position: nodes[topLeftName].position, parent: startNode, distance: startNode.distance + Math.sqrt(2) })

  /** Top Right */
  const topRightName = `${startNode.position.x + 1}-${startNode.position.y - 1}`
  const isTopRight = isTop && isRight && nodes[topRightName].type === NodeTypes.UNVISITED
  if (isTopRight)
    neighbors.push({ position: nodes[topRightName].position, parent: startNode, distance: startNode.distance + Math.sqrt(2) })

  /** Bottom Left */
  const bottomLeftName = `${startNode.position.x - 1}-${startNode.position.y + 1}`
  const isBottomLeft = isBottom && isLeft && nodes[bottomLeftName].type === NodeTypes.UNVISITED
  if (isBottomLeft)
    neighbors.push({ position: nodes[bottomLeftName].position, parent: startNode, distance: startNode.distance + Math.sqrt(2) })

  return neighbors
}

export default Dijkstra