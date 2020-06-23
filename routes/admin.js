const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')
require('../models/Postagem')
const Postagem = mongoose.model('postagens')

router.get('/', (req, res) => {
  res.render('admin/index.html')
})

router.get('/categorias', (req, res) => {
  Categoria.find().sort({date: "desc"}).then((categorias) => {
    res.render('admin/categorias.html', {categorias: categorias})
  }).catch((err) => {
    req.flash('error_msg', 'Houve um erro ao adicionar categoria!')
    req.redirect('/admin')
  })
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

router.get('/categorias/edit/:id', (req, res) => {
  console.log(req.params)
  Categoria.findOne({_id:req.params.id}).then((categoria) => {
    res.render('admin/editCategoria.html', {categoria: categoria})
  }).catch((err) => {
    req.flash('error_msg', 'Esta categoria não existe')
    res.redirect('/admin/categorias')
  })
})

router.put('/categorias/editada/:id', (req, res) => {
  const {nome, slug} = req.body
  console.log(req.body)
  
  var erros = []
  
  if(!req.body.id || typeof req.body.id == undefined || req.body.id == null) {
    erros.push({texto: "Id inválido"})
  }
  
  if(erros.length > 0){
    res.render('admin/addCategorias.html', {erros: erros})
  }

  Categoria.findByIdAndUpdate(req.params.id, {nome, slug}).then(() => {
        req.flash('success_msg', 'Categoria editada com sucesso')
        res.redirect('/admin/categorias')
      }).catch((err) => {
        req.flash('error_msg', 'Houve um erro interno ao salvar a categoria! ' +err)
        res.redirect('/admin/categorias')
      }).catch((err) => {
      req.flash('error_msg', 'Houve um erro ao editar a categoria! ' +err)
      res.redirect('/admin/categorias')
    })
})

router.delete('/categorias/deletar/:id', (req, res) => {
  console.log(req.params.id)
  Categoria.findByIdAndDelete(req.params.id).then(() => {
    req.flash('success_msg', 'Categoria deletada com sucesso!')
    res.redirect('/admin/categorias')
  }).catch((err) => {
    req.flash('error_msg', 'Houve um erro ao deletar a categoria!')
    res.redirect('/admin/categorias')
  })
})

router.get('/postagens', (req, res) => {
  res.render('admin/postagens.html')
})

router.get('/postagens/add', (req, res) => {
  Categoria.find().then((categorias) => {
    res.render('admin/addPostagens.html', {categorias: categorias})   
  }).catch((err) => {
    req.flash('error_msg', 'Houve um erro ao carregar o formulario!')
  })
})

router.post('/postagens/nova', (req, res) => {
  var erros = []

   if(req.body.categoria == 0) {
     erros.push({text: "Categoria inválida, registre uma categoria!"})
   }
   if(erros.length > 0) {
     res.render('admin/addPostagens.html', {erros: erros})
   }

   const novaPostagem = {
     titulo: req.body.titulo,
     descricao: req.body.descricao,
     slug: req.body.slug,
     conteudo: req.body.conteudo,
     categoria: req.body.categoria
   }

   new Postagem(novaPostagem).save().then(() => {
     req.flash('success_msg', 'Postagem criada com sucesso!')
     res.redirect('/admin/postagens')
   }).catch((err) => {
     req.flash('error_msg', 'Erro ao criar a postagem!')
   })

})

module.exports = router