//
// Simple Tic-Tac-Toe written in Javascript
// Hugh Barney, January 2018
//

var YOUR_MOVE = "your move";
var MY_MOVE = "my move";
var GAME_OVER = "Game Over";

var game_state = YOUR_MOVE;
var board = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
var wins = [ [1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7] ];
var move_count = 0;

function onClick(id) {
    try {
	switch(game_state) {
	    case YOUR_MOVE:
		move_count++;
		your_move(id);
		break;

	    case MY_MOVE:
		my_move(id);
		break;

	    case GAME_OVER:
		alert("Game is Over NNNN");
		break;
		
	    default:
		alert("unknown game state");
		break;
	}
    } catch (e) { alert("Error: " + e.description ); }
}

function your_move(id) {
    var winner;
    user_msg("Your Move");
    //debug_msg("free cells = " + get_free_cells());

    if (valid_move(id) == false)
	return;

    set_cell(id, "X");

    if (check_for_win()) {
	reset_game();
	return;
    }
    
    game_state = MY_MOVE;
    my_move();

    if (check_for_win()) {
	reset_game();
	return;
    }
}

function check_for_win() {
    if (player_has_won("X")) {
	alert("You Win !");
	game_state = GAME_OVER;
	return true;
    } else if (player_has_won("O")) {
	alert("Computer Wins !");
	game_state = GAME_OVER;
	return true;
    } else if (check_for_draw()) {
	alert("Its a Draw !");
	game_state = GAME_OVER;
	return true;
    }
    
    return false;
}

function my_move(id) {
    var mvs;
    var mv;
    user_msg("My Move");

    // RULE 1 if first move was a corner play the centre
    if (first_move_was_a_corner()) {
	make_my_move(5);
	debug_msg("RULE 1: you played corner, computer played centre");
	return;
    }
    
    // RULE 2 if first move was the centre play a corner
    if (first_move_was_the_centre()) {
	mv = get_a_corner_move();
	make_my_move(mv);
	debug_msg("RULE 2: ypu played center, compuetr played corner");
	return;
    }
    
    // RULE 3 if we(O) have 2 in a row, make the winning move
    mvs = get_winning_moves("O");
    //alert("winning moves = " + mvs);
    if (mvs.length > 0) {
	mv = select_random_move_from(mvs);
	make_my_move(mv);
	debug_msg("RULE 3: computer played a winning move");
	return;
    }

    // RULE 4 if X has a winning move then block it
    mvs = get_winning_moves("X");
    //alert("blocking moves = " + mvs);
    if (mvs.length > 0) {
	mv = select_random_move_from(mvs);
	make_my_move(mv);
	debug_msg("RULE 4: computer played a blocking move");
	return;
    }

    // RULE 5 select a free side move
    mvs = get_free_sides();
    if (mvs.length > 0) {
	mv = select_random_move_from(mvs);
	make_my_move(mv);
	debug_msg("RULE 5: compluter played a side move");
	return;
    }

    mvs = get_free_cells();
    mv = select_random_move_from(mvs);
    make_my_move(mv);
    debug_msg("Default Rule: computer played a random cell");
}

// check the move and make it for "O"
function make_my_move(mv) {
    if (valid_move(mv)) {
	set_cell(mv, "O");
	game_state = YOUR_MOVE;
	user_msg("Your Move");
    } else {
	alert("make_my_move(): Invalid move was generated " + m);
    }
}

function set_cell(n, player) {
    //debug_msg("set_cell: " + n + " " + player);
    var cell = get_board_index(n);
    
    if (player == "X") {
	document.getElementById(n).src = "X.jpg";
	board[cell] = "X";
    } else {
	document.getElementById(n).src = "O.jpg";
	board[cell] = "O";
    }
}

function valid_move(id) {
    if (cell_is_free(id) == false) {
	alert("Invalid move, try another cell");
	return false;
    }
    return true;
}

function select_random_move_from(mvs)
{
    var len = mvs.length;
    var rnd = random(len) - 1;
    return mvs[rnd];
}

function get_winning_moves(player)
{
    var win_moves = new Array();
    var r;

    for (r in wins) {
	var ind = winning_move_for_row(wins[r], player);
	//alert(wins[r] + " " + player + " " + ind);
	
	if (ind > -1) {
	    //alert("pushing: " + wins[r][ind]);
	    win_moves.push(wins[r][ind]);
	}
    }

    return win_moves;
}

function player_has_won(player)
{
    var r;
    for (r in wins)
	if (row_is_won(wins[r], player))
	    return true;
    return false;
}

function winning_move_for_row(rw, pl)
{
    if (board[rw[1]] == pl && board[rw[2]] == pl && cell_is_free(rw[0])) return 0;
    if (board[rw[2]] == pl && board[rw[0]] == pl && cell_is_free(rw[1])) return 1;
    if (board[rw[0]] == pl && board[rw[1]] == pl && cell_is_free(rw[2])) return 2;
    
    return -1;
}

function check_for_draw() {
    var v = get_free_cells();
    return (v.length == 0);
}

function row_is_won(rw, pl)
{
    if (board[rw[0]] == pl && board[rw[1]] == pl && board[rw[2]] == pl)
	return true;
    return false;
}

function first_move_was_a_corner()
{
    if (move_count != 1)
	return false;

    if (board[1] == "X" || board[3] == "X" || board[7] == "X" || board[9] == "X")
	return true;

    return false;
}

function first_move_was_the_centre()
{
    if (move_count == 1 && board[5] == "X")
	return true;
    return false;
}

function get_a_side_move()
{
    return select_random_move_from([2,4,6,8]);
}

function get_a_corner_move()
{
    return select_random_move_from([1,3,7,9]);
}

function cell_is_free(id) {
    var cell;
    
    if (typeof id == 'string')
	cell = get_board_index(id);
    else
	cell = id;
    
    if (board[cell] == "X" || board[cell] == "O") return false;
    return true;
}

function get_free_cells() {
    var frees = new Array();

    for (i in board) {
	if (i > 0 && cell_is_free(i))
	    frees.push(i);
    }
    return frees;
}

function get_free_sides() {
    var frees = new Array();
    var sides = [2,4,6,8];

    for (i in sides) {
	if (cell_is_free(sides[i]))
	    frees.push(sides[i]);
    }
    //alert("free-sides: " + frees);
    return frees;
}

function get_board_index(id) {
    try {
	return parseInt(id, 10);
    } catch ( e ) { alert("Error: " + e.description ); }
}

function reset_game() {
    game_state = YOUR_MOVE;
    board = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
    move_count = 0;
    debug_msg("");

    document.getElementById("1").src = "1.jpg";
    document.getElementById("2").src = "2.jpg";
    document.getElementById("3").src = "3.jpg";
    document.getElementById("4").src = "4.jpg";
    document.getElementById("5").src = "5.jpg";
    document.getElementById("6").src = "6.jpg";
    document.getElementById("7").src = "7.jpg";
    document.getElementById("8").src = "8.jpg";
    document.getElementById("9").src = "9.jpg";
}

function user_msg(str) {
    document.getElementById("msg_line").innerHTML = str;
}

function debug_msg(str) {
    document.getElementById("debug_line").innerHTML = str;
}

function debug_alert(func, msg) {
    alert(func + " " + msg);
}

function random(n) {
    try {
	return Math.floor((Math.random() * n) + 1);
    } catch ( e ) { alert("Error: " + this + e.description ); } 
}

function stringContains(str, sub) {
    if (str.indexOf(sub) >=0) {
	return true;
    }
    return false;
}
