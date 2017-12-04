"use strict";
/* global Parse */

var Meetups = Parse.Object.extend("Meetups");
var Sponsors = Parse.Object.extend("MeetupSponsors");

Parse.Cloud.define("meetups", function(request, response) {
  var meetupsQuery = new Parse.Query(Meetups);
  var sponsorsQuery = new Parse.Query(Sponsors);

  function queryMeetups() {
    return new Promise(function(resolve, reject) {
      meetupsQuery.find({
        success: function(results) {
          resolve(results);
        },
        useMasterKey: true
      });
    });
  }

  function querySponsors() {
    return new Promise(function(resolve, reject) {
      sponsorsQuery.find({
        success: function(results) {
          resolve(results);
        },
        useMasterKey: true
      });
    });
  }

  Parse.Promise.when([queryMeetups(), querySponsors()]).then(
    function(results) {
      response.success(results);
    },
    function(error) {
      response.error(error);
    }
  );
});
