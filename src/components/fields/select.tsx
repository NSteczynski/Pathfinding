import React from 'react'
import { SelectFieldParams } from '../../core/types'
import { Capitalize } from '../../core/functions'

const SelectField: React.FunctionComponent<SelectFieldParams> = ({ name, label, value, options, disabled, onChange }) => {
  const [isOpen, setOpen] = React.useState<boolean>(false)
  const select = React.useRef<HTMLParagraphElement>(null)

  React.useEffect((): () => void => {
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [])

  const onClick = (event: MouseEvent): void => {
    let target: HTMLElement | null = event.target as HTMLElement
    while(target) {
      if (target == select.current)
        return undefined
      target = target.parentElement
    }
    setOpen(false)
  }

  const list = Object.keys(options).map(key => {
    const className = options[key] === value ? 'active' : ''
    return <li key={key} className={className} onClick={() => onChange(name, options[key])}>{Capitalize(options[key])}</li>
  })
  const className = 'select' + (disabled ? ' disabled' : '') + (isOpen ? ' open' : '')

  return (
    <div className='field'>
      <label>{label}</label>
      <div className={className}>
        <p ref={select} onClick={() => !disabled && setOpen(!isOpen)}>{Capitalize(value)}</p>
        <ul>
          {list}
        </ul>
      </div>
    </div>
  )
}

export default SelectField