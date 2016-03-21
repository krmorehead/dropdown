angular.module("teacherPortal.HomepageController",[])

.controller("HomepageController", function($scope, $state, $rootScope, $mdDialog, AssignmentFactory){
  //all of the assignments currently available
  $scope.assignments = [];
  //the id of the selected assignment which can be used to query the service for data about the assignment
  $scope.selected = Number($state.params.id) || false;
  //the the object containing the currently selected assignment
  $scope.assignment = {};


  //gets all assignments, updates scope so the page renders, then gets all submissions for each assignment. Should update to paginate later.
  AssignmentFactory.getAssignments()
  .then(function(){
    $scope.assignments = AssignmentFactory.assignments()
    AssignmentFactory.getAssignmentSubmissions()
    .then(function(){
      //in case of refresh or clicking on a link
      if($scope.selected !== $scope.assignment.id){
        updateScope($scope.selected)
      }
    })

    // if the assignment parameter in the backend query gets fixed the following method is slighty more time efficient. Note the get assignments function will also have to be updated.
    // <p>for(var i = 0; i < $scope.assignments.length; i++){             </p>
    // <p>  var assignment = $scope.assignments[i]                        </p>
    // <p>  //the if block is to handle reloads of the page, keeping pertinant information displayed </p>
    // <p>  if($scope.selected === assignment.id){                        </p>
    // <p>    $scope.assignment = assignment                              </p>
    // <p>    AssignmentFactory.getAssignmentSubmissions(assignment.id)   </p>
    // <p>    .then(function(){                                           </p>
    // <p>      updateSubmissions($scope.selected)                        </p>
    // <p>    })                                                          </p>
    // <p>  } else {                                                      </p>
    // <p>    AssignmentFactory.getAssignmentSubmissions(assignment.id)   </p>
    // <p>  }                                                             </p>
    // <p>}                                                               </p>
  })

  // transitions the state to the new assignment. Sets the new assignment to "selected".
  $scope.toggleSelected = function(assignment){
    $scope.assignment.isSelected = false
    assignment.isSelected = true
    $state.transitionTo("homepage.assignment", {id:assignment.id})
  }

  //used on refresh to make sure that the currently scoped variable are accurate
  var updateScope = function(assignmentId){
    updateAssignment(assignmentId)
    updateSubmissions(assignmentId)
  }

  //updates the current assignment to the assignmentId passed in
  var updateAssignment = function(assignmentId){
    for(var i = 0; i < $scope.assignments.length; i++){
      var assignment = $scope.assignments[i]
      if(assignmentId === assignment.id){
        assignment.isSelected = true
        $scope.assignment = assignment
        break;
      }
    }
  }

  //sets the current submissions to the submissions of the assignmentId
  var updateSubmissions = function(assignmentId){
    if($scope.selected){
      $scope.submissions = AssignmentFactory.submissions(assignmentId)
    }
  }

  //opens a modal from which an new assignment can be added
  $scope.addAssignment = function(){
    $mdDialog.show({
      templateUrl: '../partials/addAssignment.html',
      controller: addAssignmentController
    })
    .then(function(clickedItem) {
    })
  }

  //the controller for the new assignment modal
  var addAssignmentController = function($scope, $mdDialog){
    $scope.submitAssignment = function(){
      //the newAssignment object is defined on the view an ID is assigned to keep it consistant with the other objecs and allow Url navigation
      $scope.newAssignment.id = Math.ceil(Math.random() * 99999999)
      AssignmentFactory.addAssignment($scope.newAssignment)
      $mdDialog.hide()
    }

    //closes the modal
    $scope.closePartial = function(){
      $mdDialog.hide()
    }
  }

  //whatches for state changes and updates the scoped items based on the change. This allows for navigation using the history option, and allows for transition of state rather than href changes.
  $rootScope.$on("$stateChangeSuccess", function(ev, to, toParams, from, fromParams){
    var toAssignmentId = Number(toParams.id)
    $scope.selected = toAssignmentId
    if($scope.assignment.id !== toAssignmentId){
      console.log("updating")
      updateScope(toAssignmentId)
    }
  })
})