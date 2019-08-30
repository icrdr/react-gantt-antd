import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Layout from './components/Layout'
import createTime from './utils/time'
import useEvent from './hooks/useEvent'
export const globalContext = React.createContext();

function Gantt({
  start, end,
  zoom = 1,
  projects = [],
  now = new Date(),
  sidebarWidth = 120,
  minWidth = 400,
  scrollToNow = true,
  enableSticky = true,
  clickTask,
}) {
  const [time, setTime] = useState(createTime(start, end, zoom, 0, minWidth))
  const [_projects, setProjects] = useState(projects)

  const toggleProjectOpen = project => {
    setProjects(prevState => {
      for (const _project of prevState) {
        if (_project.id === project.id) {
          _project.isOpen = !project.isOpen
        }
      }
      return [...prevState]
    })
  }

  const gantt = useRef(null)

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
    }
  ]

  useEffect(() => {
    setTime(createTime({
      start, end, zoom,
      viewportWidth: gantt.current.offsetWidth - sidebarWidth,
      minWidth: minWidth - sidebarWidth
    }))
  }, [zoom, start, end])

  const handleResize = () => {
    setTime(createTime({
      start, end, zoom,
      viewportWidth: gantt.current.offsetWidth - sidebarWidth,
      minWidth: minWidth - sidebarWidth
    }))
  }
  useEvent('resize', handleResize)

  return (
    <div className="rt" ref={gantt}>
      <globalContext.Provider value={{
        now,
        time,
        clickTask,
        toggleProjectOpen,
      }}>
        <Layout
          enableSticky={enableSticky}
          scrollToNow={scrollToNow}
          timebar={timebar}
          sidebarWidth={sidebarWidth}
          projects={_projects}
        />
      </globalContext.Provider>
    </div>
  )
}

Gantt.propTypes = {
  start: PropTypes.instanceOf(Date).isRequired,
  end: PropTypes.instanceOf(Date).isRequired,
  now: PropTypes.instanceOf(Date),
  zoom: PropTypes.number.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  minWidth: PropTypes.number,
  sideWidth: PropTypes.number,
  clickTask: PropTypes.func,
  enableSticky: PropTypes.bool,
  scrollToNow: PropTypes.bool,
}

export default Gantt
