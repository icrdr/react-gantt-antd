import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Sidebar from '../Sidebar'
import Timeline from '../Timeline'
import { addListener, removeListener } from '../../utils/events'
import raf from '../../utils/raf'
import getNumericPropertyValue from '../../utils/getNumericPropertyValue'

const noop = () => { }

class Layout extends PureComponent {
  constructor(props) {
    super(props)

    this.timeline = React.createRef()
    this.layout = React.createRef()
    this.sidebar = React.createRef()

    this.state = {
      isSticky: false,
      headerHeight: 0,
      scrollLeft: 0,
    }
  }

  componentDidMount() {
    const { enableSticky } = this.props

    if (enableSticky) {
      addListener('scroll', this.handleScrollY)
      this.updateTimelineHeaderScroll()
      this.updateTimelineBodyScroll()
    }

    addListener('resize', this.handleResize)
    this.handleLayoutChange(() => this.scrollToNow())
  }

  componentDidUpdate(prevProps, prevState) {
    const { enableSticky, isOpen } = this.props
    const { isSticky, scrollLeft } = this.state

    if (enableSticky && isSticky) {
      if (!prevState.isSticky) {
        this.updateTimelineHeaderScroll()
      }

      if (scrollLeft !== prevState.scrollLeft) {
        this.updateTimelineBodyScroll()
      }
    }

    if (isOpen !== prevProps.isOpen) {
      this.handleLayoutChange()
    }
  }

  componentWillUnmount() {
    const { enableSticky } = this.props

    if (enableSticky) {
      removeListener('scroll', this.handleScrollY)
      removeListener('resize', this.handleResize)
    }
  }

  setHeaderHeight = headerHeight => {
    this.setState({ headerHeight })
  }

  scrollToNow = () => {
    const { time, scrollToNow, now } = this.props
    if (scrollToNow) {
      this.timeline.current.scrollLeft = time.toX(now) - 0.5 * this.calculateTimelineViewportWidth()
    }
  }

  updateTimelineBodyScroll = () => {
    const { scrollLeft } = this.state
    this.timeline.current.scrollLeft = scrollLeft
  }

  updateTimelineHeaderScroll = () => {
    const { scrollLeft } = this.timeline.current
    this.setState({ scrollLeft })
  }

  handleHeaderScrollY = scrollLeft => {
    raf(() => {
      this.setState({ scrollLeft })
    })
  }

  handleScrollY = () => {
    raf(() => {
      const { headerHeight } = this.state
      const markerHeight = 0
      const { top, bottom } = this.timeline.current.getBoundingClientRect()
      const isSticky = top <= -markerHeight && bottom >= headerHeight
      this.setState(() => ({ isSticky }))
    })
  }

  handleScrollX = () => {
    raf(this.updateTimelineHeaderScroll)
  }

  calculateSidebarWidth = () =>
    this.sidebar.current.offsetWidth + getNumericPropertyValue(this.layout.current, 'margin-left')

  calculateTimelineViewportWidth = () => this.timeline.current.offsetWidth

  handleLayoutChange = cb => {
    const { sidebarWidth, timelineViewportWidth, onLayoutChange } = this.props
    const nextSidebarWidth = this.calculateSidebarWidth()
    const nextTimelineViewportWidth = this.calculateTimelineViewportWidth()
    if (nextSidebarWidth !== sidebarWidth || nextTimelineViewportWidth !== timelineViewportWidth) {
      onLayoutChange(this.calculateTimelineViewportWidth(), this.calculateSidebarWidth())
    }
    if (cb) cb()
  }

  handleResize = () => this.handleLayoutChange()

  render() {
    const {
      isOpen,
      timebar,
      toggleTrackOpen,
      sidebarWidth,
      timelineViewportWidth,
      clickElement,
      clickTrackButton,
    } = this.props

    const { isSticky, headerHeight, scrollLeft } = this.state
    return (
      <div className={`rt-layout ${isOpen ? 'rt-is-open' : ''}`} ref={this.layout}>
        <div className="rt-layout__side" ref={this.sidebar}>
          <Sidebar
            timebar={timebar}
            toggleTrackOpen={toggleTrackOpen}
            sticky={{ isSticky, headerHeight, sidebarWidth }}
            clickTrackButton={clickTrackButton}
          />
        </div>
        <div className="rt-layout__main">
          <div className="rt-layout__timeline" ref={this.timeline} onScroll={isSticky ? this.handleScrollX : noop}>
            <Timeline
              timebar={timebar}
              sticky={{
                isSticky,
                setHeaderHeight: this.setHeaderHeight,
                viewportWidth: timelineViewportWidth,
                handleHeaderScrollY: this.handleHeaderScrollY,
                headerHeight,
                scrollLeft,
              }}
              clickElement={clickElement}
            />
          </div>
        </div>
      </div>
    )
  }
}

Layout.propTypes = {
  enableSticky: PropTypes.bool.isRequired,
  timebar: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isOpen: PropTypes.bool,
  time: PropTypes.shape({}).isRequired,
  toggleTrackOpen: PropTypes.func,
  scrollToNow: PropTypes.bool,
  onLayoutChange: PropTypes.func.isRequired,
  sidebarWidth: PropTypes.number,
  timelineViewportWidth: PropTypes.number,
  clickElement: PropTypes.func,
  clickTrackButton: PropTypes.func,
}

export default Layout
