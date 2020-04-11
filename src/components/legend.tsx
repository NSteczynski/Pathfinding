import React from 'react'
import { Dictionary } from '../core/types'
import { Capitalize } from '../core/functions'

const Legend: React.FunctionComponent<{
  items: Dictionary<string>
}> = ({ items }) => {
  const display = Object.keys(items).map(key => <span key={key} className={items[key]}>{Capitalize(items[key])}</span>)

  return (
    <div className='legend'>
      {display}
    </div>
  )
}

export default Legend