import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { globalContext } from '../../index'
import Timebar from './Timebar'
import { stickyContext } from '../Layout'
const noop = () => { }

const Header = ({ onMove, onEnter, onLeave }) => {
  const { timebar, time } = useContext(globalContext)
  const { sticky } = useContext(stickyContext)
  const { isSticky, headerHeight, viewportWidth, scrollLeft, setHeaderHeight, handleHeaderScrollY } = sticky

  const scroll = React.createRef()
  const refTimebar = React.createRef()

  useEffect(() => {
    if (sticky) {
      setHeaderHeight(refTimebar.current.offsetHeight)
      if (isSticky) {
        scroll.current.scrollLeft = scrollLeft
      }
    }
  }, [scrollLeft])

  const handleScroll = () => {
    handleHeaderScrollY(scroll.current.scrollLeft)
  }

  return (
    <div
      style={isSticky ? { paddingTop: headerHeight } : {}}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        className={`rt-timeline__header ${isSticky ? 'rt-is-sticky' : ''}`}
        style={isSticky ? { width: viewportWidth, height: headerHeight } : {}}
      >
        <div className="rt-timeline__header-scroll" ref={scroll} onScroll={isSticky ? handleScroll : noop}>
          <div ref={refTimebar} style={isSticky ? { width: time.timelineWidthStyle } : {}}>
            <Timebar rows={timebar} />
          </div>
        </div>
      </div>
    </div>
  )

}

Header.propTypes = {
  onMove: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
}

export default Header
