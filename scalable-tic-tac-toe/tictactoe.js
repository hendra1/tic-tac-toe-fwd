// Run script after DOM has loaded
document.addEventListener('DOMContentLoaded', function() {

var o_win = 0;
var x_win = 0;

var optionsButton = document.getElementById("options_submit");

optionsButton.addEventListener("click", function(){

optionsButton.innerHTML = "Reset";


function isEven(value){
    if (value % 2 == 0) {
       	return true;
    } else {
        return false;
	};
};

function isOdd(value){
	if (value % 1 == 0) {
		return true;
	} else {
		return false;
	};
};

function allSame(array) {
   
    var first = array[0];

    if (array[0] == "") {
    	return false;
    } else {
    	return array.every(function(element) {
        	return element == first;
    	});
    };
};

var background = "#eeeeee";

var boardSize = parseInt(document.getElementById("boardsize_input").value);

var gameBoard = [];


var numSquares = (boardSize * boardSize);

// Create gameboard array containing [] of board size squared
for (var i = 0; i < numSquares; i++) {
	gameBoard.push(i);
};

// Create a wrapper div called "board" inside of "game" div
document.getElementById("game").innerHTML = '<div id="board"></div>';


var board = document.getElementById("board");


board.style.margin = '0 auto';

// To make scalable, set wrapper div width and height 100px* board size
board.style.height = (100 * boardSize) + 'px';
board.style.width = (100 * boardSize) + 'px';

// Add border to board for visibility
board.style.border = 'solid 1px black';

// Iterate over gameboard, for every index in gameboard, print to document a div
for (var i = 0; i < numSquares; i++) {
	board.innerHTML += '<div class="square"></div>'; 
};

var squares = document.getElementsByClassName("square");

// Mandatory square div styling
for (var i = 0; i < numSquares; i++) {
	// set div squares to 100px x 100px
	squares[i].style.height = '100px';
	squares[i].style.width = '100px';
	// Float square divs left
	squares[i].style.float = "left";
	// Set div line height to 100px
	squares[i].style.lineHeight = "100px";
	// Set unique DIV IDs to each square 
	squares[i].setAttribute("id", i.toString());
};

// square light gray
if (numSquares % 2 !== 0) {
	for (var i = 0; i < numSquares; i += 2) {
		squares[i].style.backgroundColor = background;
	};
} else { 
	for (i = 0; i < numSquares; i += 1) {
		if (isEven(i/boardSize)) { 
			for (var squareNum = i; squareNum < (i + boardSize); squareNum += 2) {
				squares[squareNum].style.backgroundColor = background;	
			};
		} else if (isOdd(i/boardSize)) { 
			for (var squareNum = i+1; squareNum < (i + boardSize); squareNum += 2) {
				squares[squareNum].style.backgroundColor = background;	
			};
		} else {
		};
	};
};

// Store turn indicator div in a variable for easy access
var turnIndicator = document.getElementById("turnIndicator")
var o_win_counter = document.getElementById("o_win");
var x_win_counter = document.getElementById("x_win");

// After board is made, indicate who goes first
turnIndicator.style.color = "black";
turnIndicator.innerHTML = "X's Turn";


var boardClicks = 0;

// If board is clicked, increment global click counter
board.addEventListener("click", function() {
if (determineWinner()) { // determineWinner will return true if it finds a winning combination
	turnIndicator.style.color = "blue";
	turnIndicator.innerHTML = winningPlayer[0] + ' wins!';
	if(winningPlayer[0] === 'X'){
		++x_win;
		x_win_counter.innerHTML = x_win;	
	}else{
		++o_win;
		o_win_counter.innerHTML = o_win;			
	}
} else if (isEven(boardClicks)) {
	turnIndicator.style.color = "red";
	turnIndicator.innerHTML = "O's Turn";
} else {
	turnIndicator.style.color = "black";
	turnIndicator.innerHTML = "X's Turn";
};
boardClicks++;
}); // End board click function

// Make an array to hold square click data
var squareClicks = [];

// Set squareclick data for each square to 0
for (var i = 0; i < numSquares; i++) {
	squareClicks[i] = 0;
};


var winningPlayer;

// Add function to determine winner based on clicks array
var determineWinner = function() {
	// Check for win by row
	for (i = 0; i < numSquares; i += 1) { 
		if ((i % boardSize) == 0) {
			var rowCheck = [];
			for (var squareNum = i; squareNum < (i + boardSize); squareNum += 1) { // iteration over column 1	
				rowCheck.push(squares[squareNum].innerHTML);
			};
			console.log('Row ' + i + ' is ' + rowCheck);
			console.log(allSame(rowCheck));

			if (allSame(rowCheck)) {
				winningPlayer = rowCheck; // Push winning player data
				return true;
			};
		};
	};
	// Check for win by column
	for (i = 0; i < numSquares; i += 1) { // iterate over entire board
		if (i < boardSize) { // 
			var colCheck = [];
			for (var squareNum = i; squareNum < numSquares; squareNum += boardSize) { // iteration over row 1	
				colCheck.push(squares[squareNum].innerHTML);
			};
			console.log('Column ' + i + 'is ' + colCheck);
			console.log(allSame(colCheck));
			
			if (allSame(colCheck)) {
				winningPlayer = colCheck; // Push winning player data
				return true;
			};	
		};
	};
	// Check for win by left diagonal
	var diag1Check = []; 
	for (i = 0; i < numSquares; i += 1) {
		if ((i % (boardSize + 1)) == 0) {
			console.log(i)
			diag1Check.push(squares[i].innerHTML);
		};
	};
	console.log(diag1Check) 
	console.log(allSame(diag1Check));
	if (allSame(diag1Check)) {
		winningPlayer = diag1Check; // Push winning player data
		return true;
	};
	// Check for win by right diagonal
	var diag2Check = []; 
	for (i = (boardSize - 1); i < (numSquares - 1); i += 1) {
		if ((i % (boardSize - 1)) == 0) {
			console.log(i)
			diag2Check.push(squares[i].innerHTML);
		};
	};
	console.log(diag2Check)
	console.log(allSame(diag2Check));
	if (allSame(diag2Check)) {
		winningPlayer = diag2Check; // Push winning player data
		return true;
	};
}; // End determineWinner function

// Add function to count square clicks
var countClicks = function() {
	var divID = this.getAttribute("id");
	squareClicks[divID] += 1;

	if (isEven(boardClicks) && squareClicks[divID] == 1) {
		this.innerHTML = 'X';
	} else if (isOdd(boardClicks) && squareClicks[divID] == 1) {
		this.innerHTML = 'O';
		this.style.color = "red";
	} else if (!determineWinner()){
		alert('You cannot move there. That space is taken.');
		boardClicks -= 1;
	} else {
	};
	if (determineWinner()) { // determine winner will return true or false if it identifies a winning combination
		for (var i = 0; i < numSquares; i++) {
			squareClicks[i] = 2;
		};
		document.getElementById("options_submit").innerHTML = "Play again?"
	};
};

// Add local click counter to each square on the board
for (var i = 0; i < numSquares; i++) {
	squares[i].addEventListener("click", countClicks);
};

}); // End makeboard function

}); // End document load function