var app = angular.module('mp4', ['ngRoute','720kb.datepicker', 'mp4Controllers', 'mp4Services']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/firstview', {
    templateUrl: 'partials/firstview.html',
    controller: 'FirstController'
  }).
  when('/secondview', {
    templateUrl: 'partials/secondview.html',
    controller: 'SecondController'
  }).
  when('/settings', {
    templateUrl: 'partials/settings.html',
    controller: 'SettingsController'
  }).
  when('/llamalist', {
    templateUrl: 'partials/llamalist.html',
    controller: 'LlamaListController'
  }).
  when('/addtask', {
    templateUrl: 'partials/addtask.html',
    controller: 'AddTaskController'
  }).
  when('/adduser', {
    templateUrl: 'partials/adduser.html',
    controller: 'AddUserController'
  }).
  when('/edit/:task_id', {
    templateUrl: 'partials/edittask.html',
    controller: 'EditTaskController'
  }).
  when('/taskdetails/:task_id', {
    templateUrl: 'partials/taskdetails.html',
    controller: 'TaskDetailsController'
  }).
  when('/userdetails/:user_id', {
    templateUrl: 'partials/userdetails.html',
    controller: 'UserDetailsController'
  }).
  when('/tasklist', {
    templateUrl: 'partials/tasklist.html',
    controller: 'TaskListController'
  }).
  when('/userlist', {
    templateUrl: 'partials/userlist.html',
    controller: 'UserListController'
  }).
  otherwise({
    redirectTo: '/settings'
  });
}]);
