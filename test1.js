const coostayreq=require('./requestManager'),
    eventbrite=require('./eventbriteManager'),
    co=require('co'),
    async=require('async');

 function tt() {
/*     var organizerJson= { name: 'zmktestorganizer4',
         logo: { url: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F28981750%2F144653561175%2F1%2Foriginal.jpg?h=200&w=450&rect=171%2C0%2C590%2C295&s=56d49411fc3f14d4bee0615b67ee59a7' },
         description: { text: 'hahahahhahahha', html: 'hh' } };*/


     co(function *() {
      // var promise= yield  eventbrite.GetEventBriteAddress("18673556");
        var promise=yield eventbrite.GetTheEvent("32841566008");
      //   var promise =yield eventbrite.GetEventBrite("New York");
         console.log(promise);
     })

}

tt();

