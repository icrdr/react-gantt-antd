import React, { useContext, useRef } from 'react'
import PropTypes from 'prop-types'
import { globalContext } from '../../index'

const Cell = ({ title, start, end, style }) => {
  const { time } = useContext(globalContext)
  return (
    <div className="rt-timebar__cell" style={{
      height: '100%',
      ...time.toStyleLeftAndWidth(start, end),
      ...style
    }}>
      {title}
    </div>
  )
}

const Row = ({ cells, style }) => {
  const { time } = useContext(globalContext)
  let props = {}
  if (time.timelineWidth / cells.length < 22) {
    props = {
      title: ''
    }
  }
  return (
    <div className="rt-timebar__row" style={style}>
      {cells.map(cell => (
        <Cell key={cell.id} {...cell} {...props} />
      ))}
    </div>
  )
}

const Timebar = ({ rows }) => {
  const { time } = useContext(globalContext)
  return (
    <div className="rt-timebar">
      {rows.map(({ id, title, cells, style }) => (
        <Row key={id} title={title} cells={cells} style={style} />
      ))}
    </div>
  )
}

Timebar.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

export default Timebar
