import React, {useState} from 'react'
import {motion} from 'framer-motion'
import SlideDesignerBtn from './SlideDesignerBtn'
import { Link } from 'react-router-dom'

export default function CreatePresentation() {

  return (
    <motion.div 
      transition={{staggerChildren: .5}}
    className="create-presentation">
      <SlideDesignerBtn title="Upload Something" delay=".5" cursor="not-allowed" />
      <Link to="/edit/creating-fly" > 
        <SlideDesignerBtn title="Slide Designer" delay=".6" />
      </Link>
    </motion.div>
  )
}
