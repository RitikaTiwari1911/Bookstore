/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable func-names */
/* eslint-disable max-len */
/**
 * @module       Model
 * @file         user.js
 * @description  schema holds the database Schema
 * @author       Ritika <spk2ritika1911@gmail.com>
 * @since        30/07/2021
-----------------------------------------------------------------------------------------------*/
// connecting to the mongoDB through mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// schema for user of the bookstore
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    validate: /^[a-zA-Z ]{3,30}$/,
  },
  lastName: {
    type: String,
    required: true,
    validate: /^[a-zA-Z ]{3,30}$/,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    validate: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
}, {
  // Applying time stamp
  timestamps: true,
});

// Encrypting password
userSchema.pre('save', async function (next) {
  // This will hash the password if the password is modified by the user in future
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
// exporting model module
module.exports = mongoose.model('bookstore', userSchema);

const RegisterUser = mongoose.model('RegisterUser', userSchema);

class UserModel {
    /**
     * @description registering user in the database
     * @param {*} userDetails
     * @param {*} callback
     */
     // eslint-disable-line
    create = (userDetails, callback) => {
      try {
        // eslint-disable-line 
        const userSchema = new RegisterUser({

          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          emailId: userDetails.emailId,
          password: userDetails.password,
          role: userDetails.role,
        });
        userSchema.save(callback);
      } catch (error) {
        return callback(error, null);
      }
    }

    /** @description user login
     * @param {*} loginInput
     * @param {*} callback
     * @returns
     */
     login = (loginInput, callback) => {
       try {
         RegisterUser.findOne({ emailId: loginInput.emailId }, (error, data) => {
           if (error) {
             return callback(error, null);
           } if (!data) {
             return callback('Invalid credentails', null);
           }
           if (data.role !== loginInput.role) {
             return callback('Access denied!!', null);
           }
           return callback(null, data);
         });
       } catch (error) {
         return callback(error, null);
       }
     }

    /**
     * @description mongoose function for forgot password
     * @param {*} emailId
     * @param {*} callback
     */
    forgotPass = (emailId, callback) => {
      try {
        // eslint-disable-next-line no-nested-ternary
        RegisterUser.findOne({ emailId: emailId.emailId }, (err, data) => (err ? callback(err, null)
          : !data ? callback('email not found', null)
            : callback(null, data)));
      } catch (error) {
        return callback(error, null);
      }
    }

    /**
     * @description mongooose method for reseting the password
     * @param {*} inputData
     * @param {*} callback
     * @returns
     */
    updatePassword = async (inputData, callback) => {
      try {
        const data = await RegisterUser.findOne({ emailId: inputData.emailId });
        const hash = bcrypt.hashSync(inputData.password, 10, (error, hashPassword) => error || hashPassword);
        RegisterUser.findByIdAndUpdate(data._id, { password: hash }, (error, data) => (error ? callback(error, null) : callback(null, data)));
      } catch (error) {
        return callback(error, null);
      }
    }
}

module.exports = new UserModel();
