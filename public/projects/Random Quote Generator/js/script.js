/*
Random quote Generator


This program has benn tested on : Mozilla, Chrome, Internet Explorer, and Edge. It works all fine

Starting with a few variables

'HTML' contains text to print the quote onto the page
'listPrinted' contains a list of the first quotes printed to be sure not to be printed more than once
'quote' contains the quote printed
'time' which contains the time the quote will be display
*/

var HTML;
var listPrinted = [];
var quote = {};
var time = 0;


window.setInterval(timer, 1000);

// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called


document.getElementById('loadQuote').addEventListener("click", printQuote, false);


printQuote();//starting by printing one single quote


//setting up the time to print a new quote every 15 seconds
function timer() {
	
	if (time >= 15) {
		printQuote();
	} else {
	time+=1;
	}
}


//setting up the printing method to print the message onto the index.html, into the 'quote-box' element
function print(message) {
	
	var div = document.getElementById('quote-box');
	div.innerHTML = message;
}


//Get a random number
function getRandomNumber (max) {
	
	var number = Math.floor(Math.random() * max);
	return number;
}


//choose a random rgb color for the backgroud
//then I tried to choose the negative of this color for the text color
function getRandomColor () {
	
	//basics colors
	var red = getRandomNumber (255);
	var green = getRandomNumber (255);
	var blue = getRandomNumber (255);
	var color = 'rgb(' + red +',' + green + ',' + blue + ')';
	
	// negative colors
	var negativered = 255-red;
	var negativegreen = 255-green;
	var negativeblue = 255-blue;
	var negativecolor = 'rgb(' + negativered +',' + negativegreen + ',' + negativeblue + ')';
	
	//change the colors (background and text)
	document.getElementById("body").style.background = color;
	document.getElementById("body").style.color = negativecolor;
}



//Function 'getRandomQuote' to pick up a random quote
function getRandomQuote () {
	
	var randomNumber = getRandomNumber(quotes.length);//first starting with a random number between 0 and the length of the quotes arrays	

	if ( listPrinted.length < quotes.length) {
	
		//select a new random number as long as this number is different from the ones contained in the listPrinted array
		for ( var i = 0; i < listPrinted.length; i += 1 ) {
			if (listPrinted[i] === randomNumber){			
				i = -1; //if the number is equal to one in the listPrinted reinitialize 'i' to -1 to put it back to 0 and start over and over until the number is different
				console.log(randomNumber + ' was already used');//print a message in the console to make sure it works			
				randomNumber = getRandomNumber(quotes.length); 	
			}
		}
	} else if (listPrinted.length === quotes.length) {
			console.log('All the quotes have been shown once, a random quote will now be printed, without cheking if it had already been printed');
		}
	
	quote = quotes[randomNumber];//insert into the quote object, the quote randomly selected before
	listPrinted.push(randomNumber);//add the random Number to the listPrinted
}



/*This is the main function

function 'printQuote' to print it up to the page
*/

function printQuote () {
	
	getRandomQuote();//fist call the 'getRandomQuote' to choose a random quote
	getRandomColor();//and the 'getRandomColor' to randomly change the background color
	
	//then starting the html code
	HTML = '<p class="quote">' + quote.quote + '</p><p class="source"> ' + quote.source ;

	if (quote.citation !== '') {
		HTML += '<span class="citation"> ' + quote.citation + '</span> ';
	}

	if (quote.year !== '') {
		HTML +='<span class="year">' + quote.year + '</span> ';
	} 

	if (quote.tags !== '') {
		HTML +='<span class="tags">' + quote.tags + '</span> ';
	} 

	HTML +='</p>';

	//finally print the HTML to the page using the function 'print' written above and set the timer to 0
	print(HTML);
	time = 0;
}
