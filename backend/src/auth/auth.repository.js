const prisma = require("../db/index");

const findUserByEmail = async (email) => {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  return user;
};

const createUser = async (newUser) => {
  const user = await prisma.user.create({
    data: newUser,
  });
  return user;
};

module.exports = {
  findUserByEmail,
  createUser,
};
