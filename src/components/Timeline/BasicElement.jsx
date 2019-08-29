import React from 'react'
import PropTypes from 'prop-types'
import { getDayMonth } from '../../utils/formatDate'
import createClasses from '../../utils/classes'

const buildDataAttributes = (attributes = {}) => {
  const value = {}
  Object.keys(attributes).forEach(name => {
    value[`data-${name}`] = attributes[name]
  })
  return value
}

const Basic = ({ title, start, end, classes, dataSet, tooltip }) => (
  <div className={createClasses('rt-element', classes)} {...buildDataAttributes(dataSet)}>
    <div className="rt-element__content" aria-hidden="true">
      <span className="rt-element__title">{title}</span>
    </div>
    <div className="rt-element__tooltip">
      {tooltip ? (
        // eslint-disable-next-line react/no-danger
        <div dangerouslySetInnerHTML={{ __html: tooltip.split('\n').join('<br>') }} />
      ) : (
          <div>
            <div>{title}</div>
            <div>
              <span>起始</span> {getDayMonth(start)}
            </div>
            <div>
              <span>终止</span> {getDayMonth(end)}
            </div>
          </div>
        )}
    </div>
  </div>
)

Basic.propTypes = {
  title: PropTypes.string.isRequired,
  start: PropTypes.instanceOf(Date).isRequired,
  end: PropTypes.instanceOf(Date).isRequired,
  style: PropTypes.shape({}),
  classes: PropTypes.arrayOf(PropTypes.string.isRequired),
  dataSet: PropTypes.shape({}),
  tooltip: PropTypes.string,
}

export default Basic
