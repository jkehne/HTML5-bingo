var checked = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

function initialize() {
    getName();
    generateBoard();
    initWebsocket();
}

function getName() {
    var urlparam = new URLSearchParams(window.location.search)
    if (urlparam.has('name')) {
        name = urlparam.get('name')
    } else {
        window.location.href = "signin.html";
    }
}

function handleClick(field, fieldIndex) {
    if (checked[fieldIndex] == 1) {
	field.classList.remove("selected");
	checked[fieldIndex] = 0;
    } else {
	field.classList.add("selected");
	checked[fieldIndex] = 1;
    }
    
    if (checkWin()) {
	handleWin();
    };
}

function addField(board, text, id) {
    var div = document.createElement('div');

    if (id == -1) {
	div.id = "sqfree";
	div.className = "selected freesquare";
    } else {
	div.id = "sq" + id;
	div.className = "square";
	div.setAttribute('onclick', 'handleClick(this, ' + id + ')');
    }

    div.innerHTML = "<div class='text'>" + text + "</div>";

    board.appendChild(div);
}

function generateBoard() {
    var board = document.getElementById("board");

    shuffle(JSONBingo.squares);

    for (i=0; i<24; i++) {

	if (i==12) {
	    addField(board, "free space", -1);
	    addField(board, JSONBingo.squares[i].square, i);
	} else {
	    addField(board, JSONBingo.squares[i].square, i);
	}
    }
}

function displayWinText(text) {
    var header = document.getElementById("header");
    var winText = document.createTextNode(text);
    header.replaceChild(winText, header.childNodes[0]);
    header.classList.add("win");
}

function handleWin() {
    displayWinText(winText);

    doSend(name);
    
    winSnd.play();
}

function checkWin() {
    var row1 = (checked[0]+checked[1]+checked[2]+checked[3]+checked[4]);
    var row2 = (checked[5]+checked[6]+checked[7]+checked[8]+checked[9]);
    var row3 = (checked[10]+checked[11]+1+checked[12]+checked[13]);
    var row4 = (checked[14]+checked[15]+checked[16]+checked[17]+checked[18]);
    var row5 = (checked[19]+checked[20]+checked[21]+checked[22]+checked[23]);

    var col1 = (checked[0]+checked[5]+checked[10]+checked[14]+checked[19]);
    var col2 = (checked[1]+checked[6]+checked[11]+checked[15]+checked[20]);
    var col3 = (checked[2]+checked[7]+1+checked[16]+checked[21]);
    var col4 = (checked[3]+checked[8]+checked[12]+checked[17]+checked[22]);
    var col5 = (checked[4]+checked[9]+checked[13]+checked[18]+checked[23]);

    var diag1 = (checked[0]+checked[6]+1+checked[17]+checked[23]);
    var diag2 = (checked[4]+checked[8]+1+checked[15]+checked[19]);

    return (row1 == 5 || row2 == 5 || row3 == 5 || row4 == 5 || row5 == 5 || col1 == 5 || col2 == 5 || col3 == 5  || col4 == 5  || col5 == 5 || diag1 == 5 || diag2 == 5);
}

shuffle = function(v){
    for(var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
    return v;
};
