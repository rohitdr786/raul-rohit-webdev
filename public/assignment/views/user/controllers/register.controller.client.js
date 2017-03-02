/**
 * Created by Rohit on 15-Feb-17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("registerController",function(UserService,$location){

            var vm=this;

            vm.register=function(newUser,verify){
                if(newUser.password!=verify){
                    vm.error="Password does not match";
                    return false;
                }
                UserService.findUserByUsername(newUser.username)
                    .success(function(user){
                        vm.error="Sorry!!! Username already taken";
                    })
                    .error(function(){
                        UserService.addNewUser(newUser)
                            .success(function(user){
                                $location.url("/user/"+user._id);
                            })
                            .error(function(user){
                                vm.error="Unable to add user";
                            });
                    });
                // var user=UserService.addNewUser(newUser);
                // if(user==null){
                //     vm.error="Unable to add user";
                // }else{
                //     $location.url("/user/"+user._id);
                // }
            };

        });
})();