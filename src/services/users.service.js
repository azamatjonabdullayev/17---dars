import DB_Client from "../database/db_connection.js";

class UserServices {
  async selectUsers() {
    try {
      const allUsers = await DB_Client.query("SELECT * FROM users");
      return allUsers.rows;
    } catch (error) {
      throw error;
    }
  }

  async selectOne(id) {
    try {
      const user = await DB_Client.query("SELECT * FROM users WHERE id = $1", [
        id,
      ]);
      if (user.rows.length === 0) {
        throw new Error("User not found");
      }
      return user.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async createUser(user) {
    try {
      if (!user.name || !user.email || !user.age) {
        throw new Error("Missing required fields");
      }
      await DB_Client.query(
        "INSERT INTO users(name, email, age) VALUES($1, $2, $3)",
        [user.name, user.email, user.age]
      );
      return "User was successfully created!";
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id, body) {
    try {
      const user = await this.selectOne(id);
      if (!user) {
        throw new Error("User not found");
      }
      const { name, email, age } = body;
      if (!name || !email || !age) {
        throw new Error("Missing required fields");
      }
      await DB_Client.query(
        "UPDATE users SET name = $1, email = $2, age = $3 WHERE id = $4",
        [name, email, age, id]
      );
      return {
        message: "User was successfully updated!",
        user: user,
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      const user = await this.selectOne(id);
      if (!user) {
        throw new Error("User not found");
      }
      await DB_Client.query("DELETE FROM users WHERE id = $1", [id]);
      return "User was successfully deleted!";
    } catch (error) {
      throw error;
    }
  }
}
export default UserServices;
