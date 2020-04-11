import React from 'react'
import { Settings, NodeParams, Vector, Dictionary } from '../core/types'

const Board: React.FunctionComponent<Settings & {
  nodes: Dictionary<NodeParams>
  onStartNode: () => void
  onEndNode: () => void
  onNodeDown: (position: Vector) => void
  onNodeOver: (position: Vector) => void
}> = ({ nodes, rows, columns, startNode, endNode, isPlaying, onStartNode, onEndNode, onNodeDown, onNodeOver }) => {
  const className = 'board' + (isPlaying ? ' disabled' : '')

  const board: Array<JSX.Element> = []
  if (Object.keys(nodes).length) {
    for (let y = 0; y < rows; ++y) {
      const elements: Array<JSX.Element> = []
      for (let x = 0; x < columns; ++x) {
        const name = `${x}-${y}`
        if (nodes[name] == undefined)
          continue
        if (x === startNode.x && y === startNode.y)
          elements.push(<span key={name} className='start' onMouseDown={onStartNode} />)
        else if (x === endNode.x && y === endNode.y)
          elements.push(<span key={name} className='end' onMouseDown={onEndNode} />)
        else
          elements.push(<span key={name} className={nodes[name].type} onMouseDown={() => onNodeDown(nodes[name].position)} onMouseOver={() => onNodeOver(nodes[name].position)} />)
      }

      board.push(
        <div key={`row-${y}`} className='row'>
          {elements}
        </div>
      )
    }
  }

  return (
    <div className={className}>
      {board}
    </div>
  )
}

export default Board