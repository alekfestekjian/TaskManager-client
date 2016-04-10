var mp4Controllers = angular.module('mp4Controllers', []);

mp4Controllers.controller('AddTaskController', ['$scope','$http','$window' ,'Tasks','Users', function($scope, $http,$window,Tasks,Users) {
    Users.get().success(function(data){
        $scope.users = data.data;
    });

    $scope.addTask = function(task){
        if(typeof(task.assignedUser) == "undefined"){
            task.assignedUser = ""
        }
        Users.getUser(task.assignedUser).success(function(response){
            $scope.user_info = response.data;
            task.assignedUserName = response.data.name;
            Tasks.post(task).then(function(response) {
                console.log($scope.user_info.pendingTasks);
                $scope.user_info.pendingTasks.push();
                Users.put($scope.user).success(function(data){
                    alert("added to pending tasks");
                });
                alert(response.data.message);

            },function failure(fail_response){
                alert(fail_response.data.message);
            });
        });
    };

}]);
mp4Controllers.controller('AddUserController', ['$scope','$http','$window' ,'Users', function($scope, $http,$window,Users) {
    $scope.addUser = function(user){
        Users.post(user).then(function(response) {
            alert(response.data.message);
        },function failure(fail_response){
            alert(fail_response.data.message);
        });
    };
}]);
mp4Controllers.controller('TaskListController', ['$scope','$http','$window' ,'Tasks', function($scope, $http,$window,Tasks){
    $scope.startNum = 0;
    Tasks.get().success(function(data){
        $scope.taskLen = data.data.length
    });
    Tasks.getLimitTasks($scope.startNum).success(function(data){
        $scope.tasks = data.data;
    });

    $scope.remove = function(id){
        Tasks.remove(id).success(function(delete_data){
            Tasks.getLimitTasks($scope.startNum).success(function(data){
                $scope.tasks = data.data;
            });
        });
    };

    $scope.next = function(){
        if($scope.startNum + 10 <= $scope.taskLen){
            $scope.startNum += 10;
            document.getElementById("next").className= "button";
        }
        if($scope.startNum + 11 >= $scope.taskLen){
            document.getElementById("next").className= "disabled button";
        }
        if($scope.startNum != 0 ){
            document.getElementById("prev").className= "button";
        }
        Tasks.getLimitTasks($scope.startNum).success(function(data){
            $scope.tasks = data.data;
        });
        Tasks.get().success(function(data){
            $scope.taskLen = data.data.length
        });
    };
    $scope.previous = function(){
        if($scope.startNum != 0){
            $scope.startNum -= 10;
            document.getElementById("next").className= "button";
        }
        if($scope.startNum - 11 <= 0){
            document.getElementById("prev").className= "disabled button";
        }
        else{
            document.getElementById("prev").className= "disabled button";
        }
        Tasks.getLimitTasks($scope.startNum).success(function(data){
            $scope.tasks = data.data;
        });
        Tasks.get().success(function(data){
            $scope.taskLen = data.data.length
        });
    };
}]);
mp4Controllers.controller('UserListController', ['$scope','$http','$window' ,'Users','Tasks', function($scope, $http,$window,Users,Tasks) {
    Users.get().success(function(data){
        $scope.users = data.data;
    });

    $scope.remove = function(id){
        Tasks.getPendingTasks(id).success(function(data){
            $scope.tasks = data.data;
            for(var i = 0; i < $scope.tasks.length; i++){
                $scope.tasks[i].assignedUser = "";
                $scope.tasks[i].assignedUserName = "unassigned";
                Tasks.put($scope.tasks[i]);
            }
        });
        Users.remove(id).success(function(delete_data){
            Users.get().success(function(reload){
                $scope.users = reload.data;
            });
        });

    };

}]);

mp4Controllers.controller('TaskDetailsController', ['$scope','$routeParams', '$http','$window' ,'Tasks', function($scope,$routeParams, $http,$window,Tasks) {
    Tasks.getTask($routeParams.task_id).success(function(response) {
        $scope.task = response.data;
    });

}]);
mp4Controllers.controller('UserDetailsController', ['$scope',  '$routeParams', '$http', '$window' , 'Users','Tasks', function($scope, $routeParams, $http, $window, Users,Tasks) {
    Users.getUser($routeParams.user_id).success(function(response) {
        $scope.showCompleted = false;
        $scope.user = response.data;
        $scope.id = $scope.user._id
        console.log($scope.user._id);
        Tasks.getPendingTasks($scope.user._id).success(function(pending){
            $scope.pendingTasks = pending.data;
        });
        Tasks.getCompletedTasks($scope.user._id).success(function(completed){
            $scope.completedTasks = completed.data;

        });
    });


    $scope.complete = function(task){
        console.log(task.completed);
        console.log(task);

        task.completed = true;
        Tasks.put(task).success(function(data){
            Tasks.getPendingTasks($scope.id).success(function(data){
                $scope.pendingTasks = data.data;
            });
        });
    }

}]);
mp4Controllers.controller('EditTaskController', ['$scope','$routeParams', '$http','$window' ,'Tasks','Users', function($scope,$routeParams, $http,$window,Tasks,Users) {

    Users.get().success(function(data){
        $scope.users = data.data;

        Tasks.getTask($routeParams.task_id).success(function(response) {
            $scope.task = response.data;
        });
    });

    $scope.updateTask = function(task){
        Users.getUser(task.assignedUser).success(function(response){
            task.assignedUserName = response.data.name;
            Tasks.put(task).then(function(response) {
                alert(response.data.message);
            },function failure(fail_response){
                alert(fail_response.data.message);
            });
        });

    };
}]);

mp4Controllers.controller('SettingsController', ['$scope' , '$window' , function($scope, $window) {
  $scope.url = $window.sessionStorage.baseurl;

  $scope.setUrl = function(){
    $window.sessionStorage.baseurl = $scope.url;
    $scope.displayText = "URL set";

  };

}]);
