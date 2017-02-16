/**
 * Created by Rohit on 15-Feb-17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("loginController",function (UserService,$location){
            var vm=this;
            vm.login=login;

            function login(user){
                if(user!=null){
                    var userReturned=UserService.findUserByCredential(user.name,user.pass);
                    if(userReturned==null){
                        vm.error="User not found";
                    }else{
                        $location.url("/user/"+userReturned._id);
                    }
                }
            }
        });
})();