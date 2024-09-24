const prisma = require("../db/index");

const findUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const findUserById = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id_user: userId,
    },
  });

  return user;
};

const insertUser = async (newUser) => {
  const user = await prisma.user.create({
    data: {
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
    },
  });
};

const updateUser = async (userId, dataUser) => {
  const user = await prisma.user.update({
    where: {
      id_user: userId,
    },
    data: {
      name: dataUser.name,
      email: dataUser.email,
      password: dataUser.password,
    },
  });
  return user;
};

const deleteUserById = async (userId) => {
  await prisma.user.delete({
    where: {
      id_user: userId,
    },
  });
};

module.exports = {
  findUsers,
  insertUser,
  findUserById,
  updateUser,
  deleteUserById,
};
