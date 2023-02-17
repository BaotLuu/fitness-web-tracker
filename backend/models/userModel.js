const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

//signup method
userSchema.statics.signup = async function (userName,password) {
    //check if fields are empty
    if(!userName || !password){
        throw Error("Please enter all fields")
    }
    const userExist = await this.findOne({userName})

    //check if username already exist
    if(userExist){
        throw Error('User name already taken')
    }

    //create user
    const user = await this.create({userName,password})

    return user;
}

//login
userSchema.statics.login = async function (userName,password) {
      //check if fields are empty
      if(!userName || !password){
        throw Error("Please enter all fields")
    }

    const userExist = await this.findOne({userName})

    //check if username already exist
    if(!userExist){
        throw Error('User name invalid')
    }

    const match = await password

    if(match.localeCompare(userExist.password)){
        throw Error ('Incorrect password')
    }

    return userExist;

}

module.exports = mongoose.model("User", userSchema);
