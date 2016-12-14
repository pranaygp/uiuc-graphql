var fetch = require('node-fetch');
const request_url = "http://23.23.147.128/homes/mydata/urba7723"

async function fetchData(){
  return (await fetch(`${request_url}`).then(r => r.json())).location
}

function convertTimeRemainingToNumber(machine){
  return Object.assign({}, machine, { timeRemaining: Number((machine.timeRemaining || 'Unknown').split(' ')[0]) || null })
}

function roomMapper(room){
  return Object.assign({}, room, { machines: room.machines.map(convertTimeRemainingToNumber) })
}

module.exports = {
  all: async () => (await fetchData()).rooms.map(roomMapper),
  room: async args => roomMapper((await fetchData()).rooms.find(room => room.name == args.room))
}