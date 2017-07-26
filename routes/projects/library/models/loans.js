'use strict';
module.exports = function(sequelize, DataTypes) {
  var loans = sequelize.define('loans', {
    id: { type: DataTypes.INTEGER, primaryKey: true},
    book_id: {
		type: DataTypes.INTEGER,
		validate : {
			isNumeric: true,
			notEmpty: true
		}
	},
    patron_id: {
		type: DataTypes.INTEGER,
		validate : {
			isNumeric: true,
			notEmpty: true
		}
	},
    loaned_on: {
		type: DataTypes.DATEONLY,
		validate : {
			isDate: true,
			notEmpty: true
		}
	},
    return_by: {
		type: DataTypes.DATEONLY,
		validate : {
			isDate: true,
			notEmpty: true
		}
	},
    returned_on: {
		type: DataTypes.DATEONLY,
		validate : {
			isDate: true,
			notEmpty: true
		}
	}
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
		loans.belongsTo(models.books, {foreignKey: 'book_id'});
		loans.belongsTo(models.patrons, {foreignKey: 'patron_id'});
      }
    }
  });
  return loans;
};