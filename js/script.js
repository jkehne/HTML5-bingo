var queryParams;

function initialize() {
    queryParams = parseQueryString(window.location.search.substr(1).split('&'));
    getName();
    generateBoard();
    initWebsocket();
}

function parseQueryString(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
	var p=a[i].split('=', 2);
	if (p.length == 1)
	    b[p[0]] = "";
	else
	    b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
}

function getName() {
    if (typeof queryParams['name'] !== 'undefined' && typeof queryParams['groupname'] !== 'undefined') {
        setLocalUserName(queryParams['name']);
	setLocalGroupName(queryParams['groupname']);
    } else {
        window.location.href = "signin.html";
    }
}

function toggleField(field, fieldIndex) {
    if (getFieldChecked(getLocalGroupName(), fieldIndex)) {
	field.classList.remove("selected");
    } else {
	field.classList.add("selected");
    }
}

function handleClick(field, fieldIndex) {
    toggleField(field, fieldIndex);

    if (getFieldChecked(getLocalGroupName(), fieldIndex))
	setFieldChecked(getLocalGroupName(), fieldIndex, false);
    else
	setFieldChecked(getLocalGroupName(), fieldIndex, true);

    if (checkWin()) {
	handleWin();
    };
}

function getOrMakeRow(board) {
    var row = board.lastChild;
    if (row == null || row.childElementCount >= 5) {
	row = document.createElement('tr');
	board.appendChild(row);
    }
    return row;
}

function addField(board, text, id) {
    var row = getOrMakeRow(board);
    var col = document.createElement('td');

    if (id == -1) {
	col.id = "sqfree";
	col.className = "selected freesquare";
    } else {
	col.id = "sq" + id;
	col.className = "square";
	col.setAttribute('onclick', 'handleClick(this, ' + id + ')');
    }

    col.innerHTML = "<div class='text'>" + text + "</div>";

    row.appendChild(col);

    return col;
}

function generateBoard() {
    var board = document.getElementById("board");
    var index;
    var fieldText;
    var field;

    for (i=0; i<24; i++) {

	var fieldText = getFieldText(getLocalGroupName(), i);
	if (!fieldText) {
	    index=parseInt(Math.random() * JSONBingo.squares.length);
	    fieldText = JSONBingo.squares[index].square;
	    setFieldText(getLocalGroupName(), i, fieldText);
	    JSONBingo.squares.splice(index, 1);
	}

	if (i==12) {
	    addField(board, "free space", -1);
	    field = addField(board, fieldText, i);
	} else {
	    field = addField(board, fieldText, i);
	}

	if (getFieldChecked(getLocalGroupName(), i))
	    toggleField(field, i);
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
    send_win_message(getLocalUserName());
    winSnd.play();
    clearGroupState(getLocalGroupName());
}

function checkWin() {
    var row1 = (getFieldChecked(getLocalGroupName(), 0)+getFieldChecked(getLocalGroupName(), 1)+getFieldChecked(getLocalGroupName(), 2)+getFieldChecked(getLocalGroupName(), 3)+getFieldChecked(getLocalGroupName(), 4));
    var row2 = (getFieldChecked(getLocalGroupName(), 5)+getFieldChecked(getLocalGroupName(), 6)+getFieldChecked(getLocalGroupName(), 7)+getFieldChecked(getLocalGroupName(), 8)+getFieldChecked(getLocalGroupName(), 9));
    var row3 = (getFieldChecked(getLocalGroupName(), 10)+getFieldChecked(getLocalGroupName(), 11)+1+getFieldChecked(getLocalGroupName(), 12)+getFieldChecked(getLocalGroupName(), 13));
    var row4 = (getFieldChecked(getLocalGroupName(), 14)+getFieldChecked(getLocalGroupName(), 15)+getFieldChecked(getLocalGroupName(), 16)+getFieldChecked(getLocalGroupName(), 17)+getFieldChecked(getLocalGroupName(), 18));
    var row5 = (getFieldChecked(getLocalGroupName(), 19)+getFieldChecked(getLocalGroupName(), 20)+getFieldChecked(getLocalGroupName(), 21)+getFieldChecked(getLocalGroupName(), 22)+getFieldChecked(getLocalGroupName(), 23));

    var col1 = (getFieldChecked(getLocalGroupName(), 0)+getFieldChecked(getLocalGroupName(), 5)+getFieldChecked(getLocalGroupName(), 10)+getFieldChecked(getLocalGroupName(), 14)+getFieldChecked(getLocalGroupName(), 19));
    var col2 = (getFieldChecked(getLocalGroupName(), 1)+getFieldChecked(getLocalGroupName(), 6)+getFieldChecked(getLocalGroupName(), 11)+getFieldChecked(getLocalGroupName(), 15)+getFieldChecked(getLocalGroupName(), 20));
    var col3 = (getFieldChecked(getLocalGroupName(), 2)+getFieldChecked(getLocalGroupName(), 7)+1+getFieldChecked(getLocalGroupName(), 16)+getFieldChecked(getLocalGroupName(), 21));
    var col4 = (getFieldChecked(getLocalGroupName(), 3)+getFieldChecked(getLocalGroupName(), 8)+getFieldChecked(getLocalGroupName(), 12)+getFieldChecked(getLocalGroupName(), 17)+getFieldChecked(getLocalGroupName(), 22));
    var col5 = (getFieldChecked(getLocalGroupName(), 4)+getFieldChecked(getLocalGroupName(), 9)+getFieldChecked(getLocalGroupName(), 13)+getFieldChecked(getLocalGroupName(), 18)+getFieldChecked(getLocalGroupName(), 23));

    var diag1 = (getFieldChecked(getLocalGroupName(), 0)+getFieldChecked(getLocalGroupName(), 6)+1+getFieldChecked(getLocalGroupName(), 17)+getFieldChecked(getLocalGroupName(), 23));
    var diag2 = (getFieldChecked(getLocalGroupName(), 4)+getFieldChecked(getLocalGroupName(), 8)+1+getFieldChecked(getLocalGroupName(), 15)+getFieldChecked(getLocalGroupName(), 19));

    return (row1 == 5 || row2 == 5 || row3 == 5 || row4 == 5 || row5 == 5 || col1 == 5 || col2 == 5 || col3 == 5  || col4 == 5  || col5 == 5 || diag1 == 5 || diag2 == 5);
}
