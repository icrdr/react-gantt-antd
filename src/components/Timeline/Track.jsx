import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { globalContext } from '../../index'
import Tracks from './Tracks'
import Element from './Element'

const Track = ({ elements, isOpen, tracks }) => {
  const { time, clickElement } = useContext(globalContext)
  return (
    <div className="tr-track">
      <div className="rt-track__elements">
        {elements
          .filter(({ start, end }) => end > start)
          .map((element, i) => (
            <Element key={element.id} index={i} time={time} clickElement={clickElement} {...element} />
          ))}
      </div>
      {isOpen && tracks && tracks.length > 0 && <Tracks tracks={tracks} />}
    </div>
  )
}

Track.propTypes = {
  isOpen: PropTypes.bool,
  elements: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  tracks: PropTypes.arrayOf(PropTypes.shape({})),
}

export default Track
