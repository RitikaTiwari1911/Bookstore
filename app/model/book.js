/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-use-before-define */

/**
 * @module       Model
 * @file         book.js
 * @description  schema holds the database Schema
 * @author       Ritika <spk2ritika1911@gmail.com>
 * @since        13/08/2021
-----------------------------------------------------------------------------------------------*/
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,

    },
    // adminId: {
    //    type: mongoose.Schema.Types.ObjectId,
    //    ref: 'User',
    // },
    isAddedToBag: {
      type: Boolean,
      default: false,
    },

  }, {
    timestamps: true,
  },
);
// bookSchema.set('versionKey',false)

const Book = mongoose.model('book', bookSchema);

class BookModel {
        /**
         * @description mongoose methods for create book
         * @param {*} bookData 
         */
        createBook = async (bookData) => {
          const book = new Book(bookData);
          await book.save();
        }

        /**
         * @description mongoose method for getting books
         * @param {*} callback 
         */
       get = (callback) => {
         Book.find({}, (error, data) => ((error) ? (callback(error, null)) : (callback(null, data))));
       }

       /**
        * @description mongoose method for updating books
        * @param {*} data 
        * @returns 
        */
       updateBook = (data) => new Promise((resolve, reject) => {
         Book.findByIdAndUpdate(data.bookId, {
           author: data.author,
           title: data.title,
           image: data.image,
           quantity: data.quantity,
           price: data.price,
           description: data.description,
         })
           .then((book) => resolve(book))
           .catch((err) => reject(err));
       })

       /**
        * @description mongoose method for deleting books
        * @param {*} bookId 
        * @param {*} callback 
        * @returns 
        */
       deleteBook = (bookId, callback) => {
         try {
           Book.findByIdAndRemove(bookId, (error, data) => ((error) ? callback(error, null) : callback(null, data)));
         } catch (error) {
           return callback(error, null);
         }
       }
}

module.exports = new BookModel();
