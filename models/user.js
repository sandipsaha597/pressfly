const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  email: String,
  password: String,
  slides: [{
    name: String,
    design: {
      slideDesign: [
        [
          {
            text: String,
            style: Object
          }
        ]
      ],
      canvasDesign: [{
        background: String,
        id: String
      }]
    }
  }]
})

module.exports = mongoose.model("User", userSchema)

