const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");

const Dining = require("../resources/dining");
const Laundry = require("../resources/laundry");
const EWS = require("../resources/ews");
const FreeFood = require("../resources/free_food");
const Calendar = require("../resources/calendar");

var schema = buildSchema(`
  type Query {
    # Ping the server to check if it's up!
    ping: String!
    # All endpoints for the Laundry service
    laundry: Laundry!,
    # All endpoints for the EWS service
    ews:  EWS!,
    # All endpoints for the freeFood service
    freeFood: FreeFood!,
    # All endpoints for the calendar service
    calendar: Calendar!
  }

  
  type Laundry {
    all: [ LaundryRoom! ]!,
    room(room: String!): LaundryRoom,
  }

  type LaundryRoom {
    id: ID!,
    name: String!,
    networked: String!,
    machines: [ LaundryMachine! ]! 
  }

  type LaundryMachine {            
    port: Int!,
    label: String!,
    description: String!,
    status: String!,
    startTime: String!,
    timeRemaining: Int
  }

  type EWS {
    all: [ EWSLab! ]!,
    lab(lab: String!): EWSLab
  }

  type EWSLab {
    strlabname: String!,
    inusecount: Int!,
    machinecount: Int!
  }

  type FreeFood {
    all: [ FreeFoodLocation! ]!
  }

  type FreeFoodLocation {
    pk: Int!,
    googleTime: String!,
    building: String!,
    counter: Int!,
    displayTime: String!,
    food: String!,
    latLng: String!,
    time: String!,
    link: String!,
    location: String!,
    address: String!,
    eventID: ID!,
    event: String!,
    calID: ID!,
    abbr: String!
  }

  type Calendar {
    all: [CalendarYear!]!
  }

  type CalendarYear {
    yearRange: String!
    semesters: [CalendarSemester!]!
  }

  type CalendarSemester {
    semester: String!,
    events: [CalendarEvent!]!
  }

  type CalendarEvent {
    title: String!,
    date: String
  }

`);

var rootValue = {
  ping: () => "pong",
  diningHall: async ({ hall }) => JSON.stringify(await Dining.todaysMenu(hall)), // not currently working
  laundry: Laundry,
  ews: EWS,
  freeFood: FreeFood,
  calendar: Calendar,
};

module.exports = graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
});
