/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-task-interactions */
import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import TaskBasic from './TaskBasic'
import { globalContext } from '../../index'
const Task = ({ index, style, styleBase, title, start, end, classes, dataSet, tooltip }) => {

  const { now, time, clickTask } = useContext(globalContext)
  const handleClick = () => {
    clickTask({ index, style, styleBase, title, start, end, classes, dataSet, tooltip })
  }
  const taskStyle = {
    ...time.toStyleLeftAndWidth(start, end),
    ...(clickTask ? { cursor: 'pointer' } : {}),
  }

  return (
    <div className="rt-project__task" style={{
      ...taskStyle,
      color: '#fff',
    }} onClick={clickTask && handleClick}>
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '40px',
        backgroundColor: '#bbb',
        filter: (index % 2 == 0) ? 'brightness(1.15)' : '',
        ...styleBase
      }}></div>
      <div style={{
        position: 'absolute',
        width: Math.max(0, Math.min(time.toX(end) - time.toX(start), time.toX(now) - time.toX(start))) || 0,
        height: '40px',
        backgroundColor: '#1890ff',
        filter: (index % 2 == 0) ? 'brightness(1.15)' : '',
        ...style
      }}></div>
      <TaskBasic
        title={title}
        start={start}
        end={end}
        classes={classes}
        dataSet={dataSet}
        tooltip={tooltip}
      />
    </div>
  )
}

Task.propTypes = {
  styleBase: PropTypes.shape({}),
  style: PropTypes.shape({}),
  classes: PropTypes.arrayOf(PropTypes.string.isRequired),
  dataSet: PropTypes.shape({}),
  title: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]).isRequired,
  start: PropTypes.instanceOf(Date).isRequired,
  end: PropTypes.instanceOf(Date).isRequired,
  tooltip: PropTypes.string,
  clickTask: PropTypes.func,
}

Task.defaultTypes = {
  clickTask: undefined,
}

export default Task
