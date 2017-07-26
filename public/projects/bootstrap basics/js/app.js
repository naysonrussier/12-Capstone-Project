/*
This project is an interactive registration form for "FullStack Conf"
This file provides elements that will automatically tell the user what they have to fill, and what they've done wrong.

Starting with a few variables:
- "listItem" contains all the elements of the page : the error message included in this variable, will appear if the condition is true
- "totalprice" contains the total amount of the activities selected
- "first_time" contains "true" to prevent all messages to appear until the submit button is pressed: this variable will then turn false
- "tshirt_value" contains the value of the selected design t-shirt, to prevent refreshing the value if it hasn't changed, when another element change (with the change on *, it would automatically refresh the tshirt selection)
- "activitiesList" contains the list of activities, with prices, and activities in conflict, to facilitate the counting of "totalprice", and facilitate working with the conflicts. I've put the activities without conflict to 100, to prevent errors
*/
"use strict"
var listItem;
var totalprice = 0;
var first_time = true;
var tshirt_value = "";
var activitiesList = [{nom: "all", price: 200, conflict: 100},
					  {nom: "js-frameworks", price: 100, conflict: 3},
					  {nom: "js-libs", price: 100, conflict: 4},
					  {nom: "express", price: 100, conflict: 1},
					  {nom: "node", price: 100, conflict: 2},
					  {nom: "build-tools", price: 100, conflict: 100},
					  {nom: "npm", price: 100, conflict: 100}];


refresh();

//Give focus to the Name input					  
$("#name").focus();

//on any changes, all the functions are called, so it will be up to date; and the errors messages will appear and disappear on any changes
$("*").change(function(){
refresh();
});
				  

//a function that is calling all functions
function refresh() {
	list_Item();
	price();
	error();
	payment();
	othertitle();
	tshirt_dropdown();
	tshirt_color();
}

//This function is refreshing the listItem with details up to date, so the conditions are updated, and will automatically change to true or false
function list_Item() {
	listItem = [{name:"#name",
					condition:$("#name").val() === "",
						caption:"Name:",
							errormessage:" (please provide your name)"},
							
			{name:"#mail",
					condition:!/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/i.test($($("#mail")).val()),
						caption:"Email:",
							errormessage:" (please provide a valid email adress)"},
				
			{name:"#cc-num",
					condition:!$.payment.validateCardNumber($("#cc-num").val()) && $("#payment").children("option:selected").attr("value") === "credit-card",
						caption:"Card Number:",
							errormessage:" your credit card is invalid"},
								
			{name:"#zip",
					condition:$("#zip").val() === "" && $("#payment").children("option:selected").attr("value") === "credit-card",
						caption:"Zip Code:",
							errormessage:""},
								
			{name:"#cvv",
					condition:!/[0-9]{3}/i.test($("#cvv").val()) && $("#payment").children("option:selected").attr("value") === "credit-card",
						caption:"CVV:",
							errormessage:""}];

}


//this function shows the error messages of "listItem", for each elements, if the condition is true.
function error () {
	if(!first_time) {
		for (var i = 0; i< listItem.length; i+=1) {
			if(listItem[i].condition) {
				$(listItem[i].name).text(listItem[i].caption + listItem[i].errormessage);
				$(listItem[i].name).addClass("error");
			} else {
				$(listItem[i].name).text(listItem[i].caption);
				$(listItem[i].name).removeClass("error");
				
			}
		}	
	}
}

//this function shows the different colors avalaible for a specific type of t-shirt.
function tshirt_dropdown() {
	var list = [{name:"js_puns",code:'<option value="cornflowerblue">Cornflower Blue</option><option value="darkslategrey">Dark Slate Grey</option><option value="gold">Gold</option> '},
				{name:"heart_js",code:'<option value="tomato">Tomato</option><option value="steelblue">Steel Blue</option><option value="dimgrey">Dim Grey</option> '},
				{name:"select",code:'<option value="select"><--Please, select a T-shirt theme</option>'}];
	for (var i = 0; i < list.length; i +=1) {
		if ($("#design option:selected").attr("value") === list[i].name && $("#design option:selected").attr("value") !== tshirt_value ) {
			$("#color").empty();
			$("#color").append(list[i].code);
			tshirt_value = list[i].name;
		}
	}
}

//this fonction shows the color selected in the "preview color box", and hide the whole thing if there is no selection
function tshirt_color() {
	if($("#design option:selected").attr("value") === "select") {
		$(".tshirt").addClass("is-hidden");	
	} else {
		$(".tshirt").removeClass("is-hidden");
		$("#color_details").css("backgroundColor",$("#color option:selected").attr("value"));
	}
}

//this function shows differents messages for each payment options, on behalf of what is selected
function payment() {
	 var valuee = $("#payment option:selected").attr("value");
	 $(".payment_option").addClass("is-hidden");
	 $("#"+valuee).removeClass("is-hidden");
}

//Prevent validation if there are still error messages
$( "form" ).submit(function( event ) {
	first_time = false;
	refresh();
	for (var i = 0; i < listItem.length; i+=1) {
		if (listItem[i].condition) {
		event.preventDefault();
		$("#submiterror").removeClass("is-hidden");
			break;
		}
	}
	refresh();
});		