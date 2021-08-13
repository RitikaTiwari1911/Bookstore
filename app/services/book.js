/* eslint-disable consistent-return */
/* eslint-disable max-len */
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

     updateBook = (bookId, bookData, callback) => {
       try {
         bookModel.updateBook(bookId, bookData, (error, data) => ((error) ? callback(error, null) : callback(null, data)));
       } catch (error) {
         return callback(error, null);
       }
     }

     deleteBook = (bookId, callback)=>{
      try{
          bookModel.deleteBook(bookId, (error, data)=>{
              return((error)?callback(error, null): callback(null, data));
          });
      }catch(error){
          return callback(error,null);
      }
  }
}
module.exports = new BookService();
