import { Vector, DijkstraParams, NodeParams, NodeTypes, Dictionary } from "./types"

/**
 * Returns pathfinding nodes and path to end node from start node. Returns: [nodes, path].
 * @param nodes The nodes list.
 * @param rows The number of rows.
 * @param columns The number of columns.
 * @param startNode The start node position.
 * @param endNode The end node position.
 */
const Dijkstra = (nodes: Dictionary<NodeParams>, rows: number, columns: number, startNode: Vector, endNode: Vector): [Array<NodeParams>, Array<NodeParams>] => {
  const unexploredNodes = getNeighbors(nodes, rows, columns, { position: startNode })
  const nodeParams: Array<NodeParams> = unexploredNodes.map(node => ({ type: NodeTypes.VISITED, position: node.position }))
  const endPath: DijkstraParams = { position: endNode }

  while (unexploredNodes.length) {
    const node = unexploredNodes.shift() as DijkstraParams
    const neighbors = getNeighbors(nodes, rows, columns, node)
    for (let i = 0, l = neighbors.length; i < l; ++i) {
      const neighbor = neighbors[i]
      const prevNeighbor = nodeParams.find(node => node.position.x === neighbor.position.x && node.position.y === neighbor.position.y)
      if (prevNeighbor)
        continue
      if (neighbor.position.x === endNode.x && neighbor.position.y === endNode.y) {
        endPath.parent = neighbor.parent
        unexploredNodes.length = 0
        break
      }
      nodeParams.push({ type: NodeTypes.VISITED, position: neighbor.position })
      unexploredNodes.push(neighbor)
    }
  }

  const dijkstraPath = endPath ? getPath(endPath) : []
  const path = dijkstraPath.map(node => ({ type: NodeTypes.PATH, position: node.position }))
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

  /** Top */
  const topName = `${startNode.position.x}-${startNode.position.y - 1}`
  if (startNode.position.y - 1 >= 0 && nodes[topName].type === NodeTypes.UNVISITED)
    neighbors.push({ position: nodes[topName].position, parent: startNode })

  /** Right */
  const rightName = `${startNode.position.x + 1}-${startNode.position.y}`
  if (startNode.position.x + 1 < columns && nodes[rightName].type === NodeTypes.UNVISITED)
    neighbors.push({ position: nodes[rightName].position, parent: startNode })

  /** Bottom */
  const bottomName = `${startNode.position.x}-${startNode.position.y + 1}`
  if (startNode.position.y + 1 < rows && nodes[bottomName].type === NodeTypes.UNVISITED)
    neighbors.push({ position: nodes[bottomName].position, parent: startNode })

  /** Left */
  const leftName = `${startNode.position.x - 1}-${startNode.position.y}`
  if (startNode.position.x - 1 >= 0 && nodes[leftName].type === NodeTypes.UNVISITED)
    neighbors.push({ position: nodes[leftName].position, parent: startNode })

  return neighbors
}

export default Dijkstra