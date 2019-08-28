import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import TrackKeys from '.'
import { globalContext } from '../../../index'
const TrackKey = ({ track }) => {
  const { clickTrackButton, toggleTrackOpen } = useContext(globalContext)
  const { title, tracks, isOpen, hasButton, sideComponent } = track

  const isExpandable = isOpen !== undefined

  const buildSideComponent = () => {
    if (sideComponent) {
      return React.cloneElement(sideComponent)
    }
    if (hasButton && clickTrackButton) {
      const handleClick = () => clickTrackButton(track)
      return <button className="rt-track-key__side-button" onClick={handleClick} type="button" />
    }

    return null
  }

  return (
    <li className="rt-track-key">
      <div className="rt-track-key__entry">
        {isExpandable && (
          <div
            style={{ marginRight: '12px' }}
            onClick={() => toggleTrackOpen(track)}
          >
            {!isOpen ? (
              <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="right" width="12px" height="12px" fill="currentColor" aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path></svg>
            ) : (
                <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="right" width="12px" height="12px" fill="currentColor" aria-hidden="true" style={{ transform: 'rotate(90deg)' }}><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path></svg>
              )}

          </div>
        )}
        <span className="rt-track-key__title">{title}</span>
        {buildSideComponent()}
      </div>
      {isOpen && tracks && tracks.length > 0 && <TrackKeys tracks={tracks} />}
    </li>
  )
}

TrackKey.propTypes = {
  track: PropTypes.shape({
    title: PropTypes.element.isRequired,
    tracks: PropTypes.arrayOf(PropTypes.shape({})),
    isOpen: PropTypes.bool,
    hasButton: PropTypes.bool,
  }),
}


export default TrackKey
