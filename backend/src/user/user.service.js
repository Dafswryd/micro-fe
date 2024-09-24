const prisma = require("../db/index");
const {
  findUsers,
  insertUser,
  findUserById,
  updateUser,
  deleteUserById,
} = require("./user.repository");

const getAllUsers = async () => {
  const dataUsers = await findUsers();

  return dataUsers;
};

const getUserById = async (user_id) => {
  const dataUser = await findUserById(user_id);
  return dataUser;
};

const addDataUser = async (newUser) => {
  const user = await insertUser(newUser);

  return user;
};

const updateUserById = async (user_id, dataUser) => {
  const userId = await getUserById(user_id);
  if (!userId) {
    throw new Error("Data User Tidak Di Temukan");
  }
  const user = await updateUser(user_id, dataUser);
  return user;
};

const deleteUser = async (user_id) => {
  const user = await getUserById(user_id);
  if (!user) {
    throw new Error("Data User Tidak Ditemukan");
  }

  await deleteUserById(user_id);
};

module.exports = {
  getAllUsers,
  addDataUser,
  getUserById,
  deleteUser,
  updateUserById,
};
