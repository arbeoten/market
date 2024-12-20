const Sequelize = require('sequelize')

module.exports = class Category extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            categoryName: {
               type: Sequelize.STRING(100),
               allowNull: false,
               unique: true,
            },
         },
         {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Category',
            tableName: 'categorys',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }

   static associate(db) {
      db.Category.hasMany(db.Product)
   }
}
