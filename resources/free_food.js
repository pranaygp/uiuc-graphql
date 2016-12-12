var fetch = require('node-fetch');
const request_url = "http://uiucfreefood.com/appJson/"

async function fetchData(){
  return (await fetch(`${request_url}`).then(r => r.json()))
}

module.exports = {
  all: async () => (await fetchData()).map(freeFoodLocation => Object.assign({}, freeFoodLocation, freeFoodLocation.fields))
}