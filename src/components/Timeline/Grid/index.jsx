import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { globalContext } from '../../../index'
import getGrid from '../../../utils/getGrid'
const Grid = () => {
  const { time, timebar } = useContext(globalContext)
  const grid = getGrid(timebar)
  return (
    <div className="rt-grid">
      {grid.map(({ id, start, end }) => (
        <div key={id} className="rt-grid__cell" style={time.toStyleLeftAndWidth(start, end)} />
      ))}
    </div>
  )
}

export default Grid
