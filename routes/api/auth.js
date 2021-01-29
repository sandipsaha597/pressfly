require("dotenv").config()
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const objectId = require('mongodb').ObjectID
const bcrypt = require("bcrypt")
const uri = "mongodb+srv://sandip:" + process.env.MONGODB_PW + "@pressfly-lj5ka.gcp.mongodb.net/pressfly?retryWrites=true&w=majority";
const jwt = require("jsonwebtoken")

const User = require("../../models/user")

mongoose.connect(uri, {
  dbName: "pressfly",
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const authenticateToken = (req, res, next) => {
  const authHeader = req.header('authorization') || req.body.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, username) => {
    if (err) return res.status(401).json("token not valid")
    req.username = username.username
    next()
  })
}
router.get("/data/:id", authenticateToken, (req, res) => {
  console.log(req.params.id)
  User.findOne({
    email: req.username,
    "slides._id": objectId(req.params.id)
  }, {
    "slides.$": 1,
  }, (err, data) => {
    if (err) throw err
    console.log(data)
    // db.close()
    res.status(200).json(data)
  })
})
router.get('/data', authenticateToken, (req, res) => {
  console.log('req flys')
  // User.find({}, { projection: {email: 0 }}, (err, data) => {
  //   if(err) {
  //     console.log(err)
  //     return res.status(400).json({msg: "no user"})
  //   }
  //   console.log(data)
  //   res.status(200).json({msg: "welcome"})
  // })
  User.findOne({
    email: req.username,
    // "slides._id": objectId("5eeefdd21ddd165e88590f8a")
  }, {
    "slides._id": 1,
    "slides.name": 1,
    // "slides.design.slideDesign.0": 1,
    // "slides.design.canvasDesign.$": 1
  }, (err, data) => {
    if (err) throw err
    console.log(data)
    // db.close()
    res.status(200).json(data)
  })
  // User.findOne({
  //   email: req.username,
  //   "slides._id": objectId("5eeefdd21ddd165e88590f8a")
  // }, {
  //   "slides.$": 1,
  // }, (err, data) => {
  //   if (err) throw err
  //   console.log(data)
  //   // db.close()
  //   res.status(200).json(data)
  // })
})

const generateAccessToken = user => {
  return jwt.sign({
    username: user
  }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '2d'
  })
}

router.post('/login', (req, res) => {
  let email = req.body.email.toLowerCase(),
    password = req.body.password

  let user
  // User.find({}, (err, data) => {
  //   if(err) throw err
  // })
  User.findOne({
    email
  }, async (err, data) => {
    if (err) throw err
    user = data
    if (user != null) {
      try {
        if (await bcrypt.compare(password, user.password)) {

          const accessToken = generateAccessToken(email)

          res.json({
            msg: 'success',
            accessToken: accessToken
          })
        } else {
          res.json({
            msg: "email or password is incorrect"
          })
        }
      } catch (err) {
        console.log(err)
        res.send("password encryption error")
      }

    } else {

      res.json({
        msg: 'user doesn\'t exist. Please signup'
      })
    }
  })

})

// router.post('/signup', async (req, res) => {
//   console.log('signup')
//   const username = req.body.username.toLowerCase()

//   const hashedPassword = await bcrypt.hash(req.body.password, 10)
//   res.json({username, password: hashedPassword})
//   {
//     "username": "mail@gmail.com",
//     "password": "$2b$10$33hI7ASCSBOcwwH4Pd.jBeHj7dqoZ18/LvPxhTkjiFpfb7380CDZ."
//   }
// })


module.exports = router