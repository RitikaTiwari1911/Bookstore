/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
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
        createBook = async (bookData) => {
          const book = new Book(bookData);
          await book.save();
        }

       get = (callback) => {
         Book.find({}, (error, data) => ((error) ? (callback(error, null)) : (callback(null, data))));
       }

       updateBook = (bookId, bookDetails, callback) => {
         try {
           Book.findByIdAndUpdate(bookId, {
             author: bookDetails.author,
             title: bookDetails.title,
             quantity: bookDetails.quantity,
             price: bookDetails.price,
             description: bookDetails.description,
             image: bookDetails.image,
           }, (error, data) => ((error) ? (callback(error, null)) : callback(null, data)));
         } catch (error) {
           return callback(null);
         }
       }

       deleteBook = (bookId, callback) => {
         try {
           Book.findByIdAndRemove(bookId, (error, data) => ((error) ? callback(error, null) : callback(null, data)));
         } catch (error) {
           return callback(error, null);
         }
       }
}

module.exports = new BookModel();
