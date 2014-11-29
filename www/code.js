/**
 * Created by Crystian on 11/20/2014.
 */
var evalWorker, result = document.getElementById('result');

var editor = ace.edit("editor");
editor.setTheme("ace/theme/twilight");
editor.getSession().setMode("ace/mode/javascript");
editor.getSession().setTabSize(4);
editor.getSession().setUseSoftTabs(true);
editor.setShowPrintMargin(false);
editor.setFontSize("3vmin");

editor.commands.addCommand({
	name: 'run',
	bindKey: {win: 'Ctrl-Enter',  mac: 'Command-Enter'},
	exec: function(editor) {
		runCode();
	},
	readOnly: true // false if this command should not apply in readOnly mode
});





function runCode() {
	//editor.setReadOnly(true);
	//$('#test button').attr('disabled','disabled');

	var code = editor.getSession().getValue() + "\n";
    
    window.addEventListener("message", sendCode, false);
  
    var iframe = $('#sandbox')[0];
    iframe.contentWindow.location.reload(true);
    
    function sendCode (event) {
      
      try {
        if (event.data !== 'sendcode') throw 'bad message';
          //implentar thread de control
          //Aca tenes que cambiar el worker por el iframe
          //https://developer.mozilla.org/en-US/docs/Web/API/Window.postMessage
        iframe.contentWindow.postMessage(code, '*');
      } catch(e) {
        console.log('algo paso :S ' + e.toString());
      }
      finally {
        window.removeEventListener("message", sendCode, false);
      }
    }
}



function log(m){
	console.log(m);
	result.innerHTML += m +'<br>';
	result.scrollTop = result.scrollHeight;
}

function validate(i) {

	console.log('validate',i);

	var a = '<span style="color:'+ (('a'===i) ? 'green': 'red') +'">'+('a'===i)+'</span>';
	log('se esperaba una "a" y llego una "'+i+'" = '+ a);

}

function setupWorker() {
	var newWorker = new Worker("eval.js");

	newWorker.onmessage = function (m) {
		switch(m.data.type){
			case 'result':
				validate(m.data.content);
				break;
			case 'error':
				handleError(m.data.content);
				break;
			default:
				log(m.data.content);
		}
	};

	newWorker.onerror = function (m) {
		handleError(m.message +'\n');
	};

	return newWorker;
}
function handleError(i) {
	console.log('handle error');
}

$('document').ready(function () {

	//if(!!window.Worker) {
	//	evalWorker = setupWorker();
	//} else {
	//	console.log('fail');
	//}
  
    $('#banner').find('h1').text(window.location.hash);

	$('document').keypress(function(event) {
		if (event.which == 13 && (event.ctrlKey||event.metaKey)) {
			event.preventDefault();
			runCode();
			return false;
		}
		return true;
	});
  
    $('#editor').css('font-size', '16px');
  
    $('#submit-exercise').click(function(){
      runCode();
    });

});
