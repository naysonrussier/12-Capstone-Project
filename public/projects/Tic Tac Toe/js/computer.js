
$(".box").eq(2).addClass("box-filled-1");


var player = [{id:"one",name:"Nayson", point:0},
			  {id:"two",name:"Sidney", point:0}];

var turn = 1;
var test = [];
var gagnant = 1;


var condition = [[0,1,2],
				 [3,4,5],
				 [6,7,8],
				 [0,3,6],
				 [1,4,7],
				 [2,5,8],
				 [0,4,8],
				 [2,4,6]]

				 
				 
				 
function refresh() {
	
}
function supertest() {
	test = [];
	for (var i = 0; i < 9; i++) {
		if ($(".box").eq(i).hasClass("box-filled-2")) {
			test.push("2");
		} else if ($(".box").eq(i).hasClass("box-filled-1")) {
			test.push("1");
		} else {
			test.push("");
		}
	
	}
	
}
$(".box").on('click', function() {
	if(!$(this).hasClass("box-filled-2") && !$(this).hasClass("box-filled-1")) {
	$(this).addClass("box-filled-" + turn);
	$("#player"+turn).removeClass("active")
	if (turn === 1) {
		turn = 2;
	} else {
		turn = 1;
	}}
	$("#player"+turn).addClass("active")
	supertest();
	draw();
	conditionif();
});



function conditionif() {
	for(var i = 0; i < condition.length; i ++) {
		if(test[condition[i][0]] === test[condition[i][1]] && test[condition[i][1]] === test[condition[i][2]] && test[condition[i][0]] !== "" && test[condition[i][1]] !== "" && test[condition[i][2]] !== "") {

			gagnant = test[condition[i][0]];
			$("#board").addClass("is-hidden");
			$("#finish").removeClass("is-hidden");
			$("#finish").removeClass("screen-win-2");
			$("#finish").removeClass("screen-win-1");
			$("#finish").addClass("screen-win-"+gagnant);
			$(".message").text(player[gagnant-1].name);
			player[gagnant-1].point +=1;
		console.log(player[gagnant-1].name + " " + player[gagnant-1].point);
		}
	}
}

function draw() {
	var count=0;
		for(var i = 0; i < test.length; i ++) {
				
					if(test[i] !== "") {
						count+=1;
					
				}
		}
		if (count === test.length) {
			ishidden("error","start","board","finish");
			$("#finish").removeClass("screen-win-2");
			$("#finish").removeClass("screen-win-1");
			$("#finish").addClass("screen-win-tie");
			$(".message").text("It's a draw")
		}
		return count;
}

function ishidden(a,b,c,dnothidden) {
	$("#"+a).addClass("is-hidden");
	$("#"+b).addClass("is-hidden");
	$("#"+c).addClass("is-hidden");
	$("#"+dnothidden).removeClass("is-hidden");
			$(".box").removeClass("box-filled-1");
			$(".box").removeClass("box-filled-2");
}

ishidden("error","finish","board","start")


$(".button").on("click", function() {
			ishidden("start","finish","error","board");
});


