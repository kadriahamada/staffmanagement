const pool = require("../config/db");

const findBookExist = async (title, author, category, description) => {
  const [isBook] = await pool.query(
    "SELECT * FROM books WHERE title = ? AND author = ? AND category = ? AND description = ?",
    [title, author, category, description],
  );
  return isBook.length > 0;
};

const findAllBooks = async (books) => {
  const [rows] = await pool.query("SELECT * FROM books", [books]);
  return rows;
};
const createBook = async (
  title,
  author,
  category,
  description,
  createdDate,
) => {
  const [newBook] = await pool.query(
    "INSERT INTO books(title, author, category, description, createdDate) VALUES(?,?,?,?,?)",
    [title, author, category, description, createdDate],
  );
  return newBook;
};
const updateBook = async (
  id,
  title,
  author,
  category,
  description,
  createdDate,
) => {
  const [updates] = await pool.query(
    "UPDATE books SET title = ?, author = ?, category =?, description =?, createdDate = ? WHERE id = ?",
    [title, author, category, description, createdDate, id],
  );
  return updates;
};
const deleteBook = async (id) => {
  const [dltBook] = await pool.query("DELETE FROM books WHERE id = ?", [id]);
  return dltBook;
};
const findOneBook = async (id) => {
  const [getOne] = await pool.query("SELECT * FROM books WHERE id = ?", [id]);
  return getOne[0];
};

module.exports = {
  findBookExist,
  findAllBooks,
  createBook,
  updateBook,
  deleteBook,
  findOneBook,
};
