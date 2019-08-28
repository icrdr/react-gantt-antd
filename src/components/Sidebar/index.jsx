import React from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import Body from './Body'

const Sidebar = ({ toggleTrackOpen, sticky, clickTrackButton }) => (
  <div className="rt-sidebar">
    <Header sticky={sticky} />
    <Body toggleTrackOpen={toggleTrackOpen} clickTrackButton={clickTrackButton} />
  </div>
)

Sidebar.propTypes = {
  toggleTrackOpen: PropTypes.func,
  sticky: PropTypes.shape({}),
  clickTrackButton: PropTypes.func,
}

export default Sidebar
