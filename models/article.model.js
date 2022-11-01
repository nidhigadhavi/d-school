module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define("article", {
      type: {
        type: Sequelize.STRING
      },
      email: {
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
    return Article;
  };