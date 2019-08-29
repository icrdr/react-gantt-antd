import React, { useState, useEffect, useContext, useRef } from 'react'
import PropTypes from 'prop-types'

import { globalContext } from '../index'
import TrackKeys from './Sidebar/TrackKeys'
import Timebar from './Timeline/Timebar'
import NowMarker from './Timeline/Now'
import PointerMarker from './Timeline/Pointer'
import getMouseX from '../utils/getMouseX'
import Tracks from './Timeline/Tracks'
import getGrid from '../utils/getGrid'
import useEvent from '../hooks/useEvent'

const noop = () => { }
export const stickyContext = React.createContext();

const Layout = ({ enableSticky, isOpen }) => {
  const { now, time, tracks, timebar, sidebarWidth, scrollToNow, viewportWidth } = useContext(globalContext)
  const refTimeline = useRef(null)
  const refScroll = useRef(null)
  const refTimebar = useRef(null)

  const grid = getGrid(timebar)
  const [isSticky, setSticky] = useState(false)
  const [pointerDate, setPointerDate] = useState(null)
  const [pointerVisible, setPointerVisible] = useState(false)
  const [pointerHighlighted, setPointerHighlighted] = useState(false)

  let headerHeight = 0
  if (refTimebar.current) {
    headerHeight = refTimebar.current.offsetHeight
  }

  useEffect(() => {
    if (isSticky) {
      refScroll.current.scrollLeft = refTimeline.current.scrollLeft
    }
  }, [isSticky])

  useEffect(() => {
    if (scrollToNow) {
      refTimeline.current.scrollLeft = time.toX(now) - 0.5 * refTimeline.current.offsetWidth
    }
  }, [refTimeline.current])

  const handleScrollY = () => {
    const { top, bottom } = refTimeline.current.getBoundingClientRect()
    setSticky(top <= 0 && bottom >= headerHeight)
  }

  if (enableSticky) {
    useEvent('scroll', handleScrollY, true, [isOpen])
  }

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

  const handleScrollX = () => {
    refScroll.current.scrollLeft = refTimeline.current.scrollLeft
  }

  const handleScroll = () => {
    refTimeline.current.scrollLeft = refScroll.current.scrollLeft
  }

  return (
    <div className={`rt-layout ${isOpen ? 'rt-is-open' : ''}`}>
      <div className="rt-layout__side" style={{ width: sidebarWidth }}>
        <div className="rt-sidebar">
          <div style={{ paddingTop: isSticky ? headerHeight : '' }}>
            <div
              className={`rt-sidebar__header ${isSticky ? 'rt-is-sticky' : ''}`}
              style={isSticky ? { width: sidebarWidth } : {}}
            >
              {timebar.map(({ id, title }) => (
                <div key={id} className="rt-timebar-key">
                  {title}
                </div>
              ))}
            </div>
          </div>
          <div className="rt-sidebar__body">
            <TrackKeys tracks={tracks} />
          </div>
        </div>
      </div>
      <div className="rt-layout__main" style={{ width: `calc(100% - ${sidebarWidth}px)` }}>
        <div className="rt-layout__timeline" ref={refTimeline} onScroll={isSticky ? handleScrollX : noop}>
          <div className="rt-timeline" style={{ width: time.timelineWidthStyle }}>
            {now && <NowMarker now={now} visible />}
            {pointerDate && (
              <PointerMarker date={pointerDate} visible={pointerVisible} highlighted={pointerHighlighted} />
            )}
            <div
              style={isSticky ? { paddingTop: headerHeight } : {}}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={`rt-timeline__header ${isSticky ? 'rt-is-sticky' : ''}`}
                style={isSticky ? { width: viewportWidth, height: headerHeight } : {}}
              >
                <div className="rt-timeline__header-scroll" ref={refScroll} onScroll={isSticky ? handleScroll : noop}>
                  <div ref={refTimebar} style={isSticky ? { width: time.timelineWidthStyle } : {}}>
                    <Timebar rows={timebar} />
                  </div>
                </div>
              </div>
            </div>
            <div className="rt-timeline__body">
              <div className="rt-grid">
                {grid.map(({ id, start, end }) => (
                  <div key={id} className="rt-grid__cell" style={time.toStyleLeftAndWidth(start, end)} />
                ))}
              </div>
              <Tracks tracks={tracks} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Layout.propTypes = {
  enableSticky: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool,
  time: PropTypes.shape({}).isRequired,
  scrollToNow: PropTypes.bool,
}

export default Layout
