const models = require('../models');
export const user = {
  async createUser(req, res) {
    try {
      const createdAt = new Date();
      const updatedAt = new Date();
      const userData = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        phoneNumber: req.body.phoneNumber,
        updatedAt,
        createdAt
      }
      const post = await models.User.create(userData);
      return res.status(201).json({
        post
      });
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
}
