module.exports=function (app) {
    var UserModel=require('./user/user.model.server')();

    console.log(UserModel);
    var user={username:"Rohit"};
    UserModel.createUser(user);
};