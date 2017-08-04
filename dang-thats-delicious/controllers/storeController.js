const mongoose = require('mongoose')
const Store = mongoose.model('Store')

exports.homePage = (req, res) => {
  console.log(req.name)
  res.render('index')
}

exports.addStore = (req, res) => {
  res.render('editStore', { title: 'Add Store' })
}

exports.createStore = async (req, res) => {
  const store = await (new Store(req.body)).save()
  req.flash('success', `Successfully created ${store.name}. Care to leave a review?`)
  res.redirect(`/store/${store.slug}`)
}

exports.getStores = async (req, res) => {
  // Query the database for a list of all stores
  const stores = await Store.find()
  res.render('stores', { title: 'Stores', stores: stores })
}

exports.editStore = async (req, res) => {
  // 1. find the store given the ID
  const store = await Store.findOne({ _id: req.params.id })
  // 2. TODO: confirm they are the owner of the store
  // 3. render out the edit form so the user can update their store
  res.render('editStore', { title: `Edit ${store.name}`, store: store })
}
