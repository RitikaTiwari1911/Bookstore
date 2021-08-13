/* eslint-disable consistent-return */
/**
 * @module       controller
 * @file         book.js
 * @description  bookController holds the API
 * @author       Ritika <spk2ritika1911@gmail.com>
 * @since        13/08/2021
-----------------------------------------------------------------------------------------------*/

const bookService = require('../services/book');

class BookController {
  /**
   * @description controller for adding books
   * @param {*} req
   * @param {*} res
   */
    addBook = (req, res) => {
      const bookData = {
        author: req.body.author,
        title: req.body.title,
        quantity: req.body.quantity,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image,
      };
      console.log('bookData', bookData);

      bookService.addBook(bookData)
        .then((data) => {
          res.status(200).send({
            message: 'Book added successfully!!',
            data,
          });
        })
        .catch((error) => {
          console.log('error from controller', error);
          res.send({
            message: 'Some error occured while adding the book',
          });
        });
    }

    /**
     * @description controller for getting all books
     * @param {*} req
     * @param {*} res
     * @returns
     */
    getAllBooks = (req, res) => {
      try {
        bookService.getBook((error, data) => ((error) ? res.status(400).send({
          success: false,
          message: 'Some error occured',
        })
          : res.status(200).send({
            success: true,
            message: 'Books retrieved successfully!',
            data,
          })));
      } catch (error) {
        return res.send(500).send({
          success: false,
          message: error.message,
        });
      }
    }

    /**
     * @description controller for updating books
     * @param {*} req
     * @param {*} res
     * @returns
     */
    updateBook = (req, res) => {
      try {
        const bookDetails = {
          author: req.body.author,
          title: req.body.title,
          image: req.body.image,
          quantity: req.body.quantity,
          price: req.body.price,
          description: req.body.description,
          bookId: req.params.bookId,
        };
        const result = bookService.updateBook(bookDetails);
        result.then(() => res.status(200).send({
          success: true,
          message: 'Your book updated successfully',
        })).catch(() => res.status(400).send({
          success: false,
          message: 'Failed to update book',
        }));
      } catch (err) {
        res.status(500).send({
          success: false,
          message: 'Internal error from the server',
        });
      }
    }

    /**
     * @description controller for deleting books
     * @param {*} req
     * @param {*} res
     * @returns
     */
    deleteBook = (req, res) => {
      try {
        const { bookId } = req.params;
        bookService.deleteBook(bookId, (error, data) => ((error) ? res.status(400).send({
          success: false,
          message: 'Some error occured while deleting the data',
        })
          : res.status(200).send({
            success: true,
            messsage: 'deleted the user successfully!!',
            data,
          })));
      } catch (error) {
        return res.status(500).send({
          success: false,
          message: error.message,
        });
      }
    }
}
module.exports = new BookController();
