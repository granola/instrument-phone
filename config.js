// in backend
const oscClientIP = '192.168.10.109';
const oscClientPort = 8000;

// in frontend
const backendPort = 5000;
const backendOrigin = 'https://instrument-phone.herokuapp.com:' + backendPort;

module.exports = {
  oscClientIP,
  oscClientPort,
  backendPort,
  backendOrigin,
}
