const path = require('path')

//add library dev
const morgan = require('morgan')

//add library
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const compression = require('compression')

app.use(compression())
//[GET] image from public
app.use(express.static(path.join(__dirname, 'public')))

//middleware to get post method value
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

//HTTP logger for dev
app.use(morgan('combined'))

//Template engine
// let ejs = require('ejs')
// ejs.delimiter = '%';
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'app/view'))
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts)

const database = require('./config/ConnectDB')
database.connect()

const routing = require('./app/route')
//Rout init
routing(app)


const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

global.__user_sockets = []
const {SocketController} = require('./realtime/controller')
const {JWT} = require("./app/utils");
io.use((socket, next) => {
    const token = socket.handshake.query.token
    const user = JWT.Verify(token)
    if (user) {
        socket.sender = user
        __user_sockets.push({user_id: user.id, socket})
        next();
    } else {
        next(new Error("unauthorized"));
    }
})

io.on('connection', function (socket){
    SocketController(socket)
})
// require('./realtime/handler')(io)

module.exports = server