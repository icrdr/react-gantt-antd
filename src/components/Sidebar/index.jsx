import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import TrackKeys from './TrackKeys'
import { globalContext } from '../../index'

const Sidebar = ({ sticky }) => {
  const { tracks } = useContext(globalContext)
  return (
    <div className="rt-sidebar">
      <Header sticky={sticky} />
      <div className="rt-sidebar__body">
        <TrackKeys tracks={tracks} />
      </div>
    </div>
  )
}

Sidebar.propTypes = {
  sticky: PropTypes.shape({}),
}

export default Sidebar
