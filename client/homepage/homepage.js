angular.module("teacherPortal.HomepageController",[])

.controller("HomepageController", function($scope, ApiGetter){
  $scope.assignments = [];

  ApiGetter.getAssignments().then(function(assignments){
    console.log("assign", assignments)
    $scope.assignments = assignments
  })
  // ApiGetter.getAssignmentSubmissions(24800159)
})