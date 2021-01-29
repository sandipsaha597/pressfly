import React from 'react'
import {motion} from 'framer-motion'

import Account from './sidebar/Account'
import Nav from './sidebar/Nav'
import PresentationFolder from './sidebar/PresentationFolder'


export default function Sidebar() {
  return (
    <motion.div className="sidebar" 
      initial={{x: "-100%"}}
      animate={{x: 0}}
    >
      <Account />
      <Nav />
      <PresentationFolder /> 
    </motion.div>
  )
}
