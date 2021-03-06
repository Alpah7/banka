import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../dummyModels/User';
import dummyData from '../utils/dummyData';

dotenv.config();

const { users } = dummyData;

export default class AuthController {
  /**
   * @description Register a new user
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @route POST /api/v1/auth/signup
   * @returns {Object} status code, data and message properties
   * @access public
   */
  static signUp(req, res) {
    const { firstName, lastName, email, password } = req.body;
    const existingUser = users.some(user => user.email === email);
    if (existingUser) {
      return res.status(409).json({
        status: 409,
        error: 'User already exists'
      });
    }
    const newUser = new User();
    const usersLength = users.length;
    const lastID = users[usersLength - 1].id;
    const newID = lastID + 1;
    newUser.id = newID;
    newUser.firstName = firstName.trim();
    newUser.lastName = lastName.trim();
    newUser.email = email.trim();
    newUser.password = password.trim();
    newUser.type = 'client';
    newUser.createdAt = new Date();

    users.push(newUser);
    const payload = { id: newUser.id, email: newUser.email };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1hr' });
    const data = {
      token,
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      type: newUser.type,
      createdAt: newUser.createdAt
    };
    return res.status(201).json({
      status: 201,
      data,
      message: 'User registered successfully'
    });
  }

  /**
   * @description Log In an existing user
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @route POST /api/v1/auth/signin
   * @returns {Object} status code, data and message properties
   * @access public
   */
  static signIn(req, res) {
    const { email, password } = req.body;
    for (let i = 0; i < users.length; i += 1) {
      if (email === users[i].email && password === users[i].password) {
        const userInfo = users[i];
        const payload = {
          id: userInfo.id,
          email: userInfo.email,
          type: userInfo.type,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          isAdmin: userInfo.isAdmin
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1hr' });
        const data = {
          token,
          id: userInfo.id,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
          type: userInfo.type
        };
        return res.status(200).json({
          status: 200,
          data,
          message: 'Login successful'
        });
      }
    }
    return res.status(404).json({
      status: 404,
      error: 'Email or password is incorrect'
    });
  }
}
