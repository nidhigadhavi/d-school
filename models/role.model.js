module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("role", {
    name: {
      type: Sequelize.STRING,
    },
    active: {
      type: Sequelize.BOOLEAN,
    },
  });
  return Role;
};
