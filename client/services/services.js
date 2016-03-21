angular.module("teacherPortal.Services", [])
// <h3>The assignment Service</h3>
.factory("AssignmentFactory", function($http){
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
        //since the assignmentId parameter does not currently work and instead the back end returns an object with all submissions
        for(var i = 0; i <response.data.length; i++){
          var submission = response.data[i]
          submissions[submission.assignment_id] = submissions[submission.assignment_id] || {}
          //the api currently returns multiple copies of the same thing, this forces there to only be one submission per student per assignment, if there is a desire to have multiple submissions this will need to be changed
          submissions[submission.assignment_id][submission.creator.id] = submission
        }

        //if the get assignmentId parameter beggins working on the back end the for loop above can be removed and the code below can be uncommented. This will be more efficient time wise on the front end.
        // <p>submissions[assignmentId] = response.data</p>
      })
    },

    //allows access to assignments for controllers
    assignments : function(){
      return assignments
    },

    submissions : function(assignmentId){
      return submissions[assignmentId]
    },

    //allows new assignments to be added on the front-end
    addAssignment : function(assignment){
      assignments.unshift(assignment)
    }
  }
})