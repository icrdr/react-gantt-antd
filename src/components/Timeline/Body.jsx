import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import Tracks from './Tracks'
import Grid from './Grid'


const Body = ({ grid, clickElement }) => {

  return (
    <div className="rt-timeline__body">
      {grid && <Grid grid={grid} />}
      <Tracks clickElement={clickElement} />
    </div>
  )
}

Body.propTypes = {
  grid: PropTypes.arrayOf(PropTypes.shape({})),
  clickElement: PropTypes.func,
}

export default Body
