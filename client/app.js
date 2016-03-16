angular.module("teacherPortal",[
  "teacherPortal.HomepageController",
  "teacherPortal.Services",
  "ui.router",
  "angularMoment"
])

.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise("/");

  $stateProvider 
  .state("homepage" , {
    url:"/",
    templateUrl: "homepage/homepage.html",
    controller: "HomepageController"
  })
  .state("homepage.assignment", {
    url:":id",
  })
})
