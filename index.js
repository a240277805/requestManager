/**
 * Created by zmk on 2017/3/6.
 */
const coostayreq=require('./requestManager'),
         eventbrite=require('./eventbriteManager'),
         Q=require('q'),
        co=require('co');



var jsontext={
    "name":"zmktestevent",
    "organizer":"58bcdf839b806b242dea5023",

    "description":{
        "text":"hehehhehe",
        "html":"hh"
    },
    "eventTime":{
        "startDate":"2017-01-06T03:23:13.408Z",
        "endDate":"2017-04-06T03:23:13.408Z"
    },
    "tips":[	"music","education"],
    "address": {
        "apartmentNo": "F03",
        "address": "2821 California St",
        "city": "San Francisco",
        "state": "CA",
        "postal": "11212",
        "country": "US",
        "geo": [
            -122.326830,
            47.478978
        ],
        "holdsite":"场地，新加字段"
    }
};


function addNewEventFromEventBrite() {
  co(function *() {
	var citys=['Seattle','New York', 'Boston', 'Philadelphia' , 'Washington', 'Chicago', 'Dallas', 'Los Angeles', 'San Francisco', 'Seattle' ];

    for(let tempcity of citys){
        console.log("addNewEventFromEventBrite");
      let eventbrites=yield eventbrite.GetEventBrite
      (tempcity);
      let count=0;
      for (let item of eventbrites){
          ++count;
          try{
              // if(count===5)return;

              console.log("第"+count+"个>>>>>city is:"+tempcity+">>>>>>>>>>>>>>>>>>>>>>>>>enter >>> event id :"+item.id);


              let EventBriteOrganizer =yield eventbrite.GetEventBriteOrganizer(item.organizer_id);
              let  o_original="";
              try{
                  o_original=EventBriteOrganizer.logo.original;
              } catch(e) {
                  console.log("original error");
              }
              console.log("EventBriteOrganizer  name is :"+EventBriteOrganizer.name);
              let TmpOrganizerName=EventBriteOrganizer.name?EventBriteOrganizer.name:EventBriteOrganizer.id;
              let organizerJson= {
                  name: TmpOrganizerName,
                  logo: o_original,
                  description: EventBriteOrganizer.description,
                  eventbriteid:EventBriteOrganizer.id
              };
              // console.log(organizerJson);
              //  continue;


              let city,country,latitude,longitude,postal,address1,price,tipshortname,organizerid,holdsite,photos="";
              organizerid=yield coostayreq.postOrganizerToCooStay(organizerJson);


              if(organizerid){
                  console.log("-->added Organizerid is:"+organizerid);
              }else {
                  console.log("ERROR: addedOrganizer  error  org id is:"+EventBriteOrganizer.id);
                  continue;
              }


              //shortname
              try{
                  let tip= yield eventbrite.GetEventBriteTip(item.category_id);
                  console.log(tip.short_name);
                  tipshortname=tip.short_name;
              } catch(e) {
                  console.log("short_name error");
              }

              let venues= yield eventbrite.GetEventBriteAddress(item.venue_id);
              //city
              try{
                  console.log("city is:"+venues.address.city);
                  city=venues.address.city;
              }catch (ex){
                  console.log("city error");
              }
              //country
              try{
                  console.log("country is:"+venues.address.country);
                  country=venues.address.country;
              } catch(e) {
                  console.log("country error");
              }
              //latitude
              try{
                  console.log("latitude is:"+venues.address.latitude);
                  latitude=venues.address.latitude;
                  longitude=venues.address.longitude;
              } catch(e) {
                  console.log("latitude error:");
              }
              //address1
              try{
                  console.log("address1 is:"+venues.address.address_1);
                  address1=venues.address.address_1;
              } catch(e) {
                  console.log("address1 error:");
              }
              //price
              try{
                  console.log("--isfree is:"+item.is_free);
                  if(!item.is_free){
                      let ticketresult= yield eventbrite.GetEventBriteTicket_Class(item.id);
                      price=ticketresult.ticket_classes[0].cost.display;
                  }
                  console.log("--isfree out: price="+price);

              } catch(e) {
                  console.log("error price : id="+item.id);
              }
              //holdsite
              try{
                  console.log("holdsite is:"+venues.name);
                  holdsite=venues.name;
              } catch(e) {
                  console.log("error holdsite : id="+item.id);
              }
              //photos
              try{
                  photos=item.logo.url;
                  console.log("==---==photos is:"+photos);
              } catch(e) {
                  console.log("error photos : id="+item.id);
              }

              let coostayJson=               {
                  "name":item.name.text,
                  "organizer":organizerid,

                  "description":item.description,
                  "eventTime":{
                      "startDate":item.start.utc,//"2017-01-06T03:23:13.408Z",
                      "endDate":item.end.utc//"2017-04-06T03:23:13.408Z"
                  },
                  "tips":[tipshortname],
                  "address": {
                      "address":address1,
                      "city":city,
                      "postal": postal,
                      "country": country,
                      "geo": [
                          longitude ,
                          latitude
                      ],
                      'holdsite':holdsite
                  },
                  "isfree":item.is_free,
                  "price":price,
                  "eventbriteid":item.id,
                  "eventbriteurl":item.url,
                  "photos":[photos],
              }

              //    console.log(coostayJson);
              let resultCoEventid= yield coostayreq.postEventToCooStay(coostayJson);
              if(resultCoEventid){
                  console.log("第"+count+"个!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!succsesss!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Coo Event id:"+resultCoEventid);
              }else {
                  console.log("!!!!!!!!ERROR!!!!!!! added coostayEvent  error id is:"+item.id);
              }
          } catch(e) {
              console.log("第"+count+"个添加失败！");
          }
      }
    }
  });
}

