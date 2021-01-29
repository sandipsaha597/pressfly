import React, {useContext} from 'react'
import {EditContext} from '../EditContext'
import add from '../../../imgs/site-icons/add.svg'

export default function Slideshow(props) {
  const [design, setDesign] = useContext(EditContext)
  const switchSlide = (e) => {
    if(!e.target.classList.contains("slide")) return 
    clearInputs()
    props.setElement(-1)
    props.setCurrentSlide(e.target.tabIndex)
  }

  const clearInputs = () => {
    if (props.editing) {
      let newValue = document.querySelector(`input`).value
      let newDesign = [...design]
      let currentElement = newDesign[props.currentSlide][props.element]
      currentElement.text = newValue
      setDesign(newDesign)
      props.setEditing(false)
    }
  }

  const addSlide = () => {
    let newDesign = [...design]
    newDesign.push([])
    setDesign(newDesign)
  }

  return (
    <div className="slide-show">
      <div className="slides" onMouseDown={switchSlide}>
        {design.map((v, i) => {
          return <div key={i} tabIndex={i} className={`slide ${i == props.currentSlide ? "active" : ""}`}></div>
        })}
      </div>
      <button className="add-slide" onMouseDown={addSlide}><span className="plus">+</span><span>Add slide</span></button>
    </div>
  )
}
