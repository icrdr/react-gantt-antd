import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import Projects from './Projects'
import Element from './Element'

const Project = ({ elements, isOpen, projects }) => {
  return (
    <div className="tr-project">
      <div className="rt-project__elements">
        {elements
          .filter(({ start, end }) => end > start)
          .map((element, i) => (
            <Element key={element.id} index={i} {...element} />
          ))}
      </div>
      {isOpen && projects && projects.length > 0 && <Projects projects={projects} />}
    </div>
  )
}

Project.propTypes = {
  isOpen: PropTypes.bool,
  elements: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({})),
}

export default Project
