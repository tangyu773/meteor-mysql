// numtel:mysql
// MIT License, ben@latenightsketches.com
// test/mock.connection.query.js

// Mock connection.query function to record processed queries
queries = [];

// 2 Underscores as it's been wrapped once already
mysql.__createConnection = mysql.createConnection;
mysql.createConnection = function(config){
  var result = mysql.__createConnection(config);
  if(typeof result === 'object'){
    var origQueryMethod = result.query;
    result.query = function(query, callback){
      queries.push(query);
      return origQueryMethod.apply(this, arguments);
    }
  }
  return result;
};
