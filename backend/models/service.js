const mongoose = require('mongoose');

const serviceschema = new mongoose.Schema({
  name: String,
  categorie: String,
  location: String,
  salary: Number,
  description: String,
  image: String,
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true // ✅ Ajoute automatiquement createdAt et updatedAt
});

module.exports = mongoose.model('Service', serviceschema);