import React from 'react'
import PropTypes from 'prop-types'

import TrackKey from './TrackKey'

const TrackKeys = ({ tracks }) => {
  return (
    <ul className="rt-track-keys">
      {tracks.map(track => (
        <TrackKey key={track.id} track={track} />
      ))}
    </ul>
  )
}

TrackKeys.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.shape({})),
}

export default TrackKeys
