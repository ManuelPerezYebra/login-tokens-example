const { mongoose } = require('mongoose');
const UserScheme = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true //elimina espacios al principio y al final
    },
    email: {
      type: String,
      required: true,
      unique: true, //evita que se repitan emails en la base de datos
      trim: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true, //crear marca de tiempo en registro
    collection: 'users'
  }
);
module.exports = UserScheme;
