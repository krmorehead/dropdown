angular.module("teacherPortal.HomepageController",[])

.controller("HomepageController", function($scope, $state, $rootScope, AssignmentService){
  $scope.assignments = [];
  //the id of the selected assignment which can be used to query the service for data
  $scope.selected = Number($state.params.id) || false;
  //the assignment selected will be injected into the view
  $scope.assignment = {};
  $scope.displaySubmissions = false;


  //gets all assignments, updates scope so the page renders, then gets all submissions for each assignment. Should update to paginate later.
  AssignmentService.getAssignments().then(function(){
    $scope.assignments = AssignmentService.assignments()
    for(var i = 0; i < $scope.assignments.length; i++){
      var assignment = $scope.assignments[i]
      //the if block is to handle reloads of the page, keeping pertinant information displayed
      if($scope.selected === assignment.id){
        $scope.assignment = assignment       
        AssignmentService.getAssignmentSubmissions(assignment.id)
        .then(function(){
          updateSubmissions($scope.selected)
        })
      } else {
        AssignmentService.getAssignmentSubmissions(assignment.id)
      }
    }
  })
  // transitions the state after adding the assignment to the scope. Adds assignment first for a very minor optimization.
  $scope.toggleSelected = function(assignment){
    $scope.assignment = assignment
    $state.transitionTo("homepage.assignment", {id:assignment.id})
  }

  $scope.toggleDisplay = function(){
    $scope.displaySubmissions = !$scope.displaySubmissions
  }

  var updateScope = function(assignmentId){
    updateAssignment(assignmentId)
    updateSubmissions(assignmentId)
  }

  var updateAssignment = function(assignmentId){
    for(var i = 0; i < $scope.assignments.length; i++){
      var assignment = $scope.assignments[i]
      if(assignmentId === assignment.id){
        $scope.assignment = assignment
        break;
      }
    }
  }

  var updateSubmissions = function(assignmentId){
    if($scope.selected){
      $scope.submissions = AssignmentService.submissions(assignmentId)
    }
  }

  //whatches for state changes and updates the scoped items based on the change
  $rootScope.$on("$stateChangeSuccess", function(ev, to, toParams, from, fromParams){
    var toAssignment = Number(toParams.id)
    $scope.selected = toAssignment
    if($scope.assignment.id !== toAssignment){
      updateScope(toAssignment)
    }
  })
})