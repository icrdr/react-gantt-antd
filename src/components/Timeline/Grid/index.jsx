import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { globalContext } from '../../../index'

const Grid = ({ grid }) => {
  const { time } = useContext(globalContext)
  return (
    <div className="rt-grid">
      {grid.map(({ id, start, end }) => (
        <div key={id} className="rt-grid__cell" style={time.toStyleLeftAndWidth(start, end)} />
      ))}
    </div>
  )
}

Grid.propTypes = {
  grid: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.instanceOf(Date).isRequired,
      end: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
}

export default Grid
