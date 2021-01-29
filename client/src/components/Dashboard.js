import React, {useState, useEffect} from 'react'
import {useHistory, Route, BrowserRouter as Router, Switch, useLocation} from 'react-router-dom'
import {motion, AnimatePresence} from 'framer-motion'



import Sidebar from './Sidebar'
import CreatePresentation from './presentations/CreatePresentation'
import AllPresentations from './presentations/AllPresentations'
export default function Dashboard(props) {
  const [showTitle, setShowTitle] = useState(true)
  setTimeout(() => {
    setShowTitle(false)
  }, 1000);

  useEffect(() => {
    document.title = "Upgrade your Presentations on the Fly! | Pressfly"
  }, [])
  const location = useLocation()


  
  return (
    <>
      <div style={{display: "flex"}}>
      <Sidebar />
        <div className="dashboard" >
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.key}>
            <Route exact path="/">
              <motion.h1
                initial={{y: -100}}
                animate={{y: 0}}
                exit={{y: -100, transition:{ease: "easeInOut"}}}
                transition={{delay: .3}}
              >Presentations</motion.h1>
              <CreatePresentation />
              <AllPresentations presentations={props.presentations} />
            </Route>
            <Route exact path="/recipients">
              <motion.h1
                initial={{y: -100}}
                animate={{y: 0}}
                exit={{y: -100, transition:{ease: "easeInOut"}}}
                transition={{delay: .3}}
              >Recipients</motion.h1>
            </Route>
            <Route exact path="/companies">
              <motion.h1
                initial={{y: -100}}
                animate={{y: 0}}
                exit={{y: -100, transition:{ease: "easeInOut"}}}
                transition={{delay: .3}}
              >Companies</motion.h1>
            </Route>
            <Route exact path="/Billing">
              <motion.h1
                initial={{y: -100}}
                animate={{y: 0}}
                exit={{y: -100, transition:{ease: "easeInOut"}}}
                transition={{delay: .3}}
              >Billing</motion.h1>
            </Route>
          </Switch>
        </AnimatePresence>
        </div>
      
      </div>
    </>
  )
}
