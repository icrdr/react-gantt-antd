import React from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import Body from './Body'

const Sidebar = ({ timebar, toggleTrackOpen, sticky, clickTrackButton }) => (
  <div className="rt-sidebar">
    <Header timebar={timebar} sticky={sticky} />
    <Body toggleTrackOpen={toggleTrackOpen} clickTrackButton={clickTrackButton} />
  </div>
)

Sidebar.propTypes = {
  timebar: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
    }).isRequired
  ).isRequired,
  toggleTrackOpen: PropTypes.func,
  sticky: PropTypes.shape({}),
  clickTrackButton: PropTypes.func,
}

export default Sidebar
