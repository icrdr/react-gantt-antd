import React from 'react'
import PropTypes from 'prop-types'
import Project from './Project'

const Projects = ({ projects }) => {
  return (
    <div className="rt-projects">
      {projects.map(({ id, tasks, isOpen, projects: children }) => (
        <Project key={id} tasks={tasks} isOpen={isOpen} projects={children} />
      ))}
    </div>
  )
}

Projects.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({})),
}

export default Projects
