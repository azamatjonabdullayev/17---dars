import UserServices from "../services/users.service.js";

class UserController {
  constructor() {
    this.services = new UserServices();
  }

  async getUsers(req, res) {
    try {
      const data = await this.services.selectUsers();
      res.json(data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getUser(req, res) {
    try {
      const { id } = req.params;
      const user = await this.services.selectOne(id);
      res.json(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async newUser(req, res) {
    try {
      const message = await this.services.createUser(req.body);
      res.status(201).send(message);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async UpdUser(req, res) {
    try {
      const { id } = req.params;
      const message = await this.services.updateUser(id, req.body);
      res.status(200).send(message);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async RemoveUser(req, res) {
    try {
      const message = await this.services.deleteUser(req.params.id);
      res.status(200).send(message);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

export default UserController;
