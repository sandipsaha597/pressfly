import React, {useState} from 'react'
import {motion} from 'framer-motion'
import add from '../../imgs/site-icons/add.svg'

export default function SlideDesignerBtn(props) {
  const [animate, setAnimate] = useState(false)

  return (
    <motion.div className="slide-designer-btn"
      onMouseEnter={e => setAnimate(true)}
      onMouseLeave={e => setAnimate(false)}
      initial={{x: 40, opacity: 0}}
      animate={{x: 0, opacity: 1}} 
      exit={{opacity: 0, transition:{delay: 0}}}
      transition={{delay: props.delay }}
      style={{cursor: props.cursor}}
    >
      <div className="btn">
        {animate ? <motion.span
          animate={{scale: 1.3}}
          transition={{type: "spring", stiffness: 500 }}
          ><img src={add} /></motion.span> : <motion.span 
          animate={{scale: 1}}><img src={add} /></motion.span>}
      </div>
      <h2>{props.title}</h2>
    </motion.div>
  )
}
