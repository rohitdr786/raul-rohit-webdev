/**
 * Created by Rohit on 15-Feb-17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("profileController",function($routeParams,UserService){
            var vm=this;

            var userId=$routeParams["uid"];
            var user=UserService.findUserById(userId);
            vm.user=user;

            vm.update=function (newUser){
                var user=UserService.updateUser(userId,newUser);
                if(user==null){
                    vm.error="Unable to update";
                }else{
                    vm.message="User successfully updated";
                }
            };
        });

})();