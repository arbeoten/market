const Sequelize = require('sequelize')

module.exports = class User extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            nick: {
               type: Sequelize.STRING(100),
               allowNull: false,
               unique: true,
            },
            loginId: {
               type: Sequelize.STRING(100),
               allowNull: false,
               unique: true,
            },
            password: {
               type: Sequelize.STRING(100),
               allowNull: false,
            },
            phone: {
               type: Sequelize.STRING(100),
               allowNull: false,
            },
         },
         {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }

   static associate(db) {
      db.User.hasMany(db.Product, {
         foreignKey: 'SellerId',
         sourceKey: 'id',
      })
      db.User.hasMany(db.Order, {
         foreignKey: 'CustomerId',
         sourceKey: 'id',
      })
   }
}
