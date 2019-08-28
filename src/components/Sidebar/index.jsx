import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import TrackKeys from './TrackKeys'
import { globalContext } from '../../index'

const Sidebar = ({ sticky }) => {
  const { isSticky, sidebarWidth, headerHeight } = sticky
  const { tracks, timebar } = useContext(globalContext)
  return (
    <div className="rt-sidebar">
      <div style={isSticky ? { paddingTop: headerHeight } : {}}>
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
  )
}

Sidebar.propTypes = {
  sticky: PropTypes.shape({}),
}

export default Sidebar
