angular.module("teacherPortal.Services", [])

.factory("AssignmentService", function($http){
  var assignments = []
  /*Storing submissions in an object by assignment ID for faster access later. An example object
    {
      24800159:[submission,submission]
    }*/
  
  var submissions = {}

  return {
    //gets the assignments and stores them on the assignments variable
    getAssignments : function(params){
      var assignmentUrl = "https://api.edmodo.com/assignments?access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d"
      return $http({
        url: assignmentUrl, 
        method: "GET",
        params: params || {} 
      }).then(function(response){
        assignments = response.data
      })
    },

    //updates the submissions object with the submissions keyed by assignmentId
    getAssignmentSubmissions : function(assignmentId, params){
      var assignmentSubmissionUrl = "https://api.edmodo.com/assignment_submissions?assignmentId=" + assignmentId + "&assignment_creator_id=73240721&access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d"

      return $http({
        url: assignmentSubmissionUrl,
        method: "GET",
        params: params || {}
      }).then(function(response){
        submissions[assignmentId] = response.data
      })
    },

    //allows access to assignments for controllers
    assignments : function(){
      return assignments
    },

    submissions : function(assignmentId){
      return submissions[assignmentId]
    }
  }
})