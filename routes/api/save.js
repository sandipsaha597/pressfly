require('dotenv').config()
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const objectId = require('mongodb').ObjectID
const bcrypt = require('bcrypt')
const uri =
  'mongodb+srv://sandip:' +
  process.env.MONGODB_PW +
  '@todo-app.lyobv.mongodb.net/?retryWrites=true&w=majority'
const jwt = require('jsonwebtoken')

const User = require('../../models/user')

mongoose.connect(uri, {
  dbName: 'pressfly',
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const authenticateToken = (req, res, next) => {
  const authHeader =
    req.header('authorization') || req.body.headers.authorization
  console.log(authHeader)
  const token = authHeader && authHeader.split(' ')[1]
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, username) => {
    if (err) return res.status(401).json('token not valid')
    req.username = username.username
    next()
  })
}

router.post('/create-fly', authenticateToken, (req, res) => {
  console.log('create-fly')
  User.updateOne(
    {
      email: req.username,
    },
    {
      $push: {
        slides: {
          name: 'Untitled Fly',
          design: {
            slideDesign: [[]],
            canvasDesign: [],
          },
        },
      },
    },
    (err, data) => {
      if (err) throw err
      if (data.nModified === 1) {
        User.findOne(
          {
            email: req.username,
          },
          {
            slides: 1,
          },
          (err, data) => {
            if (err) throw err
            console.log(data)
            res.status(200).json(data.slides[data.slides.length - 1])
          }
        )
      }
      // console.log("data ", data)
    }
  )
})

router.post('/', authenticateToken, (req, res) => {
  console.log('save req')
  console.log(req.username)
  console.log(req.body.slides)
  let slide = `slides.${req.body.slideIndex}`
  // User.updateOne({email: req.username}, {$push : {slides: req.body.slides}}, (err, data) => {
  //   if (err) {
  //     res.status(400).json({msg: "failed"})
  //     throw err
  //   }
  //   console.log(data)
  //   res.status(201).json({msg: "done ", data})
  // })
  User.updateOne(
    {
      email: req.username,
      'slides._id': objectId(req.body.slides._id),
    },
    {
      $set: {
        'slides.$': req.body.slides,
      },
    },
    (err, data) => {
      if (err) {
        res.status(400).json({
          msg: "Couldn't update",
        })
        throw err
      }
      console.log(data)
      res.status(200).json({
        msg: 'save',
      })
      // res.status(201).json({msg: 'saved', data})
      // User.findOne({username: req.username}, (err, data) => {
      //   if (err) throw err

      //   res.status(201).json(data)
      // })
    }
  )
})

module.exports = router
