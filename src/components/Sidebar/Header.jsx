import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { globalContext } from '../../index'
const Header = ({ sticky: { isSticky, sidebarWidth, headerHeight } = {} }) => {
  const { timebar } = useContext(globalContext)
  return (
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
  )
}

Header.propTypes = {
  sticky: PropTypes.shape({
    isSticky: PropTypes.bool.isRequired,
    headerHeight: PropTypes.number.isRequired,
    sidebarWidth: PropTypes.number.isRequired,
  }),
}

export default Header
