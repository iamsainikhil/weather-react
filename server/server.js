const proxy = require('express-http-proxy')
const path = require('path')
const express = require('express')

const app = express()

//define the path of build

const staticFilesPath = path.resolve(__dirname, '..', 'build')

app.use(express.static(staticFilesPath))

app.use('/api/api-server', proxy('https://dummy.free.beeceptor.com'))
