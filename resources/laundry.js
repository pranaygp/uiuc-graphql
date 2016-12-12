var fetch = require('node-fetch');
const request_url = "http://23.23.147.128/homes/mydata/urba7723"

async function fetchData(){
  return (await fetch(`${request_url}`).then(r => r.json())).location
}

module.exports = {
  all: async () => (await fetchData()).rooms,
  room: async args => (await fetchData()).rooms.find(room => room.name == args.room)
}