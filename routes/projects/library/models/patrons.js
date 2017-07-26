'use strict';
module.exports = function(sequelize, DataTypes) {
  var patrons = sequelize.define('patrons', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
    first_name: {
		type: DataTypes.STRING,
		validate : {
			notEmpty: true
		}
	},
    last_name: {
		type: DataTypes.STRING,
		validate : {
			notEmpty: true
		}
	},
    address: {
		type: DataTypes.STRING,
		validate : {
			notEmpty: true
		}
	},
    email: {
		type: DataTypes.STRING,
		validate : {
			isEmail: true,
			notEmpty: true
		}
	},
    library_id: {
		type: DataTypes.STRING,
		validate : {
			notEmpty: true
		}
	},
    zip_code: {
		type: DataTypes.INTEGER,
		validate : {
			isNumeric: true,
			notEmpty: true
		}
	},
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
		patrons.hasMany(models.loans, {foreignKey: 'patron_id'})
      }
    }
  });
  return patrons;
};