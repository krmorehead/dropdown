angular.module("teacherPortal.Services", [])

.factory("ApiGetter", function($http){

  return {
    getAssignments : function(params){
      console.log("getting assignments")
      var assignmentUrl = "https://api.edmodo.com/assignments?access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d"
      return $http({
        url: assignmentUrl, 
        method: "GET",
        params: params || {} 
      }).then(function(response){
        return response.data
      })
    },

    getAssignmentSubmissions : function(assignment_id, params){
      console.log("getting assignment submissions")
      var assignmentSubmissionUrl = "https://api.edmodo.com/assignment_submissions?assignment_id=" + assignment_id + "&assignment_creator_id=73240721&access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d"
      return $http({
        url: assignmentSubmissionUrl,
        method: "GET",
        params: params || {}
      }).then(function(response){
        return response.data
      })
    }
  }
})