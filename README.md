# React-gantt-antd
A beautiful react gantt component with antd style. 
This is a fork of [JSainsburyPLC/react-timelines](https://github.com/JSainsburyPLC/react-timelines)


## Install

```sh
yarn add react-gantt-antd
```
## Usage

```js
import React from 'react'
import Gantt from 'react-gantt-antd'
import 'react-gantt-antd/lib/css/style.css'

export default function App() {
  const tasks_a = [
    {
      id: "title1",
      title: "任务名称",
      start: new Date('2020-06-01'),
      end: new Date('2020-08-02'),
    }
  ]

  const tasks_b = [
    {
      id: "title1",
      title: "任务名称",
      start: new Date('2020-07-01'),
      end: new Date('2020-09-02'),
    }
  ]

  const sub_projects = [
    {
      id: "sub_project1",
      title: "子项目",
      tasks: tasks_b,
    }
  ]

  const projects = [
    {
      id: "project1",
      title: "项目1",
      tasks: tasks_a,
      projects: sub_projects,
      isOpen: false,
    }
  ]
  return (
    <Gantt
      start={new Date('2020-06-01')}
      end={new Date('2020-10-01')}
      zoom={1}
      projects={projects}
      now={new Date('2020-7-01')}
      enableSticky
      scrollToNow
    />
  )
}

export default App
```

## Development

```sh
yarn install
yarn watch
yarn build
```


```
npm config set registry=http://registry.npmjs.org
npm config set registry=https://registry.npm.taobao.org/
```
