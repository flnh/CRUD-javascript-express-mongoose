const mongoose = require('mongoose')

let jeuxVideosSchema = mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Ne doit pas être vide']
  },
  plateforme: {
    type: String,
    required: [true, 'Ne doit pas être vide']
  },
  nbExemplairesVendus: {
    type: Number,
    required: [true, 'Ne doit pas être vide'],
    min: [0, 'Ne doit pas être inférieur à 0']
  },
  editeur: {
    type: String,
    required: [true, 'Ne doit pas être vide']
  }
})

let jeuxVideo = mongoose.model('JeuxVideos', jeuxVideosSchema)

module.exports = jeuxVideo