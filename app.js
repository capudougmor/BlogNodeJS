//modules
  const express = require('express')
  const app = express()
  const nunjucks = require('nunjucks')
  const bodyParser = require('body-parser')
  const mongoose = require('mongoose')
  const admin = require('./routes/admin')
  const path = require('path')
  const session = require('express-session')
  const flash = require('connect-flash')

    
//configuration
  //session
  app.use(session({
    secret: "cursodenode",
    resave: true,
    saveUninitialized: true,
  }))
  app.use(flash())
  //middlewares
  app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
  })

  app.use(express.static(path.join(__dirname,'public')))
  
  nunjucks.configure('./views', {
    express: app,
    noCache: true,
  })

  app.use(bodyParser.urlencoded({extended:true}))
  app.use(bodyParser.json())

//mongoose
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/blogapp', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }).then(() => {
    console.log('Conectado ao mongo')
  }).catch((err) => {
    console.log('Erro ao conectar ao banco de dados: ' +err)
  })

//routes
  app.use('/admin', admin)

app.listen(8081, () => {
  console.log('servidor na porta 8081')
})