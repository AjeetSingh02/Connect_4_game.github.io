var player1Name = prompt("Player One:enter your Name, you will be Blue");
var player1Color = 'rgb(86, 151, 255)';
//rgb is used as Jquery requires a string in this particular format

var player2Name = prompt("Player two:enter your Name, Ypu will be red");
var player2Color = 'rgb(237, 45, 73)';

var game_on = true;
var table = $('table tr'); //this table variable is a list of all the rows

//function for debugging not required for actual solution.
function reportWin(rowNum, colNum){
    console.log("You won starting at this row and column");
    console.log(rowNum);
    console.log(colNum);
}

//this function will fill in the color at given rowIndex and ColIndex
function changeColor(rowIndex, colIndex, color){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

//this function will return the color at given rowIndex and ColIndex
function returnColor(rowIndex, colIndex){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

//this function will check for the 1st empty(grey) box from the bottom. on this box we will drop the color.
//the column index will be given by user click. the row index will be found out by this function.
function chekBottom(colIndex){
    var colorReport = returnColor(5,colIndex); //starting from index 5(last row)
    for (var row = 5; row > -1; row--) {
        colorReport = returnColor(row,colIndex);
        if (colorReport === 'rgb(128, 128, 128)') {
            return row;
        }  
    }
}

//this function will check in four given colors are same or not and they are all not grey. plus it also checks if 
//row index is valid by checking for undefined.
function colorMatchCheck(one, two, three, four){
    return (one===two && one===three && one===four && one!=='rgb(128, 128, 128)' && one !== undefined);
}


//this function will check if there are four matching continuous boxes horizontally in any row.
function horizontalWinCheck(){
    for(var row = 0; row < 6; row++){
        for(var col = 0; col < 4; col++){
            if(colorMatchCheck(returnColor(row,col), returnColor(row,col+1), returnColor(row,col+2), returnColor(row,col+3))){
                console.log("horizontal win");
                reportWin(row,col);
                return true;
            }
        }
    }
}


//this function will check if there are four matching continuous boxes vertically in any column.
function verticalWinCheck(){
    for(var col = 0; col < 7; col++){
        for(var row = 0; row < 3; row++){
            if(colorMatchCheck(returnColor(row,col), returnColor(row+1,col), returnColor(row+2,col), returnColor(row+3,col))){
                console.log("vertical win");
                reportWin(row,col);
                return true;
            }
            else{
                continue;
            }
        }
    }
}


//this function will check if there are four matching continuous boxes diagonally.
//postive and negative sloped diagonals, both type will be checked.
function diagonalWinCheck(){
    for(var col = 0; col < 5; col++){
        for(var row = 0; row < 7; row++){
            if(colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1), returnColor(row+2,col+2), returnColor(row+3,col+3))){
                console.log("diagonal win");
                reportWin(row,col);
                return true;
            }
            else if(colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1), returnColor(row-2,col+2), returnColor(row-3,col+3))){
                console.log("diagonal win");
                reportWin(row,col);
                return true;
            }
        }
    }
}

//Game logic Starts
//**************this is just for practice of Jquery. We dont need to do all this for simple clicks.****************/
//we can use better methods for the same. its just for extensive jquery practice.

//start with player1

var currentPlayerNumber = 1;
var currentName = player1Name;
var currentColor = player1Color;

$('h3').text(currentName+" it is your turn to drop a chip.");
$('.board button').on('click',function(){
    var col = $(this).closest('td').index();
    var bottomAvailableRow = chekBottom(col);
    changeColor(bottomAvailableRow,col,currentColor);

    if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
        $('h1').text(currentName+" You have won.");
        $('h3').fadeOut(1000);
        $('h2').fadeOut(1000);

        $('table').hide();
        $("<span><h1 class='my-1' style='font-family: 'Unlock', cursive;'><br><br><br>Reload to play again</h1></span>").insertAfter("h1");

    }

    currentPlayerNumber = currentPlayerNumber * -1;

    if(currentPlayerNumber === 1){
        currentName = player1Name;
        currentColor = player1Color;
        $('h3').text(currentName + " it is your turn to drop a chip.");
    }
    else{
        currentName = player2Name;
        currentColor = player2Color;
        $('h3').text(currentName + " it is your turn to drop a chip.");
    }
});
