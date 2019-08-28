import React, { useState, useEffect, useContext, useRef } from 'react'
import PropTypes from 'prop-types'

import Sidebar from './Sidebar'
import Timeline from './Timeline'
import { addListener, removeListener } from '../utils/events'
import getNumericPropertyValue from '../utils/getNumericPropertyValue'
import { globalContext } from '../index'
const noop = () => { }
export const stickyContext = React.createContext();

const Layout = ({ enableSticky, isOpen, time, scrollToNow }) => {
  const timeline = useRef(null)
  const layout = useRef(null)
  const sidebar = useRef(null)
  const [isSticky, setSticky] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [timelineViewportWidth, setTimelineViewportWidth] = useState(0)
  const { now, sidebarWidth } = useContext(globalContext)
  useEffect(() => {
    if (scrollToNow) {
      timeline.current.scrollLeft = time.toX(now) - 0.5 * timeline.current.offsetWidth
    }
    setTimelineViewportWidth(timeline.current.offsetWidth)
  }, [])

  useEffect(() => {
    if (enableSticky) {
      addListener('scroll', handleScrollY)
    }

    return () => {
      if (enableSticky) {
        removeListener('scroll', handleScrollY)
      }
    };
  }, [isOpen, scrollLeft])

  const handleScrollY = () => {
    const { top, bottom } = timeline.current.getBoundingClientRect()
    setSticky(top <= 0 && bottom >= headerHeight)
  }

  const updateTimelineHeaderScroll = () => {
    // console.log(timeline.current.scrollLeft)
    setScrollLeft(timeline.current.scrollLeft)
  }

  const handleScrollX = () => {
    updateTimelineHeaderScroll()
  }

  const handleHeaderScrollY = _scrollLeft => {
    setScrollLeft(_scrollLeft)
  }

  const sticky = {
    isSticky,
    setHeaderHeight: headerHeight => setHeaderHeight(headerHeight),
    viewportWidth: timelineViewportWidth,
    headerHeight,
    scrollLeft,
    handleHeaderScrollY: handleHeaderScrollY,
  }

  return (
    <stickyContext.Provider value={{ sticky }}>
      <div className={`rt-layout ${isOpen ? 'rt-is-open' : ''}`} ref={layout}>
        <div className="rt-layout__side" style={{ width: sidebarWidth }} ref={sidebar}>
          <Sidebar
            sticky={{ isSticky, headerHeight }}
          />
        </div>
        <div className="rt-layout__main" style={{ width: `calc(100% - ${sidebarWidth}px)` }}>
          <div className="rt-layout__timeline" ref={timeline} onScroll={isSticky ? handleScrollX : noop}>
            <Timeline />
          </div>
        </div>
      </div>
    </stickyContext.Provider>
  )
}

Layout.propTypes = {
  enableSticky: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool,
  time: PropTypes.shape({}).isRequired,
  scrollToNow: PropTypes.bool,
  onLayoutChange: PropTypes.func.isRequired,
}

export default Layout
