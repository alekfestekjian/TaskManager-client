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
        },
        updateSorting : function(values,start){
            var sorter = values[0];
            var order = values[1];
            var sortWith = values[2];
            var baseUrl = $window.sessionStorage.baseurl;
            console.log("Sortlen" +sorter);
            if(sorter === 1){
                sorter = "true";
            }
            if(sorter === 0){
                sorter = "false"
            }
            if(order === false){
                order = -1;
            }
            else{
                order = 1;
            }
            if(sorter === 2){
                console.log("HI")
                return $http.get(baseUrl+'/api/tasks?sort={"'+sortWith+'": "'+order+'"}'+'&skip=' + start + '&limit=10');//'&sort={"'+sortWith+'":"'+ascending+'"}');

            }
            else{
                return $http.get(baseUrl+'/api/tasks?where={"completed": "'+sorter+'"}&sort={"'+sortWith+'": "'+order+'"}'+'&skip=' + start + '&limit=10');//'&sort={"'+sortWith+'":"'+ascending+'"}');

            }

        },
        getSortingLength : function(values,start){
            var sorter = values[0];
            var order = values[1];
            var sortWith = values[2];
            console.log(sorter);
            var baseUrl = $window.sessionStorage.baseurl;

            if(sorter === 2){
                sorter = "all";
            }
            else if(sorter === 1){
                sorter = "true";
            }else{
                sorter = "false"
            }

            if(order === false){
                order = -1
            }else{
                order = 1
            }
            if(sorter === 2){
                console.log("HI N")
                return $http.get(baseUrl+'/api/tasks?sort={"'+sortWith+'":"'+order+'"}');
            }
            else{
                return $http.get(baseUrl+'/api/tasks?where={"completed": "'+sorter+'"}&sort={"'+sortWith+'":"'+order+'"}');
            }
        }
    }
});
