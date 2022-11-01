const dbconfig = require("../mysql.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER,dbconfig.PASSWORD , {
    host: dbconfig.HOST,
    dialect: dbconfig.dialect,
    operatorAliases: false,
    pool:{
        max: dbconfig.pool.max,
        min:dbconfig.pool.min,
        acquire:dbconfig.pool.acquire,
        idel:dbconfig.pool.idle
    }    
});
const db ={};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.users = require("./user.model")(sequelize, Sequelize);
db.article = require("./article.model")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.permission = require("./permission.model")(sequelize, Sequelize);
db.rolePermission = require("./role-permission.model")(sequelize, Sequelize);
db.teacher = require("./teacher.model")(sequelize , Sequelize);

module.exports = db;