const app = require('express')();
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const osc = require('node-osc');

const config = require('../config');

const oscClient = new osc.Client(config.oscClientIP, config.oscClientPort);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

io.on('connection', socket => {
  socket.on('audio-start', () => { 
    oscClient.send('/audio/start');
  });

  socket.on('audio-stop', () => {
    oscClient.send('/audio/stop');
  })

  socket.on("shake", socket => {
    oscClient.send('/shake');
  });
});

server.listen(config.backendPort, () => console.log('Listening on port ' + config.backendPort))
