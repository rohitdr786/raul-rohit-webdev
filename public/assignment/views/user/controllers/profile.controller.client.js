/**
 * Created by Rohit on 15-Feb-17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController", function ($routeParams, UserService, $location) {
            var vm = this;

            var userId = $routeParams["uid"];
            var promise = UserService.findUserById(userId);
            promise.then(function (response) {
                vm.user = response.data;

                vm.update = function (newUser) {
                    var user = UserService.updateUser(userId, newUser);
                    user.success(function(response){
                        vm.message = "User successfully updated";
                    });
                    user.error(function(){
                        vm.error = "Unable to update";
                    });
                    // if (user == null) {
                    //     vm.error = "Unable to update";
                    // } else {
                    //     vm.message = "User successfully updated";
                    // }
                };

                vm.deleteUser = function (userId) {
                    var promise = UserService.deleteUser(userId);
                    promise.then(function(response){
                        $location.url("/login");
                    },function(){
                        vm.error = "Unable to delete";
                    });
                    // if (status == null) {
                    //     vm.error = "Unable to delete";
                    // } else {
                    //     $location.url("/login");
                    // }
                }
            }, function () {
                $location.url("/login");
            });
        });
})();