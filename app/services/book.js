const bookModel = require('../model/book');

class BookService {
        addBook = async (bookData) => {
          const data = await bookModel.createBook(bookData);
          console.log('data from service', data);
          return data;
        }

     getBook = (callBack) => {
       bookModel.get((error, data) => ((error) ? callBack(error, null) : callBack(null, data)));
     }
}
module.exports = new BookService();
