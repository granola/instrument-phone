// in backend
const oscClientIP = '192.168.10.109';
const oscClientPort = 8000;

// in frontend
const backendPort = 3000;
const backendOrigin = 'https://instrument-phone.herokuapp.com:' + backendPort;

module.exports = {
  oscClientIP,
  oscClientPort,
  backendPort,
  backendOrigin,
}
