import React from 'react'
import PropTypes from 'prop-types'

import ProjectKey from './ProjectKey'

const ProjectKeys = ({ projects }) => {
  return (
    <ul className="rt-project-keys">
      {projects.map(project => (
        <ProjectKey key={project.id} project={project} />
      ))}
    </ul>
  )
}

ProjectKeys.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({})),
}

export default ProjectKeys
