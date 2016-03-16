angular.module("teacherPortal.HomepageController",[])

.controller("HomepageController", function($scope, ApiGetter){
  $scope.assignments = [];
  $scope.selected = false;

  ApiGetter.getAssignments().then(function(assignments){
    console.log("assign", assignments)
    $scope.assignments = assignments
  })
  // ApiGetter.getAssignmentSubmissions(24800159)
  $scope.toggleSelected = function(assignment){
    console.log("changing class", assignment)
    $scope.selected = assignment 
  }
})