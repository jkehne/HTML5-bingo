var current_game_id = 0;
var websocket;

function initWebsocket()
{
    doConnect();
}

function doConnect()
{
    websocket = new ReconnectingWebSocket("wss://int80.de/bingo/server");
    websocket.onmessage = onMessage;
    websocket.onopen = onopen;
}

function handle_win_message(params)
{
    var split_params = params.split(";", 3)
    var game_id = split_params[1]
    var winner = split_params[2]

    displayWinText(winner + loseText);

    winSnd.play()

    current_game_id = game_id;
}

function handle_signin_message(params)
{
    var split_params = params.split(";", 3)
    var game_id = split_params[1]
    var winner = split_params[2]

    if (current_game_id == 0) {
	current_game_id = game_id
	return
    }

    if (game_id == current_game_id)
	return

    handle_win_message(params)
}

function onopen()
{
    websocket.send("SIGNIN;" + groupname)
}

function onMessage(evt)
{
    if (evt.data === "PONG")
	return

    var split_data = evt.data.split(";", 1)
    var opcode = split_data[0]
    var params = split_data[1]

    if (opcode === "WIN")
	handle_win_message(evt.data)
    else if (opcode === "SIGNIN")
	handle_signin_message(evt.data)
}

function send_win_message(message)
{
    websocket.send("WIN;" + groupname + ";" + current_game_id + ";" + message);
    current_game_id++;
}
