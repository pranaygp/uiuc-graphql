var fetch = require('node-fetch');
const request_url = "https://my.engr.illinois.edu/labtrack/util_data_json.asp"

async function fetchData(){
  return (await fetch(`${request_url}`).then(r => r.json())).data
}

module.exports = {
  all: async () => await fetchData(),
  lab: async args => (await fetchData()).find(lab => lab.strlabname == args.lab)
}