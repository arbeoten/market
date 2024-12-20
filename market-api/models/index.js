const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require('../config/config')[env]

const Category = require('./category')
const Image = require('./image')
const Order = require('./order')
const Product = require('./product')
const User = require('./user')

const db = {}
const sequelize = new Sequelize(config.database, config.username, config.password, config)

db.sequelize = sequelize
db.Category = Category
db.Image = Image
db.Order = Order
db.Product = Product
db.User = User

Category.init(sequelize)
Image.init(sequelize)
Order.init(sequelize)
Product.init(sequelize)
User.init(sequelize)

Category.associate(db)
Image.associate(db)
Order.associate(db)
Product.associate(db)
User.associate(db)

module.exports = db
