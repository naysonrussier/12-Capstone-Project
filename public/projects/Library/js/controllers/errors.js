var conditions = [	
		{type: 'is ', message: '{{field}} is not valid. Please try again.'},
		{type: 'not ', message: '{{field}} is not valid. Please try again.'},
		{type: 'isEmail ', message: '{{field}} is not a valid email address'},
		{type: 'isUrl ', message: '{{field}} is not a valid URL'},
		{type: 'isIP ', message: '{{field}} is not a valid ip'},
		{type: 'isIPv4 ', message: '{{field}} is not a valid Ipv4'},
		{type: 'isIPv6 ', message: '{{field}} is not a valid Ipv6'},
		{type: 'isAlpha ', message: '{{field}} can only contain letters'},
		{type: 'isAlphanumeric ', message: '{{field}} can only contain alphanumeric characters'},
		{type: 'isNumeric ', message: '{{field}} can only contain numbers'},
		{type: 'isInt ', message: '{{field}} must be a valid Integer'},
		{type: 'isFloat ', message: '{{field}} must have a valid floating point number'},
		{type: 'isDecimal ', message: '{{field}} must be any numbers'},
		{type: 'isLowercase ', message: '{{field}} must only contain lowercase character'},
		{type: 'isUppercase ', message: '{{field}} must only contain uppercase character'},
		{type: 'notNull ', message: '{{field}} can\'t be empty'},
		{type: 'isNull ', message: '{{field}} must be empty'},
		{type: 'notEmpty ', message: '{{field}} can\'t be empty'},
		{type: 'equals ', message: '{{field}} is not valid. Please try again.'},
		{type: 'contains ', message: '{{field}} is not valid. Please try again.'},
		{type: 'notIn ', message: '{{field}} is not valid. Please try again.'},
		{type: 'isIn ', message: '{{field}} is not valid. Please try again.'},
		{type: 'notContains ', message: '{{field}} is not valid. Please try again.'},
		{type: 'len ', message: '{{field}} is not valid. Please try again.'},
		{type: 'isUUID ', message: '{{field}} is not valid. Please try again.'},
		{type: 'isDate ', message: '{{field}} must be a properly formated date'},
		{type: 'isAfter ', message: '{{field}} is not valid. Please try again.'},
		{type: 'isBefore ', message: '{{field}} is not valid. Please try again.'},
		{type: 'max ', message: '{{field}} is not valid. Please try again.'},
		{type: 'min ', message: '{{field}} is not valid. Please try again.'},
		{type: 'isCreditCard ', message: '{{field}} is not valid. Please try again.'},

	];

function error(error) {
	if(error.type == "Validation error") {
			for(var j = 0; j < conditions.length; j ++) {
				var condition = conditions[j].type;
				var errMessage = error.message.substr(11,conditions[j].type.length);
				if(condition == errMessage) {
					var field = capitalizeFirstLetter(error.path);
					var message = {message: conditions[j].message.replace("{{field}}", field)}
					return message;
				}
			}
	}
};

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1).replace("_", " ");
};