function addOneEventFromEventBrite(){
    co(function *() {
        let  item= yield eventbrite.GetTheEvent(33952644273);
        let EventBriteOrganizer =yield eventbrite.GetEventBriteOrganizer(item.organizer_id);
        let  o_original="";
        try{
            o_original=EventBriteOrganizer.logo.original;
        } catch(e) {
            console.log("original error");
        }
        console.log("EventBriteOrganizer  name is :"+EventBriteOrganizer.name);
        let TmpOrganizerName=EventBriteOrganizer.name?EventBriteOrganizer.name:EventBriteOrganizer.id;
        let organizerJson= {
            name: TmpOrganizerName,
            logo: o_original,
            description: EventBriteOrganizer.description,
            eventbriteid:EventBriteOrganizer.id
        };
        // console.log(organizerJson);
        //  continue;


        let city,country,latitude,longitude,postal,address1,price,tipshortname,organizerid,holdsite,photos="";
        organizerid=yield coostayreq.postOrganizerToCooStay(organizerJson);


        if(organizerid){
            console.log("-->added Organizerid is:"+organizerid);
        }else {
            console.log("ERROR: addedOrganizer  error  org id is:"+EventBriteOrganizer.id);
            return;
        }


        //shortname
        try{
            let tip= yield eventbrite.GetEventBriteTip(item.category_id);
            console.log(tip.short_name);
            tipshortname=tip.short_name;
        } catch(e) {
            console.log("short_name error");
        }

        let venues= yield eventbrite.GetEventBriteAddress(item.venue_id);
        //city
        try{
            console.log("city is:"+venues.address.city);
            city=venues.address.city;
        }catch (ex){
            console.log("city error");
        }
        //country
        try{
            console.log("country is:"+venues.address.country);
            country=venues.address.country;
        } catch(e) {
            console.log("country error");
        }
        //latitude
        try{
            console.log("latitude is:"+venues.address.latitude);
            latitude=venues.address.latitude;
            longitude=venues.address.longitude;
        } catch(e) {
            console.log("latitude error:");
        }
        //address1
        try{
            console.log("address1 is:"+venues.address.address_1);
            address1=venues.address.address_1;
        } catch(e) {
            console.log("address1 error:");
        }
        //price
        try{
            console.log("--isfree is:"+item.is_free);
            if(!item.is_free){
                let ticketresult= yield eventbrite.GetEventBriteTicket_Class(item.id);
                price=ticketresult.ticket_classes[0].cost.display;
            }
            console.log("--isfree out: price="+price);

        } catch(e) {
            console.log("error price : id="+item.id);
        }
        //holdsite
        try{
            console.log("holdsite is:"+venues.name);
            holdsite=venues.name;
        } catch(e) {
            console.log("error holdsite : id="+item.id);
        }
        //photos
        try{
            photos=item.logo.url;
            console.log("==---==photos is:"+photos);
        } catch(e) {
            console.log("error photos : id="+item.id);
        }

        let coostayJson=               {
            "name":item.name.text,
            "organizer":organizerid,

            "description":item.description,
            "eventTime":{
                "startDate":item.start.utc,//"2017-01-06T03:23:13.408Z",
                "endDate":item.end.utc//"2017-04-06T03:23:13.408Z"
            },
            "tips":[tipshortname],
            "address": {
                "address":address1,
                "city":city,
                "postal": postal,
                "country": country,
                "geo": [
                    longitude ,
                    latitude
                ],
                'holdsite':holdsite
            },
            "isfree":item.is_free,
            "price":price,
            "eventbriteid":item.id,
            "eventbriteurl":item.url,
            "photos":[photos],
        }

        //    console.log(coostayJson);
        let resultCoEventid= yield coostayreq.postEventToCooStay(coostayJson);
        if(resultCoEventid){
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!succsesss!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Coo Event id:"+resultCoEventid);
        }else {
            console.log("!!!!!!!!ERROR!!!!!!! added coostayEvent  error id is:"+item.id);
        }
    });


}



function updateEventFromEventBrite() {

    co(function *() {
        console.log("updateEventFromEventBrite");
        const coostayEvents=yield coostayreq.GetAllEventsFromCooStay();
        let count=0;
        for (let item of coostayEvents){

            ++count;
         //   if(count<37)continue;
            console.log("第"+count+"个>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>enter >>> coostayevent id :"+item.id+"and  eventbrite id:"+item.eventbriteid);
             let tmpEventbriteEvent=  yield  eventbrite.GetTheEvent(item.eventbriteid);

            if(!tmpEventbriteEvent){
                console.log("Eventbrite中没有找到该活动 id:"+item.eventbriteid);
                continue;
            }
            let url=null;
            //url
            try{
                url=tmpEventbriteEvent.url;
                console.log("==---==url is:"+url);
            } catch(e) {
                console.log("error url : id="+item.id);
                continue;
            }

            let coostayJson=               {
                "eventbriteurl":url,
            }

            //    console.log(coostayJson);
            let resultCoEventid= yield coostayreq.updateEventFromCooStay(item.id,coostayJson);
            if(resultCoEventid){
                console.log("第"+count+"个!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!succsesss!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Coo Event id:"+resultCoEventid);
            }else {
                console.log("!!!!!!!!ERROR!!!!!!! added coostayEvent  error id is:"+item.id);
            }

        }
    })
}
addNewEventFromEventBrite();
//addOneEventFromEventBrite();
//updateEventFromEventBrite();
