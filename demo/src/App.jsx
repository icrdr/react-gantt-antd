/* eslint-disable import/no-unresolved */
import React, { useState } from 'react'
import { Button } from 'antd'

import Gantt from 'react-gantt-antd'
import 'react-gantt-antd/lib/css/style.css'

import { buildProject } from './builders'
import { fill } from './utils'

const projectsById = fill(20).reduce((acc, i) => {
  const project = buildProject(i + 1)
  acc[project.id] = project
  return acc
}, {})

export default function App() {
  const [zoom, setZoom] = useState(1)
  const projects = Object.values(projectsById)

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Button style={{ marginRight: 12 }} onClick={() => setZoom(prevState => {
          if (prevState < 10) {
            return prevState + 1
          } else {
            return prevState
          }
        })}>放大</Button>
        <Button onClick={() => setZoom(prevState => {
          if (prevState > 1) {
            return prevState - 1
          } else {
            return prevState
          }
        })}>缩小</Button>
      </div><div>
        <Gantt
          start={new Date('2020-06-01 12:00:00')}
          end={new Date('2020-10-01 12:00:00')}
          zoom={zoom}
          projects={projects}
          now={new Date('2020-08-01 12:00:00')}
          enableSticky
          scrollToNow
        />
      </div>
    </>
  )
}