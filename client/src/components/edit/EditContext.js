import React, {useState, createContext} from 'react'

export const EditContext = createContext()

export function EditProvider(props) {

  const [design, setDesign] = useState([[
    // {
    //   text:"Heading",
    //   style: {
    //     color:"#222831",
    //     fontSize: "62px",
    //     fontFamily: "Work Sans",
    //     left: 317,
    //     top: 110,
    //     width: "263px",
    //     writable: true 
    //   }
    // }
  ]])

  return (
    <EditContext.Provider value={[design, setDesign]}>
      {props.children}
    </EditContext.Provider>
  )
}
