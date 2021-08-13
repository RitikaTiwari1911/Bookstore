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

    // getAllBooks = (req, res) => {
    //  bookService.getBook()
    //    .then((data) => {
    //      res.send({
    //        message: 'All books fetched successfully',
    //        data,
    //      });
    //    })
    //    .catch((error) => {
    //      res.send({
    //        message: 'Some error occured while fetching the books',
    //        error,
    //
    //      });
    //    });
    // }

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
}
module.exports = new BookController();
