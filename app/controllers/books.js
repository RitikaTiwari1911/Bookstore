/* eslint-disable consistent-return */
const bookService = require('../services/book');

class BookController {
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
          console.log('data from controller', data);
          res.send({
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

    getAllBooks = (req, res) => {
      try {
        bookService.getBook((error, data) => ((error) ? res.status(400).send({
          success: false,
          message: 'Some error occured',
        })
          : res.send({
            success: true,
            message: 'Employee information retrieved successfully!',
            data,
          })));
      } catch (error) {
        return res.send(500).send({
          success: false,
          message: error.message,
        });
      }
    }

    updateBook = (req, res) => {
      try {
        const { bookId } = req.params;
        const bookData = {
          author: req.body.author,
          title: req.body.title,
          quantity: req.body.quantity,
          price: req.body.price,
          description: req.body.description,
          image: req.body.image,
        };

        bookService.updateBook(bookId, bookData, (error, data) => ((error) ? res.status(400).send({
          success: false,
          message: 'Some error occured while updating book',
        })
          : res.send({
            success: true,
            message: 'book updated successfully',
            data,
          })));
      } catch (error) {
        return res.send({
          success: false,
          message: error.message,
        });
      }
    }

    deleteBook = (req, res) => {
      try {
        const { bookId } = req.params;
        bookService.deleteBook(bookId, (error, data) => ((error) ? res.status(400).send({
          success: false,
          message: 'Some error occured while deleting the data',
        })
          : res.send({
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
