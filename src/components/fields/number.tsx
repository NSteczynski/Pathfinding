import React from 'react'
import { NumberInputParams } from '../../core/types'

const NumberInput: React.FunctionComponent<NumberInputParams> = ({ name, label, value, min, max, step, disabled, onChange }) => {
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = parseFloat(event.currentTarget.value) || min
    const newValue = inputValue < min ? min : inputValue > max ? max : inputValue
    onChange(name, newValue)
  }

  const onFocus = (event: React.FocusEvent<HTMLInputElement>) => event.currentTarget.select()

  return (
    <div className='field'>
      <label>{label}</label>
      <input type='number' value={value} onChange={onInputChange} onFocus={onFocus} step={step} disabled={disabled} />
    </div>
  )
}

export default NumberInput