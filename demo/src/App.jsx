/* eslint-disable import/no-unresolved */
import React, { useState } from 'react'
import Gantt from 'react-gantt-antd'
import 'react-gantt-antd/lib/css/style.css'

import { buildTrack } from './builders'
import { fill } from './utils'

const tracksById = fill(20).reduce((acc, i) => {
  const track = buildTrack(i + 1)
  acc[track.id] = track
  return acc
}, {})

export default function App() {
  const [zoom, setZoom] = useState(5)
  const [tracks, setTracks] = useState(Object.values(tracksById))

  const handleToggleTrackOpen = track => {
    setTracks(state => {
      for (const _track of state) {
        if (_track.id === track.id) {
          _track.isOpen = !track.isOpen
        }
      }
      return [...state]
    })
  }

  return (
    <div>
      <Gantt
        scale={{
          start: new Date('2020-06-01 12:00:00'),
          end: new Date('2022-10-01 12:00:00'),
          zoom: zoom,
          zoomMin: 2,
          zoomMax: 10,
        }}
        tracks={tracks}
        now={new Date('2021-06-01 12:00:00')}
        clickElement={element => { }}
        clickTrackButton={track => { }}
        toggleTrackOpen={handleToggleTrackOpen}
        enableSticky
        scrollToNow
      />
    </div>
  )
}