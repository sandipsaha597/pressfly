import React, {useState, useContext, useRef} from 'react'
import {EditContext} from '../EditContext'
import {motion} from 'framer-motion'

let mouseStartX
let mouseStartY
let currentElementInitialValueL
let currentElementInitialValueT
let target
let img

export default function Canvas(props) {

  const [design, setDesign] = useContext(EditContext)
  const [moving, setMoving] = useState(false)
  const [initial, setInitial] = useState(false)

  const canvas = useRef()

  const editCanvas = e => {
    if (e.target.classList.contains("editable-element") && !props.editing) {
      // props.element = e.target.tabIndex
      console.log(e.target.tabIndex)
      // props.setElement(e.target.tabIndex)
    }
    if(e.target.classList.contains("img")) {

      return
    }

    if(!e.target.classList.contains("canvas") && !props.editing) {
      if (!e.target.classList.contains("editing")) {
        props.setEditing(true) 
        let newDesign = [...design]
        let currentElement = newDesign[props.currentSlide][e.target.tabIndex]
        currentElement.text = `<input type="text" class="editing" value="${currentElement.text}" />`
        setDesign(newDesign)
        setTimeout(() => {
          let input = document.querySelector(`.canvas input`)
          input.focus()
          input.style.fontSize = currentElement.style.fontSize
          // console.log(e.target)
          input.style.width = currentElement.style.width
          input.style.color = currentElement.style.color
        }, 10)
      }
      // input.current.focus()
    } else {
      clearInputs(e)
    }
  }

  const clearInputs = (e) => {
    if (props.editing && !e.target.classList.contains("editing")) {
      console.log(e.target.classList.contains("canvas"))
      let newValue = document.querySelector(`.canvas input`).value
      let newDesign = [...design]
      let currentElement = newDesign[props.currentSlide][props.element]
      currentElement.text = newValue
      setDesign(newDesign)
      props.setEditing(false)
    }
  }

  const mouseMoving = (e) => {
    target = e.target
    if(target.classList.contains("editable-element") || target.classList.contains("img")) {
      setMoving(true)
      setInitial(true)
      mouseStartX = e.clientX
      mouseStartY = e.clientY
      if (target.classList.contains("img")) {
        img = true 
      }
    }
  }
  const mouseNotMoving = () => {
    setMoving(false)
    img = null
  }
  const dragging = (e) => {
    // let target = e.target
    if(moving) {
      let newDesign = [...design]
      if (img) {
        let currentElement = newDesign[props.currentSlide][target.parentElement.tabIndex].style
        
        if(initial) {
          currentElementInitialValueL = currentElement.left
          currentElementInitialValueT = currentElement.top
          setInitial(false)
        }
        
        currentElement.left = currentElementInitialValueL - ( mouseStartX - e.clientX ) 
        currentElement.top = currentElementInitialValueT - ( mouseStartY - e.clientY ) 

        // currentElement.top = e.clientY + "px"
        setDesign(newDesign)
        return
      }
      
      // let newDesign = [...design]
      let currentElement = newDesign[props.currentSlide][target.tabIndex].style
      // console.log('target')
      if(initial) {
        currentElementInitialValueL = currentElement.left
        currentElementInitialValueT = currentElement.top
        setInitial(false)
      }
      
      currentElement.left = currentElementInitialValueL - ( mouseStartX - e.clientX ) 
      currentElement.top = currentElementInitialValueT - ( mouseStartY - e.clientY ) 

      setDesign(newDesign)

    }
  }

  const elemFocus = (e) => {
    if (e.target.classList.contains("editable-element") && !props.editing) {
      // props.element = e.target.tabIndex
      console.log(e.target.tabIndex)
      props.setElement(e.target.tabIndex)
    }
    if(e.target.classList.contains("img")) {

      return
    }
  }

  return (
    <div 
      onMouseDown={(e) => {
        mouseMoving(e)
        props.setShowElemRestyle(true)
        elemFocus(e)
        console.log(props)
        clearInputs(e)
      }} onMouseUp={mouseNotMoving} onMouseMove={dragging}
      onDoubleClick={editCanvas}  className="canvas" ref={canvas}
      style={props.canvasDesign[props.currentSlide]} >
      {design[props.currentSlide].map((v, i) => 
        <motion.div key={i}
        style={v.style}
        id={v.id}
        tabIndex={i}
        className="editable-element"
        dangerouslySetInnerHTML={{__html: v.text}}
        />
      )}
    </div>
  )
}
