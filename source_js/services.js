var mp4Services = angular.module('mp4Services', []);

mp4Services.factory('CommonData', function(){
    var data = "";
    return{
        getData : function(){
            return data;
        },
        setData : function(newData){
            data = newData;
        }
    }



});

mp4Services.factory('Llamas', function($http, $window) {
    return {
        get : function() {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl+'/api/llamas');
        }
    }
});

mp4Services.factory('Users', function($http, $window) {
    return {
        get : function() {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl+'/api/users/');

        },
        put : function(user) {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.put(baseUrl+'/api/users/' + user._id,user);

        },
        post : function(user) {
            var baseUrl = $window.sessionStorage.baseurl;
            console.log(user);
            return $http.post(baseUrl+'/api/users/',user);

        },
        remove : function(id) {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.delete(baseUrl+'/api/users/' + id);

        },
        getUser : function(id){
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl+'/api/users/' + id);
        }
    }
});

mp4Services.factory('Tasks', function($http, $window) {
    return {
        get : function() {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl+'/api/tasks/');

        },
        post : function(data) {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.post(baseUrl+'/api/tasks/',data);

        },
        put : function(task) {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.put(baseUrl+'/api/tasks/' + task._id,task);

        },
        remove : function(id) {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.delete(baseUrl+'/api/tasks/' + id);

        },
        getTask : function(id){
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl+'/api/tasks/' + id);
        },
        getLimitTasks : function(start){
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl+'/api/tasks?skip=' + start + '&limit=10');
        },
        getPendingTasks : function(id){
               var baseUrl = $window.sessionStorage.baseurl;
               return $http.get(baseUrl+'/api/tasks?where={"assignedUser": "'+id+'","completed": false }');
        },
        getCompletedTasks : function(id){
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl+'/api/tasks?where={"assignedUser": "'+id+'","completed": true }');
        }
    }
});
