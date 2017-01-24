var current_game_id = 0

function init()
{
    doConnect();
    urlparam = new URLSearchParams(window.location.search)
    if (urlparam.has('name')) {
	name = urlparam.get('name')
    } else {
	name = prompt("Please enter a name")
    }
}

function doConnect()
{
    websocket = new ReconnectingWebSocket("wss://int80.de/bingo/server");
    websocket.onmessage = function(evt) { onMessage(evt) };
    //websocket.onerror = function(evt) { onError(evt) };
}

function handle_win(params)
{
    split_params = params.split(";", 3)
    game_id = split_params[1]
    winner = split_params[2]

    $('#header').html(document.createTextNode(winner + loseText));
    $('#header').addClass("win");
    winSnd.play()
}

function handle_signin(params)
{
    split_params = params.split(";", 3)
    game_id = split_params[1]
    winner = split_params[2]

    if (current_game_id == 0) {
	current_game_id = game_id
	return
    }

    if (game_id == current_game_id)
	return

    handle_win(params)
}

function onMessage(evt)
{
    if (evt.data === "PONG")
	return

    split_data = evt.data.split(";", 1)
    opcode = split_data[0]
    params = split_data[1]

    if (opcode === "WIN")
	handle_win(evt.data)
    else if (opcode === "SIGNIN")
	handle_signin(evt.data)
}

function onError(evt)
{
    websocket.close();
}

function doSend(message)
{
    websocket.send("WIN;" + current_game_id + ";" + message);
}
