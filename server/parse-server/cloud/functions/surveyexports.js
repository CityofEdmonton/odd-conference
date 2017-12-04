"use strict";
/* global Parse */

var Survey = Parse.Object.extend("Survey");
var SurveyResult = Parse.Object.extend("SurveyResult");
var SurveyQuestions = Parse.Object.extend("SurveyQuestions");

import CloudAuth from "../auth";

Parse.Cloud.define("survey_response_rate", function(request, response) {
  if (!CloudAuth.valid(CloudAuth.type.SurveyExports, request.params._token)) {
    return response.error("CloudAuth: Permission denied (survey export)");
  }

  var allQuery = new Parse.Query(SurveyResult).count({ useMasterKey: true });

  var incompleteQuery = new Parse.Query(SurveyResult)
    .equalTo("rawAnswers", null)
    .count({ useMasterKey: true });

  Parse.Promise
    .when(allQuery, incompleteQuery)
    .then(function(allCount, incompletCount) {
      return {
        total: allCount,
        incomplete: incompletCount
      };
    })
    .then(
      function(value) {
        response.success(value);
      },
      function(error) {
        response.error(error);
      }
    );
});

Parse.Cloud.define("export_survey_results_by_questions", function(
  request,
  response
) {
  if (!CloudAuth.valid(CloudAuth.type.SurveyExports, request.params._token)) {
    return response.error("CloudAuth: Permission denied (survey export)");
  }
  if (!request.params.questions_id) {
    return response.error({ message: "Need a question set id" });
  }

  var paginatedLength = 1000;
  var sq = new SurveyQuestions();
  sq.id = request.params.questions_id;

  // before making queries, figure out how many it will take (via count)
  new Parse.Query(SurveyResult)
    .notEqualTo("rawAnswers", null) // first, ignore empty ones
    .matchesQuery("survey", new Parse.Query(Survey).equalTo("questions", sq)) // second, limit by SurveyQuestions
    .count({ useMasterKey: true }) // count the results
    .then(function(totalCount) {
      // create as many queries as it takes to get all relevant results
      var queries = [];
      var iterations = Math.ceil(totalCount / paginatedLength);
      for (var i = 0; i < iterations; i++) {
        queries.push(
          new Parse.Query(SurveyResult)
            .notEqualTo("rawAnswers", null)
            .matchesQuery(
              "survey",
              new Parse.Query(Survey).equalTo("questions", sq)
            )
            .include("survey")
            .include("survey.session")
            .include("user")
            .limit(paginatedLength)
            .skip(i * paginatedLength)
            .find({ useMasterKey: true })
        );
      }
      // return parse promise when all necessary queries have aggregated results
      return Parse.Promise.when(queries);
    })
    .then(function(grouped) {
      // group the paginated queries into a flat array of SurveyResult-s;
      var combined = [];
      grouped.map(function(g) {
        g.map(function(r) {
          combined.push({
            fbid: r.get("user").get("facebook_id"),
            sessionId: r.get("survey").get("session").id,
            sessionTitle: r
              .get("survey")
              .get("session")
              .get("sessionTitle"),
            answers: r.get("rawAnswers")
          });
        });
      });
      return combined;
    })
    // convert raw response data to a usable json format
    .then(function(allSurveyResults) {
      // get the original questions and map raw answers to them
      return new Parse.Query(SurveyQuestions)
        .get(sq.id, { useMasterKey: true })
        .then(function(questionKey) {
          // common result keys
          var sessionIdKey = "Session Id";
          var sessionTitleKey = "Session Title";
          var fbidKey = "App-scoped User Id";
          var csvKeys = [sessionIdKey, sessionTitleKey, fbidKey]; // append the rest later;
          // get the raw question data
          var rawQuestions = questionKey.get("questions");
          // process the raw data arrays and end up with normalized columns
          var arrayResults = allSurveyResults.map(function(resultObj) {
            var surveyResultArr = JSON.parse(resultObj.answers);
            // create temp result obj
            var obj = {};
            // set common columns
            obj[sessionIdKey] = resultObj.sessionId;
            obj[sessionTitleKey] = resultObj.sessionTitle;
            obj[fbidKey] = resultObj.fbid;
            // set survey-specific columns
            surveyResultArr.map(function(answerValue, answerIndex) {
              // mutate temp object with variable amount of columns
              var question = rawQuestions[answerIndex];
              // flatten further if question is of a multiple-response type
              if (question.ratings && question.ratings.rows) {
                question.ratings.rows.map(function(rowItem, rowIndex) {
                  var normalizedArrayKey = rowItem + " - " + question.text;
                  obj[normalizedArrayKey] = answerValue[rowIndex];
                  // add to list of csv cols (once)
                  if (csvKeys.indexOf(normalizedArrayKey) < 0) {
                    csvKeys.push(normalizedArrayKey);
                  }
                });
              } else {
                obj[question.text] = answerValue;
                // add to list of csv cols (once)
                if (csvKeys.indexOf(question.text) < 0) {
                  csvKeys.push(question.text);
                }
              }
            });
            return obj;
          });
          return { fields: csvKeys.join(","), data: arrayResults }; // prepare for json2csv conversion
        });
    })
    // then convert from JSON to CSV format
    // ... json2csv()
    // then return
    .then(
      function(value) {
        response.success(value);
      },
      function(error) {
        response.error(error);
      }
    );
});
