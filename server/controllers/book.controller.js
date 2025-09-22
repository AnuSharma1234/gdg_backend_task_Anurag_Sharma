import Book from "../models/Book.js";

export const createBook = async (req, res) => {
  try {
    const {title , author , category , availableCopies} = req.body
    const newBook = new Book({title , author , category , availableCopies})
    await newBook.save()
    res.json(newBook)
 } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBooks = async (req, res) => {
    const { 
      page = 1, 
      limit = 10, 
      author, 
      category, 
      title, 
      available, 
      sort = "title" 
    } = req.query;
  
    const filter = {};
  
    if (author) filter.author = new RegExp(author, "i"); 
    if (category) filter.category = new RegExp(category, "i");
    if (title) filter.title = new RegExp(title, "i");
    if (available !== undefined) filter.available = available === "true";
  
    try {
      const books = await Book.find(filter)
        .sort(sort) 
        .skip((page - 1) * limit)
        .limit(Number(limit));
  
      const total = await Book.countDocuments(filter);
  
      res.json({
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
        books
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
