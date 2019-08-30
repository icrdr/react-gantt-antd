import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import Projects from './Projects'
import Task from './Task'

const Project = ({ tasks, isOpen, projects }) => {
  return (
    <div className="tr-project">
      <div className="rt-project__tasks">
        {tasks
          .filter(({ start, end }) => end > start)
          .map((task, i) => (
            <Task key={task.id} index={i} {...task} />
          ))}
      </div>
      {isOpen && projects && projects.length > 0 && <Projects projects={projects} />}
    </div>
  )
}

Project.propTypes = {
  isOpen: PropTypes.bool,
  tasks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({})),
}

export default Project
