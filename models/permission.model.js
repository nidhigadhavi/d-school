module.exports = (sequelize, Sequelize) => {
    const Permission = sequelize.define("permission", {
      type: {
        type: Sequelize.STRING,
      },
    });
    return Permission;
  };
  