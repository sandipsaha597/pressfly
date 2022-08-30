require("dotenv").config()
const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const axios = require('axios');

// import { createClient } from 'pexels'; 


const createClient = require('pexels').createClient;

const authenticateToken = (req, res, next) => {
  const authHeader = req.header('authorization') || req.body.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, username) => {
    if (err) return res.status(401).json("token not valid")
    req.username = username.username
    next()
  })
}

const client = createClient(process.env.PEXELS_API_KEY);
router.post('/pexels', (req, res) => {
  let query = req.body.query
  client.photos.search({
      query,
      per_page: 10
    }).then(data => {
      res.status(200).json(data.photos)
    })
    .catch(err => {
      res.status(400).json({
        msg: "Failed to get Images"
      })
      console.log(err)
    })
})

router.get('/pexels/currated', (req, res) => {
  client.photos.curated({
    per_page: 10
  }).then(data => {
    // console.log(data.photos)
    res.status(200).json(data.photos)
    // setImages(res.photos)
  })
  .catch(err => {
    res.status(400).json({
      msg: "Failed to get Images"
    })
    console.log(err)
  })
})

router.get("/fonts", (req, res) => {
  // fetch("https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=AIzaSyCt8AslPLsf7RJsLVxPHDQPKVIFLJa0TMU")
  //   .then(data => res.status(200).json(data))
  //   .catch(err => console.log(err)
    
  axios.get(`https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=${process.env.GOOGLE_FONT_API_KEY}`)
    .then(data => {
      let fonts = data.data.items.splice(0, 15)
      res.status(200).json(fonts)
    })
    .catch(error => {
      console.log(error);
    })
}) 



module.exports = router