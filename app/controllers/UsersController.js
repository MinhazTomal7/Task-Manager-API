import usersModel from "../model/UsersModel.js";
import {EncodeToken} from "../utility/tokenUtility.js";
import EmailSend from "../utility/emailUtility.js";

export const Registration = async (req, res) => {

    try {
        let reqBody = req.body;
        await usersModel.create(reqBody)


    return res.json({
        status: "success",
        "Message": "User Registration Successful"})
}

catch (err){

    return res.json({
        status: "failed",
        "Message": err.toString()})
}
}

export const Login = async (req, res) =>{

    try {
        let reqBody = req.body;
        let data =  await usersModel.findOne(reqBody)
        if(data===null){
            return res.json({
                status: "fail",
                "Message": "User not found"})
        }
        else{
            let token = EncodeToken(data['email'], data['_id'])

            return res.json({
                status: "success",
                token,
                "Message": "User Login Successful"})
        }
    }

    catch (err){
        return res.json({
            status: "failed",
            "Message": err.toString()})
    }
}


export const ProfileDetails = async (req, res) =>{
  try {
      let user_id = req.headers['user_id'];
      let data = await usersModel.findOne({"_id":user_id})
      return res.json({
          status: "success",
          "Message" : "User ProfileDetails Successful",
          data:data
      })
  }
  catch (err){
      return res.json({
          status: "failed",
          "Message": err.toString()})
  }
}


export const ProfileUpdate = async (req, res) =>{

    try {

        let reqBody = req.body;
        let user_id = req.headers['user_id'];
       await usersModel.updateOne({"_id":user_id}, reqBody)
        return res.json({
            status: "success",
            "Message" : "User updated Successful"
        })
    }
    catch (err){
        return res.json({
            status: "failed",
            "Message": err.toString()})
    }
}

export const EmailVerify = async (req, res) =>{
 try {
     let email = req.params.email;
     let data = await usersModel.findOne({email: email})
     if(data === null){
         return res.json({
             status: "failed",
             "Message" : "User email does not exist"
         })
     }
     else {

         let code = Math.floor(100000+Math.random()*900000)
         let EmailTo = data['email']
         let EmailText = "Your code is "+code;
         let EmailSubject = "Task Manager Verification Code"
         await EmailSend(EmailTo, EmailSubject,EmailText)
         await usersModel.updateOne({email: email},{otp:code})
         return res.json({
             status: "success",
             "Message" : "Verification Successful, check mail"
         })
     }
 }

 catch (err){
     return res.json({
         status: "failed",
         "Message": err.toString()})
 }
}


export const CodeVerify = async (req, res) =>{
try {
    let email = req.params.email;
    let code = req.params.code;

    let data = await usersModel.findOne({email: email, otp: code})
    if(data===null){

        return res.json({
            status: "failed",
            "Message" : "Wrong Verification Code"
        })
    }
    else {
        return res.json({
            status: "success",
            "Message" : "Verification Successful"
        })
    }
}

catch (err){
    return res.json({
        status: "failed",
        "Message": err.toString()})
}


}

export const ResetPassword = async (req, res) =>{
  try {
      let reqBody = req.body
      let data = await usersModel.findOne({email: reqBody['email'], otp: reqBody['code']})
      if(data===null){

          return res.json({
              status: "failed",
              "Message" : "Wrong Verification Code"
          })
      }
      else {
          await usersModel.updateOne({email: reqBody['email']},{
              otp:"0", password:reqBody['password']
          })
      }
      return res.json({
          status: "Success",
          "Message" : "Reset Password Successful"
      })
  }
  catch (err){
      return res.json({
          status: "failed",
          "Message": err.toString()})
  }

}