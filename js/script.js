
$(document).ready(function() {
    
    $('body').on('touchmove', false);

    generateBoard();

    $('div.square').tappable(function () {
	$(this).toggleClass('selected');
	if ($(this).data('value') == 1) {
            //alert(event.target.id);
      	    $(this).data('value', 0); }
	else {
            //alert(event.target.id);
      	    $(this).data('value', 1); }
      	
	if (checkWin()) {
	    handleWin();
	};
    });
});

function generateBoard() {
    shuffle(JSONBingo.squares);

    for (i=0; i<24; i++)	{

	if (i==12) {
	    $('#board').append("<div data-value='1' class='selected freesquare' id='sqfree'><div class='text'>free space</div></div>");
	    $('#board').append("<div data-value='0' class='square' id='sq12'><div class='text'>"+JSONBingo.squares[i].square+"</div></div>");
	} else {
	    $('#board').append("<div data-value='0' class='square' id='sq"+i+"'><div class='text'>"+JSONBingo.squares[i].square+"</div></div>");
	}
    }
}

function handleWin() {
    $('#header').html(winText);
    $('#header').addClass("win");

    doSend(name);
    
    winSnd.play();
}

function checkWin() {
    var row1 = ($('#sq0').data('value')+$('#sq1').data('value')+$('#sq2').data('value')+$('#sq3').data('value')+$('#sq4').data('value'));
    var row2 = ($('#sq5').data('value')+$('#sq6').data('value')+$('#sq7').data('value')+$('#sq8').data('value')+$('#sq9').data('value'));
    var row3 = ($('#sq10').data('value')+$('#sq11').data('value')+$('#sqfree').data('value')+$('#sq12').data('value')+$('#sq13').data('value'));
    var row4 = ($('#sq14').data('value')+$('#sq15').data('value')+$('#sq16').data('value')+$('#sq17').data('value')+$('#sq18').data('value'));
    var row5 = ($('#sq19').data('value')+$('#sq20').data('value')+$('#sq21').data('value')+$('#sq22').data('value')+$('#sq23').data('value'));

    var col1 = ($('#sq0').data('value')+$('#sq5').data('value')+$('#sq10').data('value')+$('#sq14').data('value')+$('#sq19').data('value'));
    var col2 = ($('#sq1').data('value')+$('#sq6').data('value')+$('#sq11').data('value')+$('#sq15').data('value')+$('#sq20').data('value'));
    var col3 = ($('#sq2').data('value')+$('#sq7').data('value')+$('#sqfree').data('value')+$('#sq16').data('value')+$('#sq21').data('value'));
    var col4 = ($('#sq3').data('value')+$('#sq8').data('value')+$('#sq12').data('value')+$('#sq17').data('value')+$('#sq22').data('value'));
    var col5 = ($('#sq4').data('value')+$('#sq9').data('value')+$('#sq13').data('value')+$('#sq18').data('value')+$('#sq23').data('value'));

    var diag1 = ($('#sq0').data('value')+$('#sq6').data('value')+$('#sqfree').data('value')+$('#sq17').data('value')+$('#sq23').data('value'));
    var diag2 = ($('#sq4').data('value')+$('#sq8').data('value')+$('#sqfree').data('value')+$('#sq15').data('value')+$('#sq19').data('value'));

    return (row1 == 5 || row2 == 5 || row3 == 5 || row4 == 5 || row5 == 5 || col1 == 5 || col2 == 5 || col3 == 5  || col4 == 5  || col5 == 5 || diag1 == 5 || diag2 == 5);
}

shuffle = function(v){
    for(var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
    return v;
};

