import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { globalContext } from '../../index'

const Cell = ({ time, title, start, end, style }) => (
  <div className="rt-timebar__cell" style={{
    ...time.toStyleLeftAndWidth(start, end),
    ...style
  }}>
    {title}
  </div>
)

const Row = ({ time, cells, style }) => (
  <div className="rt-timebar__row" style={style}>
    {cells.map(cell => (
      <Cell key={cell.id} time={time} {...cell} />
    ))}
  </div>
)

const Timebar = ({ rows }) => {
  const { time } = useContext(globalContext)
  return (
    <div className="rt-timebar">
      {rows.map(({ id, title, cells, style }) => (
        <Row key={id} time={time} title={title} cells={cells} style={style} />
      ))}
    </div>
  )
}

Timebar.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

export default Timebar
