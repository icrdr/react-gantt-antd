import React, { useState, useEffect, useContext, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'

import { globalContext } from '../index'
import ProjectKeys from './Sidebar/ProjectKeys'
import Timebar from './Timeline/Timebar'
import NowMarker from './Timeline/Now'
import PointerMarker from './Timeline/Pointer'
import getMouseX from '../utils/getMouseX'
import Projects from './Timeline/Projects'
import getGrid from '../utils/getGrid'
import useEvent from '../hooks/useEvent'

const noop = () => { }
export const stickyContext = React.createContext();

const Layout = ({ enableSticky, scrollToNow, timebar, sidebarWidth, projects }) => {
  const { now, time } = useContext(globalContext)
  const refTimeline = useRef(null)
  const refScroll = useRef(null)
  const refTimebar = useRef(null)

  const grid = getGrid(timebar)
  const [isSticky, setSticky] = useState(false)
  const [hasShadow, setShadow] = useState(true)
  const [pointerDate, setPointerDate] = useState(null)
  const [pointerVisible, setPointerVisible] = useState(false)
  const [pointerHighlighted, setPointerHighlighted] = useState(false)

  let headerHeight = 0
  if (refTimebar.current) {
    headerHeight = refTimebar.current.offsetHeight
  }

  useEffect(() => {
    if (isSticky && refScroll.current && refTimeline.current) {
      refScroll.current.scrollLeft = refTimeline.current.scrollLeft
    }
  }, [isSticky])

  useEffect(() => {
    if (scrollToNow && refTimeline.current) {
      refTimeline.current.scrollLeft = time.toX(now) - 0.5 * refTimeline.current.offsetWidth
    }
  }, [refTimeline.current])


  const handleScroll = useCallback(() => {
    if (refTimeline.current) {
      const { top, bottom } = refTimeline.current.getBoundingClientRect()
      setSticky(top <= 0 && bottom >= headerHeight)

      if (refTimeline.current.scrollLeft === 0) {
        setShadow(false)
      } else {
        setShadow(true)
      }
    }
  })

  if (enableSticky) {
    useEvent('scroll', handleScroll)
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

  const handleScrollBody = () => {
    if (refTimeline.current && refScroll.current) {
      refScroll.current.scrollLeft = refTimeline.current.scrollLeft
    }

  }


  const handleScrollHeader = () => {
    if (refTimeline.current && refScroll.current) {
      refTimeline.current.scrollLeft = refScroll.current.scrollLeft
    }
  }

  return (
    <div className={`rt-layout rt-is-open`}>
      <div className="rt-layout__side" style={{ width: sidebarWidth }}>
        <div className={`rt-sidebar ${hasShadow ? 'rt-sidebar-shadow' : ''}`}>
          <div style={{ paddingTop: isSticky ? headerHeight : '' }}>
            <div
              className={`rt-sidebar__header ${isSticky ? 'rt-is-sticky' : ''}`}
              style={isSticky ? { width: sidebarWidth } : {}}
            >
              {timebar.slice(1, 3).map(({ id, title }) => (
                <div key={id} className="rt-timebar-key">
                  {title}
                </div>
              ))}
            </div>
          </div>
          <div className="rt-sidebar__body">
            <ProjectKeys projects={projects} />
          </div>
        </div>
      </div>
      <div className="rt-layout__main" style={{ width: `calc(100% - ${sidebarWidth}px)` }}>
        <div className="rt-layout__timeline" ref={refTimeline} onScroll={isSticky ? handleScrollBody : noop}>
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
                style={isSticky ? { width: `calc(100% - ${sidebarWidth}px)`, height: headerHeight } : {}}
              >
                <div className="rt-timeline__header-scroll" ref={refScroll} onScroll={isSticky ? handleScrollHeader : noop}>
                  <div ref={refTimebar} style={isSticky ? { width: time.timelineWidthStyle } : {}}>
                    <Timebar rows={timebar.slice(1, 3)} />
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
              <Projects projects={projects} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Layout.propTypes = {
  enableSticky: PropTypes.bool.isRequired,
  scrollToNow: PropTypes.bool,
}

export default Layout
