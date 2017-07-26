'use strict';
module.exports = function(sequelize, DataTypes) {
  var books = sequelize.define('books', {
    id: { 
		type: DataTypes.INTEGER, 
		primaryKey: true
	},
    title: {
		type: DataTypes.STRING,
		validate: {
			notEmpty: true
		}
	},
    author: {
		type: DataTypes.STRING,
		validate: {
			notEmpty: true
		}
	},
    genre: {
		type: DataTypes.STRING,
		validate: {
			notEmpty: true
		}
	},
    first_published: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
			notEmpty: true
		}
	},
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
		books.hasMany(models.loans, {foreignKey: 'book_id'});
      }
    }
  });
  return books;
};