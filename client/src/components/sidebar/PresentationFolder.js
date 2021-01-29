import React from 'react'
import folderClose from '../../imgs/site-icons/folder-closed.svg'

export default function PresentationFolder() {
  return (
    <div className="presentation-folder">
      <div>Presentation folders</div>
      <ul>
        <li><span className="icon"><img src={folderClose} alt=""/></span><span className="name">Sample Presentation</span></li>
      </ul>
      
    </div>
  )
}
