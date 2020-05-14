const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('admin/index.html')
})

router.get('/posts', (req, res) => {
  res.render('admin.categorias')
})

router.get('/categorias', (req, res) => {
  res.render('admin/categorias.html')
})

router.get('/categorias/add', (req, res) => {
  res.render('admin/addCategorias.html')
})

module.exports = router