import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import Marker from './Marker'
import { globalContext } from '../../index'


const NowMarker = ({ visible }) => {
  const { time, now } = useContext(globalContext)
  return (
    <Marker modifier="now" x={time.toX(now)} visible={visible}>
      <div>
        <div>此时</div>
      </div>
    </Marker>
  )
}

NowMarker.propTypes = {
  visible: PropTypes.bool.isRequired,
}

export default NowMarker
