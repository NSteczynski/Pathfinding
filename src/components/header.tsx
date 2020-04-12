import React from 'react'
import NumberInput from './fields/number'
import SelectField from './fields/select'
import { Settings, Algorithms } from '../core/types'

const Header: React.FunctionComponent<Settings & {
  onChange: (name: keyof Settings, value: Settings[keyof Settings]) => void
  onReset: () => void
}> = ({ rows, maxRows, columns, maxColumns, playingSpeed, isPlaying, isPaused, algorithm, onChange, onReset }) => (
  <div className='header'>
    <NumberInput name='rows' label={`Rows (2 - ${maxRows})`} value={rows} min={2} max={maxRows} step={1} disabled={isPlaying} onChange={onChange} />
    <NumberInput name='columns' label={`Columns (4 - ${maxColumns})`} value={columns} min={4} max={maxColumns} step={1} disabled={isPlaying} onChange={onChange} />
    <NumberInput name='playingSpeed' label='Animation speed (0.5 - 2.0)' value={playingSpeed} min={0.5} max={2.0} step={0.25} disabled={isPlaying} onChange={onChange} />
    <SelectField name='algorithm' label='Algorithm' value={algorithm} options={Algorithms} disabled={isPlaying} onChange={onChange} />
    <button onClick={() => isPlaying ? onChange('isPaused', !isPaused) : onChange('isPlaying', !isPlaying)}>{isPlaying ? isPaused ? 'Resume' : 'Pause' : 'Play'}</button>
    <button onClick={onReset}>Reset</button>
  </div>
)

export default Header