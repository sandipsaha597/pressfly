import React, {useState} from 'react'
import {Link} from 'react-router-dom'

export default function AllPresentations(props) {
  // const [presentations, setpresentations] = useState([
  //   {
  //     name: "Presentation 1",
  //     design: {
  //       slideDesign: [],
  //       canvasDesign: []
  //     }
  //   },
  // ])
  return (
    <div className="all-presentations">
      {props.presentations.map((v, i) => 
        <Link to={`/edit/${v._id}`} key={i} >
          <h2>{v.name}</h2>
        </Link>
      )}
      {/* <div className="box">
        <div className="wrapper">
          <div className="canvas">
          <h2>style2</h2>
        </div>
        </div>
        <h2>press 2</h2>
      </div> */}
    </div>
  )
}
