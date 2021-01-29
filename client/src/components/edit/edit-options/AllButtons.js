import 'dotenv'
import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {motion, AnimatePresence} from 'framer-motion'
import uuid from 'react-uuid'

import {EditContext} from '../EditContext'

import Code from '../../../imgs/icons/code.svg'
import Sun from '../../../imgs/icons/sun.svg'
import Sun2 from '../../../imgs/icons/sun2.svg'
import Surfing from '../../../imgs/icons/surfing.svg'
import SeoAndWeb from '../../../imgs/icons/seo-and-web.svg'
import Dog from '../../../imgs/icons/dog.svg'
import Background from './Background'

import text from '../../../imgs/site-icons/text.svg'
import pencil from '../../../imgs/site-icons/pencil.svg'
import backgroundImage from '../../../imgs/site-icons/background-image.svg'

const editButtons = [
  {
    icon: text,
    currentStyle: "addText",
    text: "Text"
  },
  {
    icon: pencil,
    currentStyle: "addIcon",
    text: "Icon"
  },
  {
    icon: backgroundImage,
    currentStyle: "addBackground",
    text: "BG"
  }
]

const addTextStyles = [
  {
    fontSize: "30px",
    styles: ["Heading", "62px", "263px"],
    text: "Heading",
  },
  {
    fontSize: "15px",
    styles: ["Sub heading", "22px", "153px"],
    text: "Sub heading",
  },
  {
    fontSize: "10px",
    styles: ["Regular body text", "12px", "141px"],
    text: "Regular body text",
  },
]

const addIconStyles = [
  {
    icon: Code
  },
  {
    icon: Sun
  },
  {
    icon: Sun2
  },
  {
    icon: Surfing
  },
  {
    icon: SeoAndWeb
  },
  {
    icon: Dog
  }
]

const container = {
  
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
  // show: {
  //   // transition: {
  //   //   staggerChildren: 0.5
  //   // }
  // },
  exit: {
    opacity: 0,
    y: 30,
  },
  transition: {
    ease: "easeInOut"
  }
}
const item = {
}

let timer
export default function AllButtons(props) {
  const [editStyle, setEditStyle] = useState("")
  const [design, setDesign] = useContext(EditContext)
  const [images, setImages] = useState([])
  const [imageQuery, setImageQuery] = useState("")
  const [infoText, setInfoText] = useState('Loading...')
  const [inputBorder, setInputBorder] = useState(false)

  const addText = (html, fz, width) => {
    let id = "edit-" + uuid()

    let newDesign = [...design]
    newDesign[props.currentSlide].push(
      {
        id,
        text: html,
        style: {
          color: "#222831",
          fontSize: fz,
          fontFamily: "Work Sans",
          left: Math.floor(Math.random() * 100),
          top: Math.floor(Math.random() * 100),
          width: width,
          writable: true
        }
      }
    )
    setDesign(newDesign)

  }
  const addIcon = (html) => {
    let id = "edit-" + uuid()

    let newDesign = [...design]
    newDesign[props.currentSlide].push(
      {
        id,
        text: html,
        style: {
          left: Math.floor(Math.random() * 100),
          top: Math.floor(Math.random() * 100),
          width: "200px",
          writable: true
        }
      }
    )
    setDesign(newDesign)
  }
  const addBackground = (id, url) => {

    let newCanvasDesign = [...props.canvasDesign]
    newCanvasDesign[props.currentSlide] = {
      id,
      background: `url(${url}) no-repeat center center / cover`
    }
    props.setCanvasDesign(newCanvasDesign)
  }
 
  useEffect(() => {
    let query = imageQuery
    setInfoText("Typing...")
    setImages([])
    if (query.trim().length !== 0) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        setInfoText("Loading...")
        axios.post("/api/assets/pexels", {
          query
        })
        .then(res => {
          setImages(res.data)
          (res.data.length === 0 ? setInfoText("No Images Found") : null)
        })
        .catch(err => err.status == 400 ? console.log(err.response) : null )

      }, 500)
    } else {
      setInfoText("Loading...")
      axios.get("/api/assets/pexels/currated")
      .then(res => {
        setImages(res.data)
        // (res.data.length === 0 ? setInfoText("No Images Found") : null)
      })
      .catch(err => err.status == 400 ? console.log(err.response) : null )
    }
  }, [imageQuery])
  return (
    <aside className="edit-options">
      <div className="all-buttons">
        {editButtons.map((v, i) => {
          return (
            <button className="edit-btn" id={`${editStyle == v.currentStyle ? "active" : ""}`} onMouseDown={() => setEditStyle(v.currentStyle)}
              key={i}>
              <span className="icon"><img src={v.icon} alt=""/></span>
              <span className="text">{v.text}</span>
            </button>
          )
        } )}
      </div>

      <div className={editStyle != "" ? "edit-styles": ""}>
      <AnimatePresence exitBeforeEnter>
        {editStyle == "addText" && (<motion.div className="add-text" key='2378'
          variants={container}
          initial="hidden"
          animate="show"
          transition="transition"
          exit="exit"
        >
          {addTextStyles.map((v, i) => {
            return (
              <motion.button
                onMouseDown={() => addText( `${v.styles[0]}`, v.styles[1], v.styles[2] )}
                style={{fontSize: v.fontSize}}
                key={i}
              >{v.text}
              </motion.button>
            )
          })}
        </motion.div>) }

        {editStyle == "addIcon" ? (<div className="add-icon" key="2389">
          <div className="bg-icon-head">
            <div className="input" style={{border: inputBorder ?  "1px solid #000" : "1px solid #f1f1f1"}} >
              <span className="icon-box">i</span>
              <input type="text" placeholder="Search Icons" value={imageQuery} onChange={e => setImageQuery(e.target.value)} onBlur={e => setInputBorder(false)} onFocus={e => setInputBorder(true)} />
            </div>
          </div>
          <motion.div className="bg-icon-body"
            variants={container}
            initial="hidden"
            animate="show"
            transition="transition"
            exit="exit" >
            {addIconStyles.map((v, i) => 
              <motion.button className="icon-btn" onMouseDown={() => addIcon(`<img class="img draggable" draggable="false" src=${v.icon} alt="" />`)}
                key={i}
                > <img src={v.icon} alt="" />
              </motion.button>
            )}
          </motion.div>
        </div>) : null}

        {editStyle == "addBackground" ? (<div className="add-background" key="2981">
          <div className="bg-img-head">
            <div className="input" style={{border: inputBorder ?  "1px solid #000" : "1px solid #f1f1f1"}} >
              <span className="icon-box">i</span>
              <input type="text" placeholder="Search Photos" value={imageQuery} onChange={e => setImageQuery(e.target.value)} onBlur={e => setInputBorder(false)} onFocus={e => setInputBorder(true)} />
            </div>
            <a href="https://www.pexels.com" target="_blank" className="attribution">Photos provided by Pexels</a>
          </div>
          {images.length === 0 ? (<div className="infoText">{infoText}</div>) : null}
          <motion.div className="bg-img-body"
            variants={container}
            initial="hidden"
            animate="show"
            transition="transition"
            exit="exit" >
            {images.map((v, i) => 
              <button onMouseDown={() => addBackground(v.id, v.src.large)}
                key={i}
              > 
                <img src={v.src.tiny} alt="" />
              </button>   
            )}
          </motion.div>
        </div>) : null}
      </AnimatePresence>
      </div>

      
    </aside>
  )
}
