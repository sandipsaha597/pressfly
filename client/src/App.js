import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch, useLocation, useHistory} from 'react-router-dom'
import './App.scss';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Edit from './components/edit/Edit';
import { AnimatePresence } from 'framer-motion';
import { EditProvider } from './components/edit/EditContext';
import axios from 'axios'


function App() { 
  const location = useLocation()
  const history = useHistory()
  const [count, setCount] = useState(0)
  const [presentations, setpresentations] = useState([
      {
        name: "Loading...",
        design: {
          slideDesign: [],
          canvasDesign: []
        }
      },
    ])

  const dashboardData = () => {
    if(localStorage.getItem('accessToken') != null) { 
      axios.get("/api/data", {
        headers: {
          'Content-Type': 'application/json',
          "authorization": "Bearer " + localStorage.getItem('accessToken')
        }
      })
      .then(res => {
        setpresentations(res.data.slides)
        console.log(res.data.slides)
      })
      .catch(err => err.response.data == "token not valid" ? history.push('/login') : null)
      
    } else {
      return history.push('/login') 
    }
  } 

  useEffect(() => {
    dashboardData()
  }, [count])

  return (
    // <Router>
      <div className="App">
        <AnimatePresence exitBeforeEnter>
          <Switch >
            <Route path="/login" exact >
              <Login setCount={setCount} />
            </Route>
            
            <Route path="/edit/" exact >
            <EditProvider >
                <Edit />
            </EditProvider>
              </Route>
              <Route path="/edit/:id" exact >
            <EditProvider >
                <Edit />
            </EditProvider>
              </Route>
            <Route path="/" >
              <Dashboard presentations={presentations} />
            </Route>
          </Switch>
        </AnimatePresence>
      </div>
    // </Router>
  )
}

export default App;
