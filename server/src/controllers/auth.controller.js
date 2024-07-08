const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const createAccesToken = require('../utils/jwt');
const jwt = require('jsonwebtoken');
const TOKEN_SECRET = require('../config/token.config');

const authController = {};

authController.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword
    });
    await newUser.save();
    res.status(201).send({ message: 'User registered' });
  } catch (error) {
    res.status(500).send({ error: 'Error al registrar al usuario' });
  }
};
authController.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await UserModel.findOne({ email });

    if (!userFound) {
      return res.status(400).send({ error: 'El email no está registrado' });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res
        .status(401)
        .send({ error: 'Los credenciales son incorrectos' });
    }
    const token = await createAccesToken({
      id: userFound._id
    });
    return res.cookie('token', token).send({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
authController.verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).send({ message: 'Not Token' });

  try {
    const user = jwt.verify(token, TOKEN_SECRET);

    if (!user) {
      return res.status(401).send({ message: 'Invalid Token' });
    }

    const userFound = await UserModel.findById(user.id);
    if (!userFound) {
      return res.status(404).send({ message: 'User Not Found' });
    }
    return res.status(200).send({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
};

module.exports = authController;
