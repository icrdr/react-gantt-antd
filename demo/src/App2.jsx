import React from 'react'
import Gantt from 'react-gantt-antd'
import 'react-gantt-antd/lib/css/style.css'

export default function App2() {
  const elements_a = [
    {
      id: "title1",
      title: "任务名称",
      start: new Date('2020-06-01'),
      end: new Date('2020-08-02'),
    }
  ]

  const elements_b = [
    {
      id: "title1",
      title: "任务名称",
      start: new Date('2020-07-01'),
      end: new Date('2020-09-02'),
    }
  ]

  const subtasks = [
    {
      id: "subtask1",
      title: "子项目",
      elements: elements_b,
    }
  ]

  const tracks = [
    {
      id: "task1",
      title: "项目1",
      elements: elements_a,
      tracks: subtasks,
      isOpen: false,
    }
  ]
  return (
    <Gantt
      start={new Date('2020-06-01')}
      end={new Date('2020-10-01')}
      zoom={1}
      tracks={tracks}
      now={new Date('2020-7-01')}
      enableSticky
      scrollToNow
    />
  )
}
