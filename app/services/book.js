/* eslint-disable consistent-return */
/* eslint-disable max-len */
/**
 * @module       service
 * @file        book.js
 * @description  userService is a middleware between controller and model
 * @author       Ritika <spk2ritika1911@gmail.com>
 * @since        13/08/2021
-----------------------------------------------------------------------------------------------*/
const bookModel = require('../model/book');

class BookService {
      /**
       * @description its a middleware between controller and model for addBook
       * @param {*} bookData
       * @returns
       */
      addBook = async (bookData) => {
        const data = await bookModel.createBook(bookData);
        console.log('data from service', data);
        return data;
      }

      /**
       * @description its a middleware between controller and model for getBook
       * @param {*} callBack
       */
     getBook = (callBack) => {
       bookModel.get((error, data) => ((error) ? callBack(error, null) : callBack(null, data)));
     }

     /**
      * @description its a middleware between controller and model for update Book
      * @param {*} data
      * @returns
      */
     updateBook = (data) => new Promise((resolve, reject) => {
       const result = bookModel.updateBook(data);
       result.then((book) => resolve(book)).catch((err) => reject(err));
     })

     /**
      * @description its a middleware between controller and model for update book
      * @param {*} bookId
      * @param {*} callback
      * @returns
      */
     deleteBook = (bookId, callback) => {
       try {
         bookModel.deleteBook(bookId, (error, data) => ((error) ? callback(error, null) : callback(null, data)));
       } catch (error) {
         return callback(error, null);
       }
     }
}
module.exports = new BookService();
