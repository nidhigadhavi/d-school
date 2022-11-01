module.exports = (sequelize, Sequelize) => {
    const Faq = sequelize.define("Faq", {
      type: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      subject: {
        type: Sequelize.STRING
      },      
      active: {
        type: Sequelize.BOOLEAN
      }
    });  
    return Faq;
  };