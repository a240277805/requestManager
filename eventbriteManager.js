const request = require("request"),
    Q=require('q'),
    co=require('co');

module.exports.GetEventBrite=function (city,callback){
    var deferred = Q.defer();
    var optionsOld = { method: 'GET',
        url: 'https://www.eventbriteapi.com/v3/events/',
        qs: { crt:'regular',page: 1, sort: 'best' },
        headers:
        { 'postman-token': 'aa28b21c-521d-72f6-2f2f-6593ba90cfad',
            'cache-control': 'no-cache',
            authorization: 'Bearer FDXTK5YYZRUZW3WXOVP3' },
        body: '{\r\n   "code":"M",\r\n   "client_secret":"coder",\r\n   "grant_type":"china",\r\n  "client_id": "2/3athis is zmk test roommate  message"\r\n}' };
    var optionsCity = { method: 'GET',
        url: 'https://www.eventbriteapi.com/v3/events/search?location.address='+city,
        timeout:10000,
        headers:
        { 'postman-token': 'aa28b21c-521d-72f6-2f2f-6593ba90cfad',
            'cache-control': 'no-cache',
            authorization: 'Bearer FDXTK5YYZRUZW3WXOVP3' },
        body: '{\r\n   "code":"M",\r\n   "client_secret":"coder",\r\n   "grant_type":"china",\r\n  "client_id": "2/3athis is zmk test roommate  message"\r\n}' };
    var options = { method: 'GET',
        url: 'https://www.eventbriteapi.com/v3/events/',
        qs: { page: '1', sort: 'best' },
        headers:
        { 'postman-token': 'e00d0341-bc52-f115-be72-8e5e34046ad8',
            'cache-control': 'no-cache',
            authorization: 'Bearer ZHANXAXMFJJZNVBG2WEA' },
        body: '{\r\n  "platform": "wechat",\r\n  "platformToken": "GFHJGHJH$%^HGHJHSJKHKJFHSKJGFHBSJKSNH",\r\n  "platformId": "IUHSDJKFN^DF(*^%738848923",\r\n  "email": "test@test.com"\r\n}' };
    request(optionsCity,function (error,response,body) {
        console.log("enter GetEventBrite  request ");
     //   callback(JSON.parse(body).events);
        if(error){
            deferred.reject(error);
        }else {
            deferred.resolve(JSON.parse(body).events);
        }
    });
    return deferred.promise.nodeify(callback);
}

module.exports.GetEventBriteTip=function(id,callback) {
    let deferred = Q.defer();
    var options = { method: 'GET',
        timeout:3000,
     url: 'https://www.eventbriteapi.com/v3/categories/'+id,
     headers:
     { 'postman-token': '556b856c-b5a9-12ac-0e15-ccac3cd10a66',
     'cache-control': 'no-cache',
     authorization: 'Bearer FDXTK5YYZRUZW3WXOVP3' } };
     request(options,function (error,options,body) {
         console.log("enter GetEventBriteTip request");
         if(error){
             deferred.reject(error);
         }else {
             deferred.resolve(JSON.parse(body));
         }
     })
    return deferred.promise.nodeify(callback);
}


module.exports.GetEventBriteAddress = function(id,callback) {
    var deferred = Q.defer();

    var options = { method: 'GET',
        url: 'https://www.eventbriteapi.com/v3/venues/'+id,
        timeout:3000,
        headers:
        { 'postman-token': 'fc605c2d-f3e7-79e8-603a-f1912620b1cf',
            'cache-control': 'no-cache',
            authorization: 'Bearer FDXTK5YYZRUZW3WXOVP3' } };

    request(options, function (error, response, body) {
        console.log("enter GetEventBriteTip request");
        if(error){
            deferred.reject(error);
        }else {
            deferred.resolve(JSON.parse(body));
        }
    });
    return deferred.promise.nodeify(callback);
};

module.exports.GetEventBriteTicket_Class = function(id,callback) {
    var deferred = Q.defer();
    var request = require("request");

    var options = { method: 'GET',
        url: 'https://www.eventbriteapi.com/v3/events/'+id+'/ticket_classes/',
        timeout:3000,
        headers:
        { 'postman-token': 'fc605c2d-f3e7-79e8-603a-f1912620b1cf',
            'cache-control': 'no-cache',
            authorization: 'Bearer FDXTK5YYZRUZW3WXOVP3' } };

    request(options, function (error, response, body) {
        console.log("enter GetEventBriteTicket_Class request");
        if(error){
            deferred.reject(error);
        }else {
            deferred.resolve(JSON.parse(body));
        }
    });
    return deferred.promise.nodeify(callback);
};

module.exports.GetEventBriteOrganizer = function(id,callback) {
    var deferred = Q.defer();
    var request = require("request");

    var options = { method: 'GET',
        url: 'https://www.eventbriteapi.com/v3/organizers/'+id,
        timeout:3000,
        headers:
        { 'postman-token': 'fc605c2d-f3e7-79e8-603a-f1912620b1cf',
            'cache-control': 'no-cache',
            authorization: 'Bearer FDXTK5YYZRUZW3WXOVP3' } };

    request(options, function (error, response, body) {
        console.log("enter GetEventBriteTicket_Class request");
        if(error){
            deferred.reject(error);
        }else {
            deferred.resolve(JSON.parse(body));
        }
    });
    return deferred.promise.nodeify(callback);
};

module.exports.GetTheEvent=function (id,callback) {
    var deferred = Q.defer();
    var options = { method: 'GET',
        url: 'https://www.eventbriteapi.com/v3/events/'+id,
        timeout:3000,
        headers:
        { 'postman-token': 'aa28b21c-521d-72f6-2f2f-6593ba90cfad',
            'cache-control': 'no-cache',
            authorization: 'Bearer FDXTK5YYZRUZW3WXOVP3' },
        body: '{\r\n   "code":"M",\r\n   "client_secret":"coder",\r\n   "grant_type":"china",\r\n  "client_id": "2/3athis is zmk test roommate  message"\r\n}' };
    request(options,function (error,response,body) {
        console.log("enter GetTheEvent  request ");
        if(error){
            deferred.reject(error);
        }else {
            deferred.resolve(JSON.parse(body));
        }
    });
    return deferred.promise.nodeify(callback);
}

