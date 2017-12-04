"use strict";

/* global Parse */

import _ from "lodash";

import moment from "moment";

Parse.Cloud.define("agenda", function(request, response) {
  var Agenda = Parse.Object.extend("Agenda");
  var query = new Parse.Query(Agenda);

  function queryAgenda() {
    return new Promise(function(resolve, reject) {
      query.include("speakers");
      query.exists("day");
      query.find({ useMasterKey: true }).then(function(results) {
        var json = results.map(function(result) {
          return result.toJSON();
        });
        buildSchedule(json).then(function(formattedSchedule) {
          resolve(formattedSchedule);
        });
      });
    });
  }

  function buildSchedule(schedule) {
    var dayArrayLookup;
    var sortedSchedule = [{}, {}];

    return new Promise(function(resolve, reject) {
      _.forEach(schedule, function(session) {
        // Go ahead and add new time identifier to each session
        session.sortTime = moment(session.startTime.iso)
          .utcOffset(0)
          .format("X");
        session.displayTime = moment(session.startTime.iso)
          .utcOffset(0)
          .format("h:mma");

        dayArrayLookup = session.day - 1;

        // Check to see if timeblock exists on day
        if (!sortedSchedule[dayArrayLookup][session.sortTime]) {
          sortedSchedule[dayArrayLookup][session.sortTime] = [];
        }

        // Add to appropriate timeblock
        sortedSchedule[dayArrayLookup][session.sortTime].push(session);
      });

      resolve(sortedSchedule);
    }); // Promise
  } // buildSchedule

  Parse.Promise.when([queryAgenda()]).then(
    function(results) {
      response.success(results);
    },
    function(error) {
      response.error(error);
    }
  );
});
