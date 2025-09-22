import { Router } from 'express';
import { createBook, getBooks, getBookById, updateBook, deleteBook } from "../controllers/bookController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const bookRouter = Router()

bookRouter.get("/",getBooks)

bookRouter.post("/",protect,adminOnly,createBook)

bookRouter.get("/:id",getBookById)

bookRouter.put("/:id",protect,adminOnly,updateBook)

bookRouter.delete("/:id",protect,adminOnly,deleteBook)

export default bookRouter