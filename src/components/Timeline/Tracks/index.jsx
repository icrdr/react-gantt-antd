import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { globalContext } from '../../../index'
import Track from './Track'

const Tracks = ({ clickElement }) => {
  const { tracks } = useContext(globalContext)
  return (
    <div className="rt-tracks">
      {tracks.map(({ id, elements, isOpen, tracks: children }) => (
        <Track key={id} elements={elements} isOpen={isOpen} tracks={children} clickElement={clickElement} />
      ))}
    </div>
  )
}

Tracks.propTypes = {
  clickElement: PropTypes.func,
}

export default Tracks
