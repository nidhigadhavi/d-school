module.exports = (sequelize, Sequelize) => {
    const Teacher = sequelize.define("teacher", {
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      telephone: {
        type: Sequelize.STRING
      },
      subject:{
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.BOOLEAN
      }
    });  
    return Teacher;
  };