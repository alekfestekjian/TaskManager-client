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
                $scope.user_id = response.data.data._id;
                $scope.user_info.pendingTasks.push($scope.user_id);
                Users.put($scope.user_info).success(function(data){
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
        Users.post(user).then(function(response,data) {
            alert(response.data.message);
        },function failure(fail_response){
            alert(fail_response.data.message);
        });
    };
}]);
mp4Controllers.controller('TaskListController', ['$scope','$http','$window' ,'Tasks','Users', function($scope, $http,$window,Tasks,Users){
    $scope.startNum = 0;

    $scope.sorter = 1;
    $scope.order = 1;
    $scope.sortWith = "deadline";
    $scope.valuesSort = [$scope.sorter,$scope.ascending,$scope.sortWith];
    Tasks.updateSorting($scope.valuesSort,$scope.startNum).success(function(data){
        $scope.tasks = data.data;
    });

    Tasks.getSortingLength($scope.valuesSort,$scope.startNum).success(function(data){
        $scope.taskLen = data.data.length;
    });

    $scope.$watchGroup(['sorter','order','sortWith'], function(newValue, oldValue) {
        $scope.valuesSort = [newValue[0],newValue[1],newValue[2]];
        if(newValue[0] != oldValue[0]){
            $scope.startNum = 0;
            Tasks.updateSorting($scope.valuesSort,$scope.startNum).success(function(data){
                $scope.tasks = data.data;
            });
        }
        else{
            Tasks.updateSorting($scope.valuesSort,$scope.startNum).success(function(data){
                $scope.tasks = data.data;
            });
        }

    });
    // $scope.sorter = 0;

    $scope.remove = function(id){
        Tasks.getTask(id).success(function(task_data){
            $scope.ownerID = task_data.data.assignedUser;
            // alert($scope.ownerID);
            if($scope.ownerID != "unassigned"){
                console.log($scope.ownerID);
                Users.getUser($scope.ownerID).success(function(response){
                    $scope.user = response.data;
                    // console.log($scope.user.pendingTasks);
                    $scope.index = $scope.user.pendingTasks.indexOf(id);
                    if ($scope.index !== -1) {
                        $scope.user.pendingTasks.splice($scope.index, 1);
                    }
                    Users.put($scope.user).success(function(response){
                    });

                    Tasks.remove(id).success(function(delete_data){
                        // $scope.deleteUserId = delete_data.data.assignedUser;
                        // Tasks.getLimitTasks($scope.startNum).success(function(data){
                        //     $scope.tasks = data.data;
                        // });
                        alert("Task deleted");
                        Tasks.updateSorting($scope.valuesSort,$scope.startNum).success(function(data){
                            console.log("updating task");
                            $scope.tasks = data.data;
                        });
                        Tasks.getSortingLength($scope.valuesSort,$scope.startNum).success(function(data){
                            console.log("getting len task");
                            $scope.taskLen = data.data.length;
                            console.log($scope.taskLen);
                        });
                    });
                });
            }
            else{
                Tasks.remove(id).success(function(delete_data){
                    // $scope.deleteUserId = delete_data.data.assignedUser;
                    // Tasks.getLimitTasks($scope.startNum).success(function(data){
                    //     $scope.tasks = data.data;
                    // });
                    alert("Task deleted");
                    Tasks.updateSorting($scope.valuesSort,$scope.startNum).success(function(data){
                        console.log("updating task");
                        $scope.tasks = data.data;
                    });
                    Tasks.getSortingLength($scope.valuesSort,$scope.startNum).success(function(data){
                        console.log("getting len task");
                        $scope.taskLen = data.data.length;
                        console.log($scope.taskLen);
                    });
                });
            }


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
        Tasks.updateSorting($scope.valuesSort,$scope.startNum).success(function(data){
            console.log("updating task");
            $scope.tasks = data.data;
        });
        Tasks.getSortingLength($scope.valuesSort,$scope.startNum).success(function(data){
            console.log("getting len task");
            $scope.taskLen = data.data.length;
            console.log($scope.taskLen);
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
            document.getElementById("prev").className= "button";
        }
        Tasks.updateSorting($scope.valuesSort,$scope.startNum).success(function(data){
            console.log("updating task");
            $scope.tasks = data.data;
        });
        Tasks.getSortingLength($scope.valuesSort,$scope.startNum).success(function(data){
            console.log("getting len task");
            $scope.taskLen = data.data.length;
            console.log($scope.taskLen);
        });

        // Tasks.getLimitTasks($scope.startNum).success(function(data){
        //     $scope.tasks = data.data;
        // });
        // Tasks.get().success(function(data){
        //     $scope.taskLen = data.data.length
        // });
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
            alert("User removed")
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

// Make it so if marked complete remove from users pending tasks
    $scope.complete = function(task){
        task.completed = true;
        $scope.ownerID = task.assignedUser;

        Users.getUser($scope.ownerID).success(function(response){
            $scope.user = response.data;
            $scope.index = $scope.user.pendingTasks.indexOf(task._id);
            if ($scope.index !== -1) {
                $scope.user.pendingTasks.splice($scope.index, 1);
            }
            Users.put($scope.user).success(function(response){
            });

        });
        Tasks.put(task).success(function(data){
            Tasks.getPendingTasks($scope.id).success(function(data){
                $scope.pendingTasks = data.data;
            });
        });
    }
    $scope.showComplete = function(){
        $scope.showCompleted = true
        Tasks.getCompletedTasks($scope.user._id).success(function(completed){
            $scope.completedTasks = completed.data;
        });
    }

}]);
mp4Controllers.controller('EditTaskController', ['$scope','$routeParams', '$http','$window' ,'Tasks','Users', function($scope,$routeParams, $http,$window,Tasks,Users) {
    $scope.oldUser_id = ""
    Users.get().success(function(data){
        $scope.users = data.data;

        Tasks.getTask($routeParams.task_id).success(function(response) {
            $scope.task = response.data;
            // console.log($scope.task)
            $scope.oldUser_id = $scope.task.assignedUser
            Users.getUser($scope.oldUser_id).success(function(response){
                $scope.oldUser = response.data;
            });
        });
    });
    $scope.updateTask = function(task){
        // console.log(task);
        Users.getUser(task.assignedUser).success(function(response){
            $scope.user = response.data;
            if(task.completed === true || task.completed === "true"){
                $scope.index = $scope.user.pendingTasks.indexOf(task._id);
                if ($scope.index !== -1) {
                    $scope.user.pendingTasks.splice($scope.index, 1);
                }
                Users.put($scope.user).success(function(response){
                });
            }else{

                if($scope.oldUser_id === task.assignedUser){
                    $scope.index = $scope.user.pendingTasks.indexOf(task._id);
                    if($scope.index > -1){

                    }else{
                        $scope.user.pendingTasks.push(task._id);
                    }
                    Users.put($scope.user).success(function(data){
                    });
                }else{
                    $scope.index = $scope.oldUser.pendingTasks.indexOf(task._id);
                    if ($scope.index !== -1) {
                        $scope.oldUser.pendingTasks.splice($scope.index, 1);
                    }
                    Users.put($scope.oldUser).success(function(response){
                    });
                    //adding pending task to new User
                    $scope.index = $scope.user.pendingTasks.indexOf(task._id);
                    if($scope.index > -1){

                    }else{
                        $scope.user.pendingTasks.push(task._id);
                    }
                    Users.put($scope.user).success(function(data){
                    });
                }

            }


            task.assignedUserName = response.data.name;
            Tasks.put(task).then(function(response) {
                alert("Task has been updated")
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
