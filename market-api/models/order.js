const Sequelize = require('sequelize')

module.exports = class Order extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            name: {
               type: Sequelize.STRING(100),
               allowNull: false,
            },
            address: {
               type: Sequelize.STRING(500),
               allowNull: false,
            },
            phone: {
               type: Sequelize.STRING(100),
               allowNull: false,
            },
            status: {
               type: Sequelize.STRING(100),
               allowNull: false,
               defaultValue: '결제완료',
               validate: {
                  isIn: [['결제완료', '상품대기중', '배송중', '배송완료']],
               },
            },
         },
         {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Order',
            tableName: 'orders',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }

   static associate(db) {
      db.Order.belongsTo(db.User, { foreignKey: 'CustomerId', targetKey: 'id' })
      db.Order.belongsTo(db.Product)
   }
}
