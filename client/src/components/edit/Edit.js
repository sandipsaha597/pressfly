import React, {useState, useEffect, useContext} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios'
import {motion, AnimatePresence} from 'framer-motion'
import GoogleFontLoader from 'react-google-font-loader';
import {EditContext} from './EditContext'

import AllButtons from './edit-options/AllButtons'
import Canvas from './canvas/Canvas'
import Slideshow from './slideshow/Slideshow'
import Topbar from './topbar/Topbar'
import EditElem from './edit-options/EditElem'


// let element 

export default function Edit() {
  const {id} = useParams()
  const history = useHistory()

  const [design, setDesign] = useContext(EditContext)
  const [canvasDesign, setCanvasDesign] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [editing, setEditing] = useState(false)
  const [element, setElement] = useState(-1)

  const [color, setColor] = useState("#e12222")
  const [showElemRestyle, setShowElemRestyle] = useState(false)
  const [showEditElem, setShowEditElem] = useState(false)
  const [elemStyle, setElemStyle] = useState(false) //font-family
  const [fonts, setFonts] = useState([])

  useEffect(() => {
    if(id == "creating-fly") {
      console.log("fly")
      axios.post("/api/save/create-fly", {
        headers: {
          "authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
      }).then(res => {
        console.log(res)
        return history.push(`/edit/${res.data._id}`)
      })
    } else {
        axios.get(`/api/data/${id}`, {
          headers: {
            "authorization": `Bearer ${localStorage.getItem("accessToken")}`
          }
        })
          .then(res => {
            // console.log(res)
            // console.log(res.data.slides[0].design.slideDesign)
            // console.log(res.data.slides[0].design.canvasDesign)
            setDesign(res.data.slides[0].design.slideDesign)
            setCanvasDesign(res.data.slides[0].design.canvasDesign)
          })
          .catch(err => console.log(err))
    }
  }, [])

  useEffect(() => {
    axios.get("/api/assets/fonts")
    .then(res => {
      let fonts = []
      res.data.map(v => {
        fonts.push({font: v.family, weights: v.variants})
      })
      setFonts(fonts)
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <div className="design-slides">
      <GoogleFontLoader
        fonts={fonts}
      />
      <Topbar 
        canvasDesign={canvasDesign} color={color} 
        showElemRestyle={showElemRestyle}
        setShowEditElem={setShowEditElem}
        currentSlide={currentSlide} 
        element={element}
        elemStyle={elemStyle}
        setElemStyle={setElemStyle} />
      <div className="main">
        <AnimatePresence>
          { showEditElem && <EditElem 
            color={color} 
            setColor={setColor} 
            showEditElem={showEditElem} 
            setShowEditElem={setShowEditElem}
            setShowElemRestyle={setShowElemRestyle}
            currentSlide={currentSlide} 
            element={element} 
            elemStyle={elemStyle}
            setElemStyle={setElemStyle}
            fonts={fonts} /> }
        </AnimatePresence>
        <AllButtons 
          currentSlide={currentSlide} 
          canvasDesign={canvasDesign}
          setCanvasDesign={setCanvasDesign} />
        <Canvas 
          currentSlide={currentSlide} 
          element={element} 
          setElement={setElement} 
          setEditing={setEditing} 
          editing={editing}
          canvasDesign={canvasDesign}
          setShowElemRestyle={setShowElemRestyle} />
      </div>
      <Slideshow 
        element={element}
        setElement={setElement}
        editing={editing}
        setEditing={setEditing} 
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide} />
    </div>
  )
}
