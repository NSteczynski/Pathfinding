import { Vector, AstarParams, NodeParams, NodeTypes, Dictionary } from "./types"
import { getVectorDistance, getPathFromNode, getNodeNeighbors } from "./functions"

/**
 * The A* pathfinding algorithm.
 * Returns pathfinding nodes and path to end node from start node. Returns: [nodes, path].
 * @param nodes The nodes list.
 * @param rows The number of rows.
 * @param columns The number of columns.
 * @param startNode The start node position.
 * @param endNode The end node position.
 */
const Astar = (nodes: Dictionary<NodeParams>, rows: number, columns: number, startNode: Vector, endNode: Vector): [Array<NodeParams>, Array<NodeParams>] => {
  const openList: Array<AstarParams> = [{ position: startNode, cost: 0, distance: 0, heuristic: 0 }]
  const closedList: Array<AstarParams> = []

  let endPath: AstarParams = { position: endNode, cost: Infinity, distance: Infinity, heuristic: Infinity }

  while (openList.length) {
    const lowestIndex = getLowestIndex(openList)
    const node = openList.splice(lowestIndex, 1)[0]

    if (node.position.x === endNode.x && node.position.y === endNode.y)
      endPath = { ...node }
    if (endPath.parent)
      continue

    closedList.push(node)
    const neighbors = getNeighbors(nodes, rows, columns, node, endNode)
    for (let i = 0, l = neighbors.length; i < l; ++i) {
      const neighbor = neighbors[i]
      const prevNeighbor = closedList.find(node => node.position.x === neighbor.position.x && node.position.y === neighbor.position.y)
      const prevNeighborInOpen = openList.find(node => node.position.x === neighbor.position.x && node.position.y === neighbor.position.y)
      if (prevNeighbor)
        continue
      if (prevNeighborInOpen && neighbor.cost > prevNeighborInOpen.cost)
        continue
      if (prevNeighborInOpen == undefined)
        openList.push(neighbor)
    }
  }

  const path = endPath ? getPathFromNode(endPath).map(node => ({ position: node.position, type: NodeTypes.PATH })) : []
  const newNodes: Array<NodeParams> = closedList.sort((a, b) => a.cost < b.cost ? -1 : a.cost > b.cost ? 1 : 0).reduce((r: Array<NodeParams>, node) => {
    if (node.cost > endPath.cost)
      return r
    r.push({ position: node.position, type: NodeTypes.VISITED })
    return r
  }, [])

  return [
    newNodes,
    path
  ]
}

const getLowestIndex = (array: Array<AstarParams>): number => {
  let lowestIndex = 0
    for (let i = 1, l = array.length; i < l; ++i)
      if (array[i].cost < array[lowestIndex].cost)
        lowestIndex = i
  return lowestIndex
}

const getNeighbors = (nodes: Dictionary<NodeParams>, rows: number, columns: number, startNode: AstarParams, endNode: Vector): Array<AstarParams> => {
  const neighbors: Array<AstarParams> = getNodeNeighbors(nodes, rows, columns, startNode) as Array<AstarParams>
  for (let i = 0, l = neighbors.length; i < l; ++i) {
    const neighbor = neighbors[i]
    const distance = startNode.distance + getVectorDistance(startNode.position, neighbor.position)
    const heuristic = getVectorDistance(neighbor.position, endNode)
    neighbors[i] = { ...neighbors[i], distance, heuristic, cost: distance + heuristic }
  }

  return neighbors
}

export default Astar