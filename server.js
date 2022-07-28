const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const http = require('http');


const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

const app = express();
const server = http.createServer(app);
//const { Server } = require("socket.io");
const socketio = require("socket.io");

const io = socketio(server);
//const io = new Server(server);

const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'i am a baddie',
  cookie: {
    expires: 1000000
  },
  resave: false,
  saveUninitialized: true,
  rolling: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

app.use(require('./controllers/'));

//const formatMessage = require('./utils/messages'); fix when users are known
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public/chat.html');
// });

//when user connects
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); //emit to send to server
  });
});


sequelize.sync({ force: false }).then(() => {
  const serverInstance = app.listen(PORT, () => {
    console.log('Now listening')
  });
  io.attach(serverInstance);
});

// server.listen(3000, () => {
//   console.log('listening on *:3000');
// });
