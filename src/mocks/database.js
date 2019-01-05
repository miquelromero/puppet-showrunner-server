// Obtained from database
const runs = [
  { id: "2", configId: "1", startTime: "1543016995313" },
  { id: "1", configId: "0", startTime: "1543016915313" },
  { id: "0", configId: "0", startTime: "1543016935313" }
];

const configs = [
  {
    id: "0",
    puppetTypeName: "example",
    numberOfPuppets: 15,
    maxWorkingPuppets: 5,
    puppetParams: [
      {
        param: "url",
        value: "https://www.google.com"
      }
    ]
  },
  {
    id: "1",
    puppetTypeName: "example",
    numberOfPuppets: 50,
    maxWorkingPuppets: 5,
    puppetParams: [
      {
        param: "url",
        value: "http://www.criti.cat"
      }
    ]
  }
];

const puppets = [
  { id: "0", state: "Working", url: "https://www.google.com", runId: "1" },
  { id: "1", state: "Idle", url: "https://www.google.com/search?q=apollo+graphql", runId: "1" },
  { id: "3", state: "Idle", url: "https://www.google.com/search?q=how+to+be+a+jedi", runId: "1" },
  { id: "4", state: "Idle", url: "https://www.google.com/search?q=is+it+normal+to+be+sexually+attracted+to+numbers", runId: "1" },
  { id: "5", state: "Idle", url: "http://www.criti.cat", runId: "2" },
  { id: "6", state: "Idle", url: "http://www.criti.cat/#/movies", runId: "2" },
  { id: "7", state: "Idle", url: "http://www.criti.cat/#/movies", runId: "2" },
  { id: "8", state: "Idle", url: "http://www.criti.cat/#/movies", runId: "2" },
  { id: "9", state: "Idle", url: "http://www.criti.cat/#/tv", runId: "2" },
  { id: "10", state: "Idle", url: "http://www.criti.cat/#/tv", runId: "2" },
  { id: "11", state: "Idle", url: "http://www.criti.cat/#/tv", runId: "2" },
  { id: "12", state: "Idle", url: "http://www.criti.cat/#/tv", runId: "2" }
];

module.exports = {
  runs,
  configs,
  puppets
}