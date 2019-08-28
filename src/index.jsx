import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Layout from './components/Layout'
import createTime from './utils/time'

export const globalContext = React.createContext();

function Gantt({
  isOpen = true,
  scale,
  tracks,
  now,
  headWidth,
  toggleTrackOpen,
  enableSticky = false,
  scrollToNow,
  clickElement,
  clickTrackButton
}) {

  const { start, end, zoom, zoomMin, zoomMax } = scale
  const [time, setTime] = useState(createTime({ ...scale, viewportWidth: 0 }))
  const [timelineViewportWidth, setTimelineViewportWidth] = useState(0)
  const [sidebarWidth, setSidebarWidth] = useState(0)

  const buildMonthCells = () => {
    const v = []
    function getMonthAdd(y, m) {
      while (m >= 12) {
        m -= 12
        y += 1
      }
      return new Date(`${y}-${m + 1}-1 0:0:0`)
    }
    const month_count = end.getMonth() - start.getMonth() + (12 * (end.getFullYear() - start.getFullYear())) + 1
    for (let i = 0; i < month_count; i += 1) {

      const start_date = getMonthAdd(start.getFullYear(), start.getMonth() + i)
      const end_date = getMonthAdd(start.getFullYear(), start.getMonth() + i + 1)
      v.push({
        id: `m${i}`,
        title: `${(start.getMonth() + i) % 12 + 1}月`,
        start: start_date,
        end: end_date,
      })
    }
    return v
  }
  const buildDayCells = () => {
    const v = []
    const start_floor = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 0, 0, 0)
    const day_count = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1
    for (let i = 0; i < day_count; i += 1) {
      const start_date = new Date(start_floor.getTime() + i * 1000 * 60 * 60 * 24)
      const end_date = new Date(start_floor.getTime() + (i + 1) * 1000 * 60 * 60 * 24)
      v.push({
        id: `d${i}`,
        title: `${start_date.getDate()}`,
        start: start_date,
        end: end_date,
        style: {
          backgroundColor: start_date.getDay() === 0 ? '#1890ff' : '',
          color: start_date.getDay() === 0 ? '#fff' : ''
        }
      })
    }
    return v
  }
  const buildWeekCells = () => {
    const v = []
    const start_floor = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 0, 0, 0)
    const week_count = Math.floor((end - start) / (1000 * 60 * 60 * 24 * 7)) + 2
    for (let i = 0; i < week_count; i += 1) {
      const start_date = new Date(start_floor.getTime() + (i * 7 - start_floor.getDay()) * 1000 * 60 * 60 * 24)
      const end_date = new Date(start_floor.getTime() + ((i + 1) * 7 - start_floor.getDay()) * 1000 * 60 * 60 * 24)
      v.push({
        id: `w${i}`,
        title: ``,
        start: start_date,
        end: end_date
      })
    }
    return v
  }

  const timebar = [
    {
      id: 'weeks',
      title: '',
      cells: buildWeekCells(),
      useAsGrid: true,
    },
    {
      id: 'months',
      title: '月份',
      cells: buildMonthCells(),

    },
    {
      id: 'days',
      title: '日期',
      cells: buildDayCells(),
    },

  ]

  useEffect(() => {
    if (timelineViewportWidth && sidebarWidth) {
      handleLayoutChange(timelineViewportWidth, sidebarWidth)
    }
  }, [scale])

  const handleLayoutChange = (_timelineViewportWidth, _sidebarWidth) => {
    const new_time = createTime({
      ...scale,
      viewportWidth: _timelineViewportWidth,
    })

    setTime(new_time)
    setTimelineViewportWidth(_timelineViewportWidth)
    setSidebarWidth(_sidebarWidth)
  }

  return (
    <div className="rt">
      <globalContext.Provider value={{ now, headWidth, tracks, time }}>
        <Layout
          enableSticky={enableSticky}
          timebar={timebar}
          time={time}
          toggleTrackOpen={toggleTrackOpen}
          scrollToNow={scrollToNow}
          isOpen={isOpen}
          onLayoutChange={handleLayoutChange}
          timelineViewportWidth={timelineViewportWidth}
          sidebarWidth={sidebarWidth}
          clickElement={clickElement}
          clickTrackButton={clickTrackButton}
        />
      </globalContext.Provider>
    </div>
  )
}

Gantt.propTypes = {
  scale: PropTypes.shape({
    start: PropTypes.instanceOf(Date).isRequired,
    end: PropTypes.instanceOf(Date).isRequired,
    zoom: PropTypes.number.isRequired,
    zoomMin: PropTypes.number,
    zoomMax: PropTypes.number,
    minWidth: PropTypes.number,
  }),
  headWidth: PropTypes.number,
  isOpen: PropTypes.bool,
  toggleOpen: PropTypes.func,
  zoomIn: PropTypes.func,
  zoomOut: PropTypes.func,
  clickElement: PropTypes.func,
  clickTrackButton: PropTypes.func,
  tracks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  now: PropTypes.instanceOf(Date),
  toggleTrackOpen: PropTypes.func,
  enableSticky: PropTypes.bool,
  scrollToNow: PropTypes.bool,
}

export default Gantt
