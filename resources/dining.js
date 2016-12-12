// TODO implement
var fetch = require('node-fetch');
const request_url = "https://web.housing.illinois.edu/MobileDining2/WebService/Search.aspx?k=7A828F94-620B-4EE3-A56F-328036CC3C04"

module.exports = {
  todaysMenu: async diningHall => fetch(`${request_url}&id=${diningHall}&to=json`).then(r => r.json())
}