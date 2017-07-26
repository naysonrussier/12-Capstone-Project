(function(){
	
/**************************************************
					TIC TAC TOE
***************************************************/
/*
A few variables :
"player", which contains the two players;
"actualplayer" and "adversaryplayer";
"screens", which contains the different screens to show, with the different background color;
"condition", which contains all the different condition to win the game ( for example, for the first one, we must have the boxes 0,1 and 2 with the same color to win.);
"difficulty", which contains the difficulty of the game if it's against the computer;
"plays", an array that will collect all the boxes filled, in order;
"playing" which contains the value of each boxes, 100 or 1, depend on what it contains (o or x);
"finish", true or false;
and "winner", which contains the winner
*/
 
		var player = [{name:"",point:0,type:"o",computer:false,value:100,color:"#FFA000"},
					  {name:"",point:0,type:"x",computer:false,value:1,color:"#3688C3"}];
		var actualplayer = 1;
		var adversaryplayer = 0;
		var screens  = [{name:"board",color:"#fff"},
						{name:"player",color:"#66C5F5"},
						{name:"start",color:"#54D17A"},
						{name:"finish",color:"#54D17A"},
						{name:"error",color:"#EEE"}];
		var condition = [[0,1,2],
						 [3,4,5],
						 [6,7,8],
						 [0,3,6],
						 [1,4,7],
						 [2,5,8],
						 [0,4,8],
						 [2,4,6]];
		var difficulty;
		var plays = [];
		var playing = [];
		var finish = false;
		var winner;

	
//The "error" screen is shown by default, to ensure that JavaScript is enabled. If true, this will automatically show the "start" screen
showscreen(2);

//this function start the game, by entering the player's name	
function onStart() {
	if ($("#first_player_name").val() !== "" && $("#second_player_name").val() !== "") {
		player[0].name = $("#first_player_name").val();
		player[0].computer = $("#first_player_computer")[0].checked;
		player[1].name = $("#second_player_name").val();
		player[1].computer = $("#second_player_computer")[0].checked;
		difficulty = $(".difficulty option:selected").val();
		showscreen(0);
		$("#playero_name").text(player[0].name + " : " + player[0].point);
		$("#playerx_name").text(player[1].name + " : " + player[1].point);
		refresh();
		start();
	} else {
		alert("Please enter all the names");
	}
}

//this function change the turn of the player, and check if next player is computer.
function start() {
	if(!finish) {
		change();
		playerHeader();
		if (player[actualplayer].computer) {
			setTimeout(function() {
					play(computer());	
			},1000);
		}
	}
}
	
//this function is the one that is called each time a player click on a box, or the computer select a box. It will do all what it need, like fill the boxes...
function play(box) {
	filledBoxes(box);
	plays.push($(box).index());
	calcul();
	winners();
	start();
}

//this function change the active player in the header
function playerHeader() {
		$(".players").removeClass("active");
		$("#player"+player[actualplayer].type).addClass("active");
}

//this function fill the selected box with the correct color
function filledBoxes(square) {
	$(square).addClass("box-filled-"+player[actualplayer].type);
	$(square).addClass("filled");
}		

//this function show the proper screen, by hiding all of them, and showing only the one in question
function showscreen(toshow) {
	$(".page").addClass("is-hidden");
	$("#"+screens[toshow].name).removeClass("is-hidden");
	$("body").css("background-color", screens[toshow].color);
}

//this function change the value of "playing". This number 1 and 100 will help to differentiate the players
function calcul() {
	playing = [];
	for (var i = 0; i < 9; i++) {
		if ($(".box").eq(i).hasClass("box-filled-o")) {
			playing.push(100);
		} else if ($(".box").eq(i).hasClass("box-filled-x")) {
			playing.push(1);
		} else {
			playing.push(0);
		}
	}
}

//this change the turn of the player.
function change() {
		if (actualplayer === 0) {
				actualplayer = 1;
				adversaryplayer = 0;
			} else {
				actualplayer = 0;
				adversaryplayer = 1;
			}
	}

//this is the main part of the code, it will play the game on is own, against a human, or against himself	
function computer() {
		var solution;
		var winning = [];
		var danger = [];
		var number;
		
	for (var i = 0; i < condition.length; i +=1) {
			number = playing[condition[i][0]]+ playing[condition[i][1]]+playing[condition[i][2]];
			if(number === player[actualplayer].value*2 && difficulty !== "easy") {
				winning.push(i);
			} else if(number === player[adversaryplayer].value*2 && difficulty === "hard") {
				danger.push(i);
			}
		} 
		
		
		if (winning.length > 0) {
			for (var i = 0; i < 3; i +=1) {
				if(!$(".box").eq(condition[winning[0]][i]).hasClass("filled")) {
					solution = condition[winning[0]][i];
				}
			}
		} else if (danger.length > 0) {
			for (var i = 0; i < 3; i +=1) {
				if(!$(".box").eq(condition[danger[0]][i]).hasClass("filled")) {
					solution = condition[danger[0]][i];
				}
			}
		} else {
			do {
				solution = Math.floor(Math.random()*9);
			} while ($(".box").eq(solution).hasClass("filled"));
			console.log("au hasard");
		}
		return $(".box").eq(solution);
	}

//this function check who is the winner
function winners() {
			for(var i = 0; i < condition.length; i ++) {
				if(playing[condition[i][0]] === playing[condition[i][1]] && playing[condition[i][1]] === playing[condition[i][2]] && playing[condition[i][0]] !== 0 && playing[condition[i][1]] !== 0 && playing[condition[i][2]] !== 0) {
					screens[3].color = player[actualplayer].color;
					winning(player[actualplayer].type, "Winner : "+player[actualplayer].name+"!",3500);
					player[actualplayer].point +=1;
					winner = i;
					twinkle();
					break;
				} else if (plays.length >= 9) {
					screens[3].color = "#54D17A";
					winning("tie", "It's a draw",1000);
			}
		}
}
	
//this function show the "finish" screen, with the winner, or the "draw" message.
function winning(winner, message, time) {
	$("#finish").addClass("screen-win-"+winner);
	$(".message").text(message);
	finish = true;
	setTimeout(function() {
		showscreen(3);
	},time);
}
	
//this is a little fantasy, to show who wins.
function twinkle() {
	setTimeout(function() {
	for(var j = 0; j < 3; j +=1) {
							$(".box").eq(condition[winner][j]).toggleClass("box-filled-"+player[actualplayer].type);
							}
	setTimeout(function() {
	for(var j = 0; j < 3; j +=1) {
							$(".box").eq(condition[winner][j]).toggleClass("box-filled-"+player[actualplayer].type);
							}
	setTimeout(function() {
	for(var j = 0; j < 3; j +=1) {
							$(".box").eq(condition[winner][j]).toggleClass("box-filled-"+player[actualplayer].type);
							}
	setTimeout(function() {
	for(var j = 0; j < 3; j +=1) {
							$(".box").eq(condition[winner][j]).toggleClass("box-filled-"+player[actualplayer].type);
							}

	},500);
	},500);
	},500);
	},500);
}
		
//this function refresh the game, like variables "plays", "playing", or it will delete all classes on boxes... 
function refresh() {
	$("#finish").removeClass("screen-win-x screen-win-o screen-win-tie");
	$(".box").removeClass("box-filled-o box-filled-x filled");
	plays = [];
	finish = false;
}

//These are event Listener
	
	$(".box").on("click", function() {
		if(!player[actualplayer].computer && !finish && !$(this).hasClass("filled")) {
			play($(this));
		}
	});

	//fill boxes on hover
	$(".box").hover(function() {
							if (!$(this).hasClass("filled") && !player[actualplayer].computer) {
							$(this).addClass("box-filled-"+player[actualplayer].type);
							}
						}, function() {
							if (!$(this).hasClass("filled") && !player[actualplayer].computer) {
							$(this).removeClass("box-filled-"+player[actualplayer].type);
							}
	});

	//On "starty" button, show the "player" screen
	$(".starty").on("click", function() {
		showscreen(1);
	});

	//start the game
	$(".play").on("click", function() {
	onStart();
	});

	//check if players are computer.
	$("input[type=checkbox]").on("click", function() {
		var count = 0;
		for (var i = 0; i < 2; i +=1) {
		if($("input[type=checkbox]")[i].checked) {
			$("input[type=checkbox]").eq(i).prev().prev().val("Computer");
			$("input[type=checkbox]").eq(i).prev().prev().attr("disabled", true);
			count+=1;
		} else {
			$("input[type=checkbox]").eq(i).prev().prev().removeAttr("disabled");		
		}
		}
		if(count>=1) {
			$("#difficulty").removeClass("is-hidden");
		} else {
			$("#difficulty").addClass("is-hidden");
		}
		console.log(count);
});
})();