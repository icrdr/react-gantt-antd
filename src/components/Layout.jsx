import React, { useState, useEffect, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'

import Sidebar from './Sidebar'
import Timeline from './Timeline'
import { addListener, removeListener } from '../utils/events'
import raf from '../utils/raf'
import getNumericPropertyValue from '../utils/getNumericPropertyValue'
import { globalContext } from '../index'
const noop = () => { }

const Layout = ({ enableSticky, isOpen, time, scrollToNow, onLayoutChange, sidebarWidth, timelineViewportWidth }) => {
  const timeline = useRef(null)
  const layout = useRef(null)
  const sidebar = useRef(null)
  const [isSticky, setSticky] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const { now } = globalContext

  useEffect(() => {
    if (enableSticky) {
      addListener('scroll', handleScrollY)
      updateTimelineHeaderScroll()
      updateTimelineBodyScroll()
    }

    addListener('resize', handleLayoutChange)
    handleLayoutChange(() => {
      if (scrollToNow) {
        timeline.current.scrollLeft = time.toX(now) - 0.5 * calculateTimelineViewportWidth()
      }
    })

    return () => {
      if (enableSticky) {
        removeListener('scroll', handleScrollY)
        removeListener('resize', handleLayoutChange)
      }
    };
  }, [isOpen, scrollLeft])


  const updateTimelineBodyScroll = () => {
    timeline.current.scrollLeft = scrollLeft
  }

  const updateTimelineHeaderScroll = () => {
    const { scrollLeft } = timeline.current
    setScrollLeft(scrollLeft)
  }

  const handleHeaderScrollY = scrollLeft => {
    raf(() => {
      setScrollLeft(scrollLeft)
    })
  }

  const handleScrollY = () => {
    raf(() => {
      const { top, bottom } = timeline.current.getBoundingClientRect()
      setSticky(top <= 0 && bottom >= headerHeight)
    })
  }

  const handleScrollX = () => {
    raf(updateTimelineHeaderScroll)
  }

  const calculateSidebarWidth = () =>
    sidebar.current.offsetWidth + getNumericPropertyValue(layout.current, 'margin-left')

  const calculateTimelineViewportWidth = () => timeline.current.offsetWidth

  const handleLayoutChange = cb => {
    const nextSidebarWidth = calculateSidebarWidth()
    const nextTimelineViewportWidth = calculateTimelineViewportWidth()
    if (nextSidebarWidth !== sidebarWidth || nextTimelineViewportWidth !== timelineViewportWidth) {
      onLayoutChange(calculateTimelineViewportWidth(), calculateSidebarWidth())
    }
    if (cb) cb()
  }

  return (
    <div className={`rt-layout ${isOpen ? 'rt-is-open' : ''}`} ref={layout}>
      <div className="rt-layout__side" ref={sidebar}>
        <Sidebar
          sticky={{ isSticky, headerHeight, sidebarWidth }}
        />
      </div>
      <div className="rt-layout__main">
        <div className="rt-layout__timeline" ref={timeline} onScroll={isSticky ? handleScrollX : noop}>
          <Timeline
            sticky={{
              isSticky,
              setHeaderHeight: headerHeight => setHeaderHeight(headerHeight),
              viewportWidth: timelineViewportWidth,
              handleHeaderScrollY: handleHeaderScrollY,
              headerHeight,
              scrollLeft,
            }}
          />
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
  onLayoutChange: PropTypes.func.isRequired,
  sidebarWidth: PropTypes.number,
  timelineViewportWidth: PropTypes.number,
}

export default Layout
