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
    websocket = new WebSocket("wss://int80.de/bingo/server");
    websocket.onmessage = function(evt) { onMessage(evt) };
    websocket.onerror = function(evt) { onError(evt) };
}

function onMessage(evt)
{
    $('#header').html(evt.data + loseText);
    $('#header').addClass("win");
    winSnd.play()
}

function onError(evt)
{
    websocket.close();
}

function doSend(message)
{
    websocket.send(message);
}
