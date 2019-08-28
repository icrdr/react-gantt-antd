import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { globalContext } from '../../../index'
import Row from './Row'

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
