# Puppet showrunner (server)

## TODO

### Analysis
* Decide which pupper runner strategies are needed and how can they be defined.
* Decide how new puppet types are going to be installed.

### Development
* Implement a log files reader.
* Implement a simple puppet.
* Add error handling for all resolvers.
* Prepare runner for using multiple strategies (and implement the easiest one).
* Implement puppet library used for:
  * Listen to messages from parent (take screenshots, die...).
  * Keep parent updated with changes (urls...).
  * Provide a status changer function to the puppet.
* A lot more...