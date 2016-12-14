const osmosis = require('osmosis');
const _ = require('lodash')
const request_url = "http://www.senate.illinois.edu/a_calendar.asp"

async function fetchData(){

  const data = await new Promise((resolve, reject) => {
    const res = {}

    osmosis
    .get(request_url)
    .find('body > div > div.content > center > table tr a')
    .set('yearRange')
    .follow('@href')
    .find('body > p:contains("Semester"), body > p:contains("Session"), body > p:contains("SESSION")')
    .set('semester')
    .set({
      _eventTitles: ['+ table > tr > td:first-child'],
      _eventDates: ['+ table > tr > td:nth-child(2)']
    })
    .data(data => {
      res[data.yearRange] = res[data.yearRange] || [];
      res[data.yearRange].push( 
        Object.assign({}, data, {
          semester: (data.semester.match(/(Spring|Summer\s+Session\s+\d|Winter|Fall)/ig) || [""])[0].split(' ').filter(Boolean).map(_.capitalize).join(' '),
          events: _.zip(data._eventTitles, data._eventDates).map(keyVal => ({title: keyVal[0], date: keyVal[1] || null})),
          data: undefined
        })
      )
    })
    .done(() => {
      resolve(_.map(res, (semesters, yearRange) => ({ yearRange, semesters: semesters.filter(s => s.events.length) })))
    })
    // .log(console.log.bind(this, "LOG: "))
    // .error(console.log.bind(this, "ERROR: "))
    // .debug(console.log.bind(this, "DEBUG: "))
  })

  return data 
}

module.exports = {
  all: async () => await fetchData()
}