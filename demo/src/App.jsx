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
  const [zoom, setZoom] = useState(1)
  const tracks = Object.values(tracksById)

  return (
    <div>
      <button onClick={() => setZoom(prevState => {
        if (prevState < 10) {
          return prevState + 1
        } else {
          return prevState
        }
      })}>放大</button>
      <button onClick={() => setZoom(prevState => {
        console.log(prevState)
        if (prevState > 1) {
          return prevState - 1
        } else {
          return prevState
        }
      })}>缩小</button>
      <Gantt
        start={new Date('2020-06-01 12:00:00')}
        end={new Date('2020-10-01 12:00:00')}
        zoom={zoom}
        tracks={tracks}
        now={new Date('2020-08-01 12:00:00')}
        clickElement={element => { }}
        enableSticky
        scrollToNow
      />
    </div>
  )
}