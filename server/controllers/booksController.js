const booksModel = require("../models/booksModel");
const { format } = require("date-fns");

const findAllBooks = async (req, res) => {
  try {
    const books = await booksModel.findAllBooks();
    if (books.length === 0) {
      return res
        .status(404)
        .json({ message: "No books have been found to display." });
    }
    return res.status(200).json(books);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Something went wrong we could't proceed." });
  }
};

const createBook = async (req, res) => {
  const { title, author, category, description } = req.body;

  if (!title || !author || !category || !description) {
    return res.status(400).json({
      message: "Please title, author category and description are required!",
    });
  }
  const duplicates = await booksModel.findBookExist(
    title,
    author,
    category,
    description,
  );
  if (duplicates) {
    return res
      .status(409)
      .json({ message: "Book already exist and cannot be created again." });
  }
  try {
    const createdDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const newBook = await booksModel.createBook(
      title,
      author,
      category,
      description,
      createdDate,
    );
    if (newBook.affectedRows === 1) {
      return res.status(201).json({
        success: true,
        message: "A new book has been successfully created.",
        data: newBook,
      });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Something went wrong failed to create the book." });
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, category, description } = req.body;

  if (!title || !author || !category || !description) {
    return res.status(400).json({
      message:
        "Please verify well you can not update empty values at any label",
    });
  }
  try {
    const createdDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const updatedBook = await booksModel.updateBook(
      id,
      title,
      author,
      category,
      description,
      createdDate,
    );
    console.log(updatedBook);
    if (updatedBook.affectedRows === 0) {
      return res.status(404).json({
        message: `Book ID ${req.params.id} has not been found we cannot update!`,
      });
    }
    return res.status(200).json({
      success: true,
      message: `Book ID ${req.params.id} has been successfully updated.`,
      data: {
        id,
        title,
        author,
        category,
        description,
      },
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Something went wrong, we hsve failed to update!" });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const dltBook = await booksModel.deleteBook(id);
    if (dltBook.affectedRows === 0) {
      return res.status(404).json({
        message: `Book ID ${req.params.id} has not been found we cannot delete!`,
      });
    }
    return res.status(200).json({
      success: true,
      message: `Book ID ${req.params.id} has been successfully deleted.`,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Something went wrong failed to delete." });
  }
};

const findOneBook = async (req, res) => {
  const { id } = req.params;

  try {
    const getOne = await booksModel.findOneBook(id);

    if (!getOne) {
      return res.status(404).json({
        message: `Book ID ${req.params.id} has not been found!`,
      });
    }

    return res.status(200).json({ success: true, data: getOne });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Seomething went wrong failed to get book." });
  }
};

module.exports = {
  findAllBooks,
  createBook,
  updateBook,
  deleteBook,
  findOneBook,
};
