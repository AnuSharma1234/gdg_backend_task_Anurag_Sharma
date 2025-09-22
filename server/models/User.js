import mongoose from "mongoose";
import bcrypt from "bcryptjs"


const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ["user", "admin"],
        default : "user"
    },
    borrowedBooks : [
        {
            book : {
                type : mongoose.Schema.Types.ObjectId , ref : "Book"
            },
            borrowedAt : {
                type : Date,
                default : Date.now
            }
        }
    ]
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.matchPassword = async function (enterPassword){
    return await bcrypt.compare(enterPassword,this.password)
}

export default mongoose.model("User",userSchema)