import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { globalContext } from '../../index'
import Tracks from './Tracks'
import Grid from './Grid'


const Body = () => {
  const { tracks } = useContext(globalContext)
  return (
    <div className="rt-timeline__body">
      <Grid />
      <Tracks tracks={tracks} />
    </div>
  )
}

export default Body
