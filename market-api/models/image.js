const Sequelize = require('sequelize')

module.exports = class Image extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            img: {
               type: Sequelize.STRING(200),
               allowNull: false,
               unique: true,
            },
            isTitle: {
               type: Sequelize.BOOLEAN,
            },
         },
         {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Image',
            tableName: 'images',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }

   static associate(db) {
      db.Image.belongsTo(db.Product)
   }
}
