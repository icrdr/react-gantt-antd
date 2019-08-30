# React-gantt-antd
A beautiful react gantt component with antd style.  
This is a fork of [JSainsburyPLC/react-timelines](https://github.com/JSainsburyPLC/react-timelines)  

![snapshot](https://github.com/icrdr/react-gantt-antd/raw/master/img/1.jpg)

## Install

```sh
yarn add react-gantt-antd
```
## Example

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
      now={new Date('2020-7-01')}
      zoom={1}
      projects={projects}
      enableSticky
      scrollToNow
    />
  )
}

export default App
```
## API
### Gantt

| Property | value | Descriptions |
| :-----:| :----: | :----: |
| start | Date | The start date of the task |
| end | Date | The start date of the task |
| now | Date | The start date of the task |
| zoom | Number | The start date of the task |
| projects | Object | The start date of the task |
| enableSticky | Bool | The start date of the task |
| scrollToNow | Bool | The start date of the task |
| scrollToNow | Bool | The start date of the task |

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
