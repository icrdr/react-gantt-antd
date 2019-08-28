import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import Body from './Body'
import NowMarker from './Marker/Now'
import PointerMarker from './Marker/Pointer'
import getMouseX from '../../utils/getMouseX'
import { globalContext } from '../../index'

const Timeline = props => {
  const { sticky } = props
  const { now, time } = useContext(globalContext)

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
        onMove={handleMouseMove}
        onEnter={handleMouseEnter}
        onLeave={handleMouseLeave}
        sticky={sticky}
      />
      <Body />
    </div>
  )

}

Timeline.propTypes = {
  sticky: PropTypes.shape({}),
}

export default Timeline
