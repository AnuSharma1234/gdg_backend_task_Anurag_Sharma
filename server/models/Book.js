import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    author : String,
    category : String,
    publishedYear : Number,
    availableCopies : {
        type : Number,
        default : 1
    },
    borrowedCount : {
        type : Number,
        default : 0
    }
},{
    timestamps : true
})

export default mongoose.model("Book",bookSchema)