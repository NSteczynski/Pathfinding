import React from 'react'
import Header from './components/header'
import Legend from './components/legend'
import Board from './components/board'
import Dijkstra from './core/dijkstra'
import { defaultSettings, defaultBoardMouseEvents, AlgorithmInterval } from './core/settings'
import { Empty, Settings, NodeTypes, Dictionary, NodeParams, BoardMouseEvents, Vector } from './core/types'
import { getMaxRows, getMaxColumns, getNodeStartPosition, getNodeEndPosition } from './core/functions'

const App: React.FunctionComponent<Empty> = () => {
  const [settings, setSettings] = React.useState<Settings>(defaultSettings)
  const [nodes, setNodes] = React.useState<Dictionary<NodeParams>>({})
  const [boardMouseEvents, setBoardMouseEvents] = React.useState<BoardMouseEvents>(defaultBoardMouseEvents)

  React.useEffect((): () => void => {
    window.addEventListener('resize', onResize)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  React.useEffect((): void => {
    const startNode = getNodeStartPosition(settings.columns, settings.rows)
    const endNode = getNodeEndPosition(settings.columns, settings.rows)
    const newNodes: Dictionary<NodeParams> = {}
    for (let x = 0; x < settings.columns; ++x)
      for (let y = 0; y < settings.rows; ++y)
        newNodes[`${x}-${y}`] = { type: NodeTypes.UNVISITED, position: { x, y } }

    setSettings(prevState => ({ ...prevState, startNode, endNode, isPlaying: false }))
    setNodes(newNodes)
  }, [settings.rows, settings.columns])

  React.useEffect((): void => {
    if (!settings.isPlaying)
      return undefined
    const newNodes = clearVisitedAndPathNodes()
    const [nodeParams, path] = Dijkstra(newNodes, settings.rows, settings.columns, settings.startNode, settings.endNode)
    const playTime = AlgorithmInterval / settings.playingSpeed
    for (let i = 0, l = nodeParams.length; i < l; ++i)
      setTimeout(() => changeNodeType(nodeParams[i].position, nodeParams[i].type), playTime * i)
    for (let i = 0, l = path.length; i < l; ++i)
      setTimeout(() => changeNodeType(path[i].position, path[i].type), playTime * (nodeParams.length + i))
    setTimeout(() => onChange('isPlaying', false), playTime * (nodeParams.length + path.length))
    setNodes(newNodes)
  }, [settings.isPlaying])

  const onResize = (): void => {
    const maxRows = getMaxRows()
    const maxColumns = getMaxColumns()
    setSettings(prevState => ({ ...prevState, rows: maxRows, maxRows, columns: maxColumns, maxColumns }))
  }

  const onChange = (name: keyof Settings, value: Settings[keyof Settings]): void => setSettings({ ...settings, [name]: value })
  const onMouseUp = (): void => setBoardMouseEvents(prevState => ({ ...prevState, ...defaultBoardMouseEvents }))
  const onMouseDown = (): void => setBoardMouseEvents(prevState => ({ ...prevState, isMouseDown: true }))
  const onStartNode = (): void => setBoardMouseEvents(prevState => ({ ...prevState, isNodeStartDown: true }))
  const onEndNode = (): void => setBoardMouseEvents(prevState => ({ ...prevState, isNodeEndDown: true }))

  const onPathClear = (): void => {
    const newNodes = clearVisitedAndPathNodes()
    setNodes(newNodes)
  }

  const onNodeDown = (position: Vector): void => {
    if (settings.isPlaying)
      return undefined
    const name = `${position.x}-${position.y}`
    const type = nodes[name].type
    if (type === NodeTypes.UNVISITED)
      return changeNodeType(position, NodeTypes.WALL)
    if (type === NodeTypes.WALL)
      return changeNodeType(position, NodeTypes.UNVISITED)
  }

  const onNodeOver = (position: Vector): void => {
    if (!boardMouseEvents.isMouseDown || settings.isPlaying)
      return undefined
    const name = `${position.x}-${position.y}`
    const type = nodes[name].type
    if ((boardMouseEvents.isNodeStartDown  || boardMouseEvents.isNodeEndDown) && type === NodeTypes.WALL)
      return undefined
    if (boardMouseEvents.isNodeStartDown && type !== NodeTypes.WALL)
      return onChange('startNode', position)
    if (boardMouseEvents.isNodeEndDown && type !== NodeTypes.WALL)
      return onChange('endNode', position)
    if (type === NodeTypes.UNVISITED)
      return changeNodeType(position, NodeTypes.WALL)
    if (type === NodeTypes.WALL)
      return changeNodeType(position, NodeTypes.UNVISITED)
  }

  const clearVisitedAndPathNodes = (): Dictionary<NodeParams> => {
    const newNodes = { ...nodes }
    const keys = Object.keys(newNodes)
    for (let i = 0, l = keys.length; i < l; ++i)
      if (newNodes[keys[i]].type === NodeTypes.VISITED || newNodes[keys[i]].type === NodeTypes.PATH)
        newNodes[keys[i]].type = NodeTypes.UNVISITED
    return newNodes
  }

  const changeNodeType = (position: Vector, type: NodeTypes): void => {
    const name = `${position.x}-${position.y}`
    if (nodes[name] == undefined)
      return undefined
    setNodes(prevState => ({
      ...prevState,
      [name]: {
        ...nodes[name],
        type
      }
    }))
  }

  return (
    <React.Fragment>
      <Header {...settings} onChange={onChange} onPathClear={onPathClear} />
      <Legend items={NodeTypes} />
      <Board {...settings} nodes={nodes} onStartNode={onStartNode} onEndNode={onEndNode} onNodeDown={onNodeDown} onNodeOver={onNodeOver} />
    </React.Fragment>
  )
}

export default App