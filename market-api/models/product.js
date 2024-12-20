const Sequelize = require('sequelize')

module.exports = class Product extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            title: {
               type: Sequelize.STRING(200),
               allowNull: false,
            },
            content: {
               type: Sequelize.STRING(1000),
               allowNull: false,
            },
            subContent: {
               type: Sequelize.STRING(500),
               allowNull: false,
            },
            price: {
               type: Sequelize.INTEGER,
               allowNull: false,
            },
            status: {
               type: Sequelize.STRING(100),
               allowNull: false,
               defaultValue: '판매중',
               validate: {
                  isIn: [['판매중', '결제완료', '판매완료']],
               },
            },
         },
         {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Product',
            tableName: 'products',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }

   static associate(db) {
      db.Product.belongsTo(db.User, {
         foreignKey: 'SellerId',
         targetKey: 'id',
      })
      db.Product.hasOne(db.Order)
      db.Product.belongsTo(db.Category)
      db.Product.hasMany(db.Image)
   }
}
