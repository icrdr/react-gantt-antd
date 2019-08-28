import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import TrackKeys from './TrackKeys'
import { globalContext } from '../../index'

const Body = ({ toggleTrackOpen, clickTrackButton }) => {
  const { tracks } = useContext(globalContext)
  return (
    <div className="rt-sidebar__body">
      <TrackKeys tracks={tracks} toggleOpen={toggleTrackOpen} clickTrackButton={clickTrackButton} />
    </div>
  )
}

Body.propTypes = {
  toggleTrackOpen: PropTypes.func,
  clickTrackButton: PropTypes.func,
}

export default Body
