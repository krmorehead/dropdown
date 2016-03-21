angular.module("teacherPortal",[
  "teacherPortal.HomepageController",
  "teacherPortal.Services",
  "ui.router",
  "angularMoment",
  'ngMaterial',
  'ngMessages'
])

.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise("/homepage");

  $stateProvider 
  .state("homepage" , {
    url:"/homepage",
    templateUrl: "homepage/homepage.html",
    controller: "HomepageController"
  })
  .state("homepage.assignment", {
    url:"/:id",
  })

  .state("homepageDoc",{
    url:"/homepageDoc",
    templateUrl: "docs/homepage.html"
  })
  .state("app",{
    url:"/app",
    templateUrl: "docs/app.html"
  })
  .state("services",{
    url:"/services",
    templateUrl: "docs/services.html"
  })
})
