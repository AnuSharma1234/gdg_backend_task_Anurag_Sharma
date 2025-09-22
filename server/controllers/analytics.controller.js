import Book from '../models/Book'
import User from '../models/User'

export const mostBorrowed = async (req,res) =>{
    try{
        const books = await Book.find().sort({
            borrowedCount: -1
        }).limit(5)

        res.json(books)
    }catch(error){
        res.status(500).json({
            error : error.message
        })
    }
}

export const activeUsers = async(req,res) =>{
    try{
        const users = await User.aggregate([
            { $project: { username: 1, borrowCount: { $size: "$borrowedBooks" } } },
            { $sort: { borrowCount: -1 } },
            { $limit: 5 }
        ])

        res.json(users)
    }catch(error){
        res.status(500).json({
            error : error.message
        })
    }
}