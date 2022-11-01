module.exports = (sequelize, Sequelize) => {
    const RolePermission = sequelize.define("rolePermission", {
      role: {
        type: Sequelize.STRING,
      },
      permission: {
        type: Sequelize.STRING,
      },
    });
    return RolePermission;
  };
  