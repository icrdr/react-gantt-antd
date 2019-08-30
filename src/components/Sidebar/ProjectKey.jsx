import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import ProjectKeys from './ProjectKeys'
import { globalContext } from '../../index'
const ProjectKey = ({ project }) => {
  const { toggleProjectOpen } = useContext(globalContext)
  const { title, projects, isOpen, sideComponent } = project

  const isExpandable = isOpen !== undefined

  const buildSideComponent = () => {
    if (sideComponent) {
      return React.cloneTask(sideComponent)
    }
    return null
  }

  return (
    <li className="rt-project-key">
      <div className="rt-project-key__entry">
        {isExpandable && (
          <div
            style={{ marginRight: '12px' }}
            onClick={() => toggleProjectOpen(project)}
          >
            {!isOpen ? (
              <svg viewBox="64 64 896 896" focusable="false" className="rt-icon" data-icon="right" width="12px" height="12px" fill="currentColor" aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path></svg>
            ) : (
                <svg viewBox="64 64 896 896" focusable="false" className="rt-icon" data-icon="right" width="12px" height="12px" fill="currentColor" aria-hidden="true" style={{ transform: 'rotate(90deg)' }}><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path></svg>
              )}

          </div>
        )}
        <span className="rt-project-key__title">{title}</span>
        {buildSideComponent()}
      </div>
      {isOpen && projects && projects.length > 0 && <ProjectKeys projects={projects} />}
    </li>
  )
}

ProjectKey.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string
    ]).isRequired,
    projects: PropTypes.arrayOf(PropTypes.shape({})),
    isOpen: PropTypes.bool,
  }),
}


export default ProjectKey
