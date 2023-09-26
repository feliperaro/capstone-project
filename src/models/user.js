const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  authentication: {
    password: {
      type: String,
      required: true,
      select: false,
    },
    salt: {
      type: String,
      select: false,
    },
    sessionToken: {
      type: String,
      select: false,
    },
  },
});

const UserModel = mongoose.model("User", userSchema);

const createUser = (values) =>
  new UserModel(values).save().then((user) => user.toObject());
const deleteUserById = (id) => UserModel.findByIdAndDelete({ _id: id });
const getUsers = () => UserModel.find();
const getUserByEmail = (email) => UserModel.findOne({ email });
const getUserBySessionToken = (sessionToken) =>
  UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  });
const getUserById = (id) => UserModel.findById(id);
const updateUserById = (id, values) => UserModel.findByIdAndUpdate(id, values);

module.exports = {
  createUser,
  deleteUserById,
  getUsers,
  getUserByEmail,
  getUserById,
  getUserBySessionToken,
  updateUserById,
};
