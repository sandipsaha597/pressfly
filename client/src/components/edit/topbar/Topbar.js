import React, { useContext, useState } from 'react'
import {useParams, Link} from 'react-router-dom'
import {EditContext} from '../EditContext'
import axios from 'axios'
import {motion, AnimatePresence} from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
// import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function Topbar(props) {
  const {id} = useParams()
  const [design, setDesign] = useContext(EditContext)
  const [saveLoading, setSaveLoading] = useState(false)
  const [checkMark, setCheckMark] = useState(false)

  const save = () => {
    setCheckMark(false)
    setSaveLoading(true)

    axios.post("/api/save", {
      headers: {
        "authorization": "Bearer " + localStorage.getItem("accessToken")
      },
      slides: {
        _id: id,
        name: "Presentation 2",
        design: {
          slideDesign: design,
          canvasDesign: props.canvasDesign 
        }
      },  
    }).then(res => {
      setSaveLoading(false)
      setCheckMark(true)

      setTimeout(() => {
        setCheckMark(false)
      }, 2000);
      console.log(res)
    }).catch(err => {
      console.log(err, err.response)
    })
  }
  let elemColor 
    try {
      elemColor = design[props.currentSlide][props.element].style.color
    } catch(err) {
      elemColor = "#222831"
    }

  return (
    <div className="topbar">
      <motion.h3 drag dragConstraints={{top: 0, bottom: 0, left: 0, right: 0 }} ><Link to="/" draggable="false" >Pressfly</Link></motion.h3>
      {props.showElemRestyle && (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="restyle-elem">
          <div className={`change-font-family ${props.elemStyle == "font-family" ? "active" : ""}`} onMouseDown={() => {
            props.setShowEditElem(true)
            props.setElemStyle("font-family")
          }}>
            <span className="font-style">{props.element != -1 ? design[props.currentSlide][props.element].style.fontFamily : "font-family"}</span>
            <span className="down-arrow"></span>
          </div>
          <div className={`change-color ${props.elemStyle == "text-color" ? "active" : ""}`} onMouseDown={() => {
            props.setShowEditElem(true)
            props.setElemStyle("text-color")
          }} >
            <div className="icon" style={{color: elemColor }}>A</div>
            <div className="color" style={{background: elemColor }}></div>
          </div>
        </motion.div>
      )}
      <div className="right">
        <AnimatePresence exitBeforeEnter>  
          { checkMark && <motion.span initial={{opacity: 0}} animate={{opacity: 1}} exit={{x: 60}} key="432"><FontAwesomeIcon icon={faCheck} size="lg" color="#4353ff" /></motion.span>}
        </AnimatePresence>
          { saveLoading && <CircularProgress color="primary" size={30} />}
        <button 
          type="button"
          className="save"
          onMouseDown={save}
          style={{position: "relative", zIndex: 2}}
          disabled={saveLoading}>
          Save</button>
          {/* <button 
          type="button"
          className="send"
          onClick={send}>
          Send</button> */}
      </div>
    </div>
  )
}
