const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    runs: [Run]
    run(id: ID!): Run
    puppets(runId: ID!): [Puppet]
    stats: Stats
    puppetTypes: [PuppetType]
  }

  type Mutation {
    createRun(
      numberOfPuppets: Int, 
      maxWorkingPuppets: Int, 
      puppetTypeName: String,
      puppetParams: [ParamValueInput]
    ): Run
    createRunByConfig(
      configId: ID!
    ): Run
  }

  input ParamValueInput {
    param: String
    value: String
  }

  type Puppet {
    id: ID!
    url: String
    state: String
    run: Run
  }

  type Run {
    id: ID!
    config: Config
    puppets: [Puppet]
    createdAt: String
    isOngoing: Boolean
  }

  type Config {
    id: ID!
    runs: [Run]
    numberOfPuppets: Int
    maxWorkingPuppets: Int
    puppetType: PuppetType
    puppetParams: [PuppetTypeParamValue]
  }

  type PuppetTypeParamValue {
    param: String
    value: String
  }

  type PuppetTypeParam {
    name: String
    label: String
    mandatory: Boolean
    type: String
  }

  type PuppetType {
    name: String
    title: String
    description: String
    params: [PuppetTypeParam]
  }

  type Stats {
    platform: String
    cpuCount: Int
    cpuUsage: Float
    cpuFree: Float
    freemem: Float
    totalmem: Float
    freememPercentage: Float
    sysUptime: Float
    processUptime: Float
  }
`;

module.exports = typeDefs;