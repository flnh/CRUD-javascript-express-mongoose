const express = require('express')
const mongoose = require('mongoose')
const JeuxVideo = require('./model/jeuxVideo.model')
const bodyParser = require('body-parser')
const uri = "mongodb+srv://flnh:azerty@cluster0.rp0ws.mongodb.net/Cluster0?retryWrites=true&w=majority";
let app = express()

let promise = mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})

promise.then(() => {
  console.log('db connected')
  app.listen(3000, () => {
    console.log(`Listening on port 3000 !`)
  })
})

app.use('/pages', express.static('./client/pages'))
app.use('/script', express.static('./client/script'))
app.use('/style', express.static('./client/style'))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html')
})

// GET pour tout les jeux vidéos
app.get('/api/jeux-video', (req, res) => {
  JeuxVideo.find({}, (err, obj) => {
    if (err) {
      console.log(err)
      return res.send(500)
    }
    return res.send(obj)
  })
})

// GET pour un jeux vidéo précis
app.get('/api/jeux-video/:id', (req, res) => {
  JeuxVideo.findOne({_id: req.params.id}, (err, obj) => {
    if (err) {
      console.log(err)
      return res.status(500).send(err)
    }
    return res.send(obj)
  })
})

// POST : ajoute un jeux video
app.post('/api/jeux-video', (req, res) => {
  let newJeuxVideo = new JeuxVideo(req.body)

  newJeuxVideo.save((err, obj) => {
    if (err) {
      console.log(err)
      return res.status(400).send(err)
    }

    res.send(obj)
  })
})

// PUT : modifie un jeux video
app.put('/api/jeux-video/:id', (req, res) => {
  JeuxVideo.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}, (err, obj) => {
    if (err) {
      console.log(err)
      return res.status(400).send(err)
    }
    return res.send(obj)
  })
})

// DELETE : supprime un jeux video
app.delete('/api/jeux-video/:id', (req, res) => {
  JeuxVideo.deleteOne({_id: req.params.id}, (err, obj) => {
    if (err) {
      console.log(err)
      return res.send(500)
    }
    return res.sendStatus(200)
  })
})