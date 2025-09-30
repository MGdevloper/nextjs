import mongoose from 'mongoose'

let userschema=mongoose.Schema({

    username:{
        type:String,
        required:[true,"username is required"],
        unique:[true,"username must be unique"],
        trim:true,
    }
    ,
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email is aready exists"],

    },
    password:{
        type:String,
        required:[true,"password is required"],
        minlength:[6,"minimum length is 6"],
       
    },
    admin:{
        type:Boolean,
        default:false,
    },
    verifyed:{
        type:Boolean,
        default:false,
    },
    verifytoken:{
        type:String,
    },
    verifytokenexp:{
        type:Date,
    },
    forgotpasswordtoken:{
        type:String,
    },
    forgotpasswordtokenexp:{
        type:Date,
    }

})

const usersmodel = mongoose.models.users || mongoose.model("users", userschema);

export default usersmodel;
