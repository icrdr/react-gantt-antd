import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import Body from './Body'
import NowMarker from './Marker/Now'
import PointerMarker from './Marker/Pointer'
import getMouseX from '../../utils/getMouseX'
import getGrid from '../../utils/getGrid'
import { globalContext } from '../../index'

const Timeline = props => {
  const { timebar, sticky, clickElement } = props
  const { now, time } = useContext(globalContext)
  const grid = getGrid(timebar)

  const [pointerDate, setPointerDate] = useState(null)
  const [pointerVisible, setPointerVisible] = useState(false)
  const [pointerHighlighted, setPointerHighlighted] = useState(false)

  const handleMouseMove = e => {
    setPointerDate(time.fromX(getMouseX(e)))
  }

  const handleMouseLeave = () => {
    setPointerHighlighted(false)
  }

  const handleMouseEnter = () => {
    setPointerHighlighted(true)
    setPointerVisible(true)
  }

  return (
    <div className="rt-timeline" style={{ width: time.timelineWidthStyle }}>
      {now && <NowMarker now={now} visible />}
      {pointerDate && (
        <PointerMarker date={pointerDate} visible={pointerVisible} highlighted={pointerHighlighted} />
      )}
      <Header
        timebar={timebar}
        onMove={handleMouseMove}
        onEnter={handleMouseEnter}
        onLeave={handleMouseLeave}
        width={time.timelineWidthStyle}
        sticky={sticky}
      />
      <Body grid={grid} clickElement={clickElement} />
    </div>
  )

}

Timeline.propTypes = {
  timebar: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
    }).isRequired
  ).isRequired,
  sticky: PropTypes.shape({}),
  clickElement: PropTypes.func,
}

export default Timeline
