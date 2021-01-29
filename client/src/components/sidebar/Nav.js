import React from 'react'
import {motion} from 'framer-motion'
import {Link, NavLink} from 'react-router-dom'

import house from '../../imgs/site-icons/house.svg'
import recipients from '../../imgs/site-icons/recipients.svg'
import bill from '../../imgs/site-icons/bill.svg'
import company from '../../imgs/site-icons/company.svg'
import folderClosed from '../../imgs/site-icons/folder-closed.svg'

export default function Nav() {
  return (
    <nav>
      <ul>
        <motion.li
          whileHover={{scale: 2.4, color: "rgb(67, 83, 255)", originX: 0}}
          transition={{type: "spring", stiffness: 300}}
        ><NavLink activeStyle={{color: "rgb(67, 83, 255)"}} to="/" exact ><span className="icon-box"><img src={house} alt=""/></span><span className="name">Dashboard</span></NavLink></motion.li>
        <motion.li
          whileHover={{scale: 2.4, color: "rgb(67, 83, 255)", originX: 0}}
          transition={{type: "spring", stiffness: 300}}
        ><NavLink activeStyle={{color: "rgb(67, 83, 255)"}} to="/recipients"><span className="icon-box"><img src={recipients} alt=""/></span><span className="name">Recipients</span></NavLink></motion.li>
        <motion.li
          whileHover={{scale: 2.4, color: "rgb(67, 83, 255)", originX: 0}}
          transition={{type: "spring", stiffness: 300}}
        ><NavLink activeStyle={{color: "rgb(67, 83, 255)"}} to="/companies"><span className="icon-box"><img src={company} alt=""/></span><span className="name">Companies</span></NavLink></motion.li>
        <motion.li
          whileHover={{scale: 2.4, color: "rgb(67, 83, 255)", originX: 0}}
          transition={{type: "spring", stiffness: 300}}
        ><NavLink activeStyle={{color: "rgb(67, 83, 255)"}} to="/billing"><span className="icon-box"><img src={bill} alt=""/></span><span className="name">Billing</span></NavLink></motion.li>
        {/* <motion.li
          whileHover={{scale: 2.4, color: "rgb(67, 83, 255)", originX: 0}}
          transition={{type: "spring", stiffness: 300}}
        >
          <NavLink activeStyle={{color: "rgb(67, 83, 255)"}} to="/Request-Feature"><span>i</span><span className="name">Request Feature</span></NavLink>
        </motion.li> */}
      </ul>
    </nav>
  )
}
