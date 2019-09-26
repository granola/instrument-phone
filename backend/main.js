const app = require('express')();
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const osc = require('node-osc');

const oscClient = new osc.Client('127.0.0.1', 8000);

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
});

server.listen(3000, () => console.log('Listening on port 3000!'))
