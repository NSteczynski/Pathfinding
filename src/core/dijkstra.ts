import { Vector, DijkstraParams, NodeParams, NodeTypes, Dictionary } from "./types"
import { getVectorDistance, getPathFromNode, getNodeNeighbors } from "./functions"

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
  const openList: Array<DijkstraParams> = [{ position: startNode, distance: 0 }]
  const closedList: Array<DijkstraParams> = []

  let endPath: DijkstraParams = { position: endNode, distance: Infinity }

  while (openList.length) {
    const node = openList.shift() as DijkstraParams
    const neighbors = getNeighbors(nodes, rows, columns, node)
    for (let i = 0, l = neighbors.length; i < l; ++i) {
      const neighbor = neighbors[i]
      const prevNeighbor = closedList.find(node => node.position.x === neighbor.position.x && node.position.y === neighbor.position.y)
      if (prevNeighbor)
        continue
      if (neighbor.position.x === endNode.x && neighbor.position.y === endNode.y)
        endPath = { ...neighbor }
      if (endPath.parent == undefined)
        openList.push(neighbor)
      closedList.push(neighbor)
    }
  }

  const path = endPath ? getPathFromNode(endPath).map(node => ({ position: node.position, type: NodeTypes.PATH })) : []
  const newNodes: Array<NodeParams> = closedList.sort((a, b) => a.distance < b.distance ? -1 : a.distance > b.distance ? 1 : 0).reduce((r: Array<NodeParams>, node) => {
    if (node.distance > endPath.distance)
      return r
    r.push({ position: node.position, type: NodeTypes.VISITED })
    return r
  }, [])

  return [newNodes, path]
}

const getNeighbors = (nodes: Dictionary<NodeParams>, rows: number, columns: number, startNode: DijkstraParams): Array<DijkstraParams> => {
  const neighbors: Array<DijkstraParams> = getNodeNeighbors(nodes, rows, columns, startNode) as Array<DijkstraParams>
  for (let i = 0, l = neighbors.length; i < l; ++i) {
    const neighbor = neighbors[i]
    const distance = startNode.distance + getVectorDistance(startNode.position, neighbor.position)
    neighbors[i] = { ...neighbors[i], distance }
  }

  return neighbors
}

export default Dijkstra