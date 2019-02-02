const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    runs: [Run]
    run(id: ID!): Run
    puppets(runId: ID!): [Puppet]
    stats: Stats
    tasks: [Task]
    logs: [Log]
    screenshot(puppetId: ID!): String
  }

  type Mutation {
    createRun(
      numberOfPuppets: Int,
      taskId: Int,
      puppetParams: [ParamValueInput]
    ): Run
    createRunFromPrevious(
      runId: ID!
    ): Run
    createTask(
      name: String
      title: String
      description: String
      params: [TaskParamInput]
      code: String
    ): Task
    updateTask(
      id: ID!
      name: String
      title: String
      description: String
      params: [TaskParamInput]
      code: String
    ): Task
  }

  input TaskParamInput {
    name: String
    label: String
    mandatory: Boolean
    type: String
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
    isOngoing: Boolean
    logs: [Log]
  }

  type Run {
    id: ID!
    numberOfPuppets: Int
    task: Task
    puppetParams: [TaskParamValue]
    puppets: [Puppet]
    createdAt: String
    isOngoing: Boolean
    logs: [Log]
  }

  type TaskParamValue {
    param: String
    value: String
  }

  type TaskParam {
    name: String
    label: String
    mandatory: Boolean
    type: String
  }

  type Task {
    id: ID!
    title: String
    description: String
    params: [TaskParam]
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

  type Log {
    run: Run
    puppet: Puppet
    level: String
    message: String
    timestamp: String
  }
`;

module.exports = typeDefs;
