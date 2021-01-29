require("dotenv").config
const express = require("express")
const path = require("path")
const app = express()

app.use(express.json())

app.use('/api/', require("./routes/api/auth"))
app.use('/api/assets/', require("./routes/api/assets"))
app.use('/api/save/', require("./routes/api/save"))

// app.use(express.static(__dirname))
// app.get('*'), (req, res) => {
// 	res.sendFile(path.resolve(__dirname, 'index.html'))
// } 

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log("server started on port", PORT))