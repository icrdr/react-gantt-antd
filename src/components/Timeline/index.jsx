import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import NowMarker from './Now'
import PointerMarker from './Pointer'
import getMouseX from '../../utils/getMouseX'
import { globalContext } from '../../index'
import Tracks from './Tracks'
import getGrid from '../../utils/getGrid'

const Timeline = props => {
  const { sticky } = props
  const { now, time, tracks, timebar } = useContext(globalContext)
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
        onMove={handleMouseMove}
        onEnter={handleMouseEnter}
        onLeave={handleMouseLeave}
        sticky={sticky}
      />
      <div className="rt-timeline__body">
        <div className="rt-grid">
          {grid.map(({ id, start, end }) => (
            <div key={id} className="rt-grid__cell" style={time.toStyleLeftAndWidth(start, end)} />
          ))}
        </div>
        <Tracks tracks={tracks} />
      </div>
    </div>
  )
}

Timeline.propTypes = {
  sticky: PropTypes.shape({}),
}

export default Timeline
