//modules
  const express = require('express')
  const app = express()
  const nunjucks = require('nunjucks')
  const bodyParser = require('body-parser')
  const mongoose = require('mongoose')
  const admin = require('./routes/admin')
  const path = require('path')

  
  
  //configuration
  app.use(express.static(path.join(__dirname,'public')))
  
  nunjucks.configure('./views', {
    express: app,
    noCache: true,
  })

  app.use(bodyParser.urlencoded({extended:true}))
  app.use(bodyParser.json())

//routes
  app.use('/admin', admin)

app.listen(8081, () => {
  console.log('servidor na porta 8081')
})