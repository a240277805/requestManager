var request = require("request"),
    Q=require('q');

const url="http://52.53.183.64:3000";//prod 03
//const url="http://api.dev.coostay.com";//dev





module.exports.postEventToCooStay=function (text,callback) {
  var deferred = Q.defer();
  var options = { method: 'POST',
    url: url+'/v1/events',
    headers:
    { 'postman-token': 'b415ad2a-f5cb-5156-f530-d22fdbc4a480',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1N2UyMmZmNzc5YzY3NTAwMjRiOGJkYjIiLCJyb2xlIjoiVVNFUiIsInVzZXJuYW1lIjoiU3d3IiwiZW1haWwiOiJjaHJpc3kwNzAxQGdtYWlsLmNvbSIsImF2YXRhciI6Imh0dHBzOi8vczMtdXMtd2VzdC0xLmFtYXpvbmF3cy5jb20vY29vc3RheS1wdWJsaWMtdGVzdC9ib3kyLnBuZyIsImlhdCI6MTQ4MDQ3MDY3MX0.GnFru80h6RwdnBt7G93YvB4BTOYR1jbDA5ymBSbuZp4'},
    body: text,
    json: true };

  request(options,4000,function (error,response,body) {
    console.log("----enter postEventToCooStay  request ");
    //   callback(JSON.parse(body).events);
    if(error){
      deferred.reject(error);
    }else {
      deferred.resolve(body._id);
    }
  });
  return deferred.promise.nodeify(callback);
}


module.exports.postOrganizerToCooStay=function (text,callback) {
  var deferred = Q.defer();
  var options = { method: 'POST',
    url: url+'/v1/organizers/',
    headers:
    { 'postman-token': '3a7612e1-1b7a-e851-a0db-bfd3cd7cd8d6',
      'cache-control': 'no-cache',
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1N2UyMmZmNzc5YzY3NTAwMjRiOGJkYjIiLCJyb2xlIjoiVVNFUiIsInVzZXJuYW1lIjoiU3d3IiwiZW1haWwiOiJjaHJpc3kwNzAxQGdtYWlsLmNvbSIsImF2YXRhciI6Imh0dHBzOi8vczMtdXMtd2VzdC0xLmFtYXpvbmF3cy5jb20vY29vc3RheS1wdWJsaWMtdGVzdC9ib3kyLnBuZyIsImlhdCI6MTQ4MDQ3MDY3MX0.GnFru80h6RwdnBt7G93YvB4BTOYR1jbDA5ymBSbuZp4' },
    body:text,
    json: true };

  request(options,4000,function (error,response,body) {
    console.log("enter postOrganizerToCooStay  request ");
    //   callback(JSON.parse(body).events);
    if(error){
      deferred.reject(error);
    }else {
      deferred.resolve(body._id);
    }
  });
  return deferred.promise.nodeify(callback);

}

module.exports.updateEventFromCooStay=function (id,text,callback) {
  var deferred = Q.defer();
  var options = { method: 'PUT',
    url: url+'/v1/events/'+id,
    headers:
    { 'postman-token': 'b415ad2a-f5cb-5156-f530-d22fdbc4a480',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1N2UyMmZmNzc5YzY3NTAwMjRiOGJkYjIiLCJyb2xlIjoiVVNFUiIsInVzZXJuYW1lIjoiU3d3IiwiZW1haWwiOiJjaHJpc3kwNzAxQGdtYWlsLmNvbSIsImF2YXRhciI6Imh0dHBzOi8vczMtdXMtd2VzdC0xLmFtYXpvbmF3cy5jb20vY29vc3RheS1wdWJsaWMtdGVzdC9ib3kyLnBuZyIsImlhdCI6MTQ4MDQ3MDY3MX0.GnFru80h6RwdnBt7G93YvB4BTOYR1jbDA5ymBSbuZp4'},
    body: text,
    json: true };

  request(options,4000,function (error,response,body) {
    console.log("----enter updateEventFromCooStay  request ");
    //   callback(JSON.parse(body).events);
    if(error){
      deferred.reject(error);
    }else {
      deferred.resolve(body._id);
    }
  });
  return deferred.promise.nodeify(callback);
}

module.exports.GetAllEventsFromCooStay=function (callback) {
  var deferred = Q.defer();
  var options = { method: 'GET',
    url: url+'/v1/events/',
    qs: { limit: '100' },
    headers:
    { 'postman-token': 'd03c7381-8944-70be-0ab6-d4f1fde4dd3e',
      'cache-control': 'no-cache',
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1N2UyMmZmNzc5YzY3NTAwMjRiOGJkYjIiLCJyb2xlIjoiVVNFUiIsInVzZXJuYW1lIjoiU3d3IiwiZW1haWwiOiJjaHJpc3kwNzAxQGdtYWlsLmNvbSIsImF2YXRhciI6Imh0dHBzOi8vczMtdXMtd2VzdC0xLmFtYXpvbmF3cy5jb20vY29vc3RheS1wdWJsaWMtdGVzdC9ib3kyLnBuZyIsImlhdCI6MTQ4MDQ3MDY3MX0.GnFru80h6RwdnBt7G93YvB4BTOYR1jbDA5ymBSbuZp4' },
    body: { eventbriteurl: 'https://www.eventbrite.com/e/czipclass180317-thinking-with-ink-workshop-with-embee-designs-tickets-32807695701' },
    json: true };

  request(options,4000,function (error,response,body) {
    console.log("----enter GetAllEventsFromCooStay  request ");
    if(error){
      deferred.reject(error);
    }else {
      deferred.resolve(body);
    }
  });
  return deferred.promise.nodeify(callback);
}
