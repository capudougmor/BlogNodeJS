const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')

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

router.post('/categorias/nova', (req, res) => {
  var erros = []

  if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
    erros.push({texto: "Nome inválido"})
  }

  if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
    erros.push({texto: "Slug invalido"})
  }

  if(erros.length > 0){
    res.render('admin/addCategorias.html', {erros: erros})
  }
    const novaCategoria = {
      nome: req.body.nome,
      slug: req.body.slug
    }
  
    new Categoria(novaCategoria).save().then(() => {
      req.flash('success_msg', 'Categoria criada com sucesso')
      res.redirect('/admin/categorias')
    }).catch((err) => {
      req.flash('error_msg', 'Houve um erro ao salvar a categoria!')
      res.redirect('/admin')
    })
  
})

module.exports = router