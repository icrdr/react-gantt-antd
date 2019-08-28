import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import NowMarker from './Marker/Now'
import PointerMarker from './Marker/Pointer'
import getMouseX from '../../utils/getMouseX'
import { globalContext } from '../../index'
import Tracks from './Tracks'
import Grid from './Grid'

const Timeline = props => {
  const { sticky } = props
  const { now, time, tracks } = useContext(globalContext)

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
      <div className="rt-timeline__body">
        <Grid />
        <Tracks tracks={tracks} />
      </div>
    </div>
  )
}

Timeline.propTypes = {
  sticky: PropTypes.shape({}),
}

export default Timeline
