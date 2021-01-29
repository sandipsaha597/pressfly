import React, {useState, useEffect, useRef} from 'react'
import {useHistory, Redirect} from 'react-router-dom'
import axios from 'axios'

import Mail from '../imgs/site-icons/mail.svg'
import Password from '../imgs/site-icons/password.svg'

export default function Login(props) {
  const history = useHistory()
  const [inputBorder, setInputBorder] = useState(false)
  const [passwordInputBorder, setPasswordInputBorder] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    document.title = "Login | Pressfly"
    console.log(props)
  }, [])

  const login = (e) => { 
    e.preventDefault()
    console.log('click');
    axios.post('api/login', 
    {
      email: email, 
      password: password
    })
    .then(res => {
      if(res.data.msg === 'success') {
        console.log(res)
        localStorage.setItem("accessToken", res.data.accessToken)
        props.setCount(1)
        return history.push("/")
      } else {
        alert(res.data.msg)
      }
    } )
    .catch(err => alert(err))
  }

  // const submitBtn = useRef()
  // const submit = e => {
  //   // console.log(e.keyCode)
  //   if (e.keyCode === 13) {
  //     e.preventDefault()
  //     document.querySelector('.login button').click()
  //   }
  // }

  return (
    <div className="login">
      <div className="box">
        <h1>Welcome to pressfly</h1>
        <p>sign in with email</p>
        <form  onSubmit={login}>
          <div className="input" style={{border: inputBorder ?  "1px solid #000" : "1px solid #f1f1f1"}} >
            <span className="icon-box"><img src={Mail} alt=""/></span>
            <input type="email" required placeholder="your@example.com" value={email} onChange={e => setEmail(e.target.value)} onBlur={e => setInputBorder(false)} onFocus={e => setInputBorder(true)} required />
          </div>
          <div className="input" style={{border: passwordInputBorder ?  "1px solid #000" : "1px solid #f1f1f1"}} >
            <span className="icon-box"><img src={Password} alt=""/></span>
            <input type="password" required placeholder="password" value={password} onChange={e => setPassword(e.target.value)} onBlur={e => setPasswordInputBorder(false)} onFocus={e => setPasswordInputBorder(true)} required />
          </div>
          <p className="forgot-password">Don't remember your password?</p>
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  )
}
