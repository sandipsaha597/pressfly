import React, {useState, useContext, useEffect} from 'react'
import {ChromePicker} from 'react-color'
import { EditContext } from '../EditContext'
import { AnimatePresence, motion } from 'framer-motion'
import WebFont from 'webfontloader';
import axios from 'axios';

import back from '../../../imgs/site-icons/back.svg'

let saveLastClickedFamily
export default function EditElem(props) {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [design, setDesign] = useContext(EditContext)
  // const [fonts, setFonts] = useState([])

  let elemColor 
    try {
      elemColor = design[props.currentSlide][props.element].style.color
    } catch(err) {
      elemColor = "#222831"
    }

  // WebFont.load({
  //   custom: {
  //     families: ["Roboto"],
  //     urls: ["http://fonts.gstatic.com/s/roboto/v20/KFOjCnqEu92Fr1Mu51TLBBc9AMX6lJBP.ttf"]
  //   }
  // })
  // useEffect(() => {
  //   axios.get("/api/assets/fonts")
  //   .then(res => {
  //     let fonts = []
  //     res.data.map(v => {
  //       fonts.push({font: v.family, weights: v.variants})
  //     })
  //     setFonts(fonts)
  //   })
  //   .catch(err => console.log(err))
  // }, [])

  useEffect(() => {
    if(props.element != -1 ) {
      saveLastClickedFamily = design[props.currentSlide][props.element].style.fontFamily
    }
    // console.log(saveLastClickedFamily)
  }, [])

  return (
    // <AnimatePresence>
      <motion.div 
        key="432908"
        initial={{x: "-100%"}}
        animate={{x: "0"}}
        exit={{x: "-100%", transition:{ease: "easeInOut"}}}
        className="edit-elem" >
        <div className="back-btn" onMouseDown={() => {
          {props.setShowEditElem(false)}
          props.setElemStyle(false)
        }}><img src={back} alt=""/> </div>
        
        <div className="main">
          {props.elemStyle == "text-color" && (
            <div className="text-color">
              <div className="head">Pick color</div>
              <div className="current-color" style={{background: elemColor }} onMouseDown={() => setShowColorPicker(!showColorPicker)} ></div>
              
              <AnimatePresence>
                {showColorPicker && <motion.div
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
                  className="chromePicker"><ChromePicker color={elemColor} onChange={updatedColor => {
                  if (props.element != -1) {
                    console.log(updatedColor)
                    let newDesign = [...design]
                    newDesign[props.currentSlide][props.element].style.color = updatedColor.hex
                    setDesign(newDesign)
                  }
                }} /></motion.div> }
              </AnimatePresence>
            </div>
          )}
         {props.elemStyle == "font-family" && (
            <div className="font-family" style={{"pointerEvents": props.element != -1 ? "all" : "none"}}
            onMouseOut={() => {
              let newDesign = [...design]
              newDesign[props.currentSlide][props.element].style.fontFamily = saveLastClickedFamily
              setDesign(newDesign)
            }}
            onMouseDown={e => {
              saveLastClickedFamily = e.target.style.fontFamily
            }}
            onMouseOver={e => {
              if (props.element != -1) {
                // console.log(updatedColor)
                // console.log(e.target.style.fontFamily)
                let newDesign = [...design]
                newDesign[props.currentSlide][props.element].style.fontFamily = e.target.style.fontFamily
                setDesign(newDesign)
              }
            }} >
              {props.fonts.map((v, i) => <div key={i} className="head" style={{fontFamily: v.font}} >{v.font}</div>)}
              
            </div>
          )} 
          
        </div>
      </motion.div>
    // </AnimatePresence>
  )
}
