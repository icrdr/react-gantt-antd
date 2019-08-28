import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { getDayMonth } from '../../../utils/formatDate'
import { globalContext } from '../../../index'
import Marker from '.'

const PointerMarker = ({ date, visible, highlighted }) => {
  const { time } = useContext(globalContext)
  return (
    <Marker modifier="pointer" x={time.toX(date)} visible={visible} highlighted={highlighted}>
      <div>
        <div>
          <span>{getDayMonth(date)}</span>
        </div>
      </div>
    </Marker>
  )
}

PointerMarker.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  visible: PropTypes.bool,
  highlighted: PropTypes.bool,
}

export default PointerMarker
