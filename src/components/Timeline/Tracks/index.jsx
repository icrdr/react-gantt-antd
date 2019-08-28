import React from 'react'
import PropTypes from 'prop-types'
import Track from './Track'

const Tracks = ({ tracks }) => {
  return (
    <div className="rt-tracks">
      {tracks.map(({ id, elements, isOpen, tracks: children }) => (
        <Track key={id} elements={elements} isOpen={isOpen} tracks={children} />
      ))}
    </div>
  )
}

Tracks.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.shape({})),
}

export default Tracks